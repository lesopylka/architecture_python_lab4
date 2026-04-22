#include <userver/formats/json.hpp>
#include <userver/server/handlers/http_handler_base.hpp>
#include <userver/server/http/http_method.hpp>
#include <userver/server/http/http_status.hpp>
#include <userver/storages/postgres/cluster.hpp>
#include <userver/storages/postgres/component.hpp>
#include <userver/components/component_context.hpp>

namespace {

class MessagesHandler final : public userver::server::handlers::HttpHandlerBase {
public:
    static constexpr std::string_view kName = "handler-messages";

    MessagesHandler(const userver::components::ComponentConfig& config,
                    const userver::components::ComponentContext& context)
        : HttpHandlerBase(config, context),
          pg_cluster_(
              context.FindComponent<userver::components::Postgres>("postgres-db")
                  .GetCluster()) {}

    std::string HandleRequestThrow(
        const userver::server::http::HttpRequest& request,
        userver::server::request::RequestContext&) const override {

        auto token = request.GetHeader("Authorization");
        if (token != "Bearer 123") {
            request.SetResponseStatus(userver::server::http::HttpStatus::kUnauthorized);
            return R"({"error":"Unauthorized"})";
        }

        if (request.GetMethod() == userver::server::http::HttpMethod::kPost) {
            auto json = userver::formats::json::FromString(request.RequestBody());

            if (!json.HasMember("from") ||
                !json.HasMember("to") ||
                !json.HasMember("text")) {
                request.SetResponseStatus(userver::server::http::HttpStatus::kBadRequest);
                return R"({"error":"from, to, text are required"})";
            }

            const auto from = json["from"].As<int>();
            const auto to = json["to"].As<int>();
            const auto text = json["text"].As<std::string>();

            auto chat_res = pg_cluster_->Execute(
                userver::storages::postgres::ClusterHostType::kMaster,
                "SELECT c.id "
                "FROM chats c "
                "JOIN chat_members cm1 ON cm1.chat_id = c.id AND cm1.user_id = $1 "
                "JOIN chat_members cm2 ON cm2.chat_id = c.id AND cm2.user_id = $2 "
                "WHERE c.is_group = FALSE "
                "LIMIT 1",
                from, to);

            int chat_id = 0;

            if (chat_res.IsEmpty()) {
                auto created_chat = pg_cluster_->Execute(
                    userver::storages::postgres::ClusterHostType::kMaster,
                    "INSERT INTO chats(title, is_group) "
                    "VALUES($1, FALSE) "
                    "RETURNING id",
                    "private-chat");

                chat_id = created_chat.AsSingleRow<int>();

                pg_cluster_->Execute(
                    userver::storages::postgres::ClusterHostType::kMaster,
                    "INSERT INTO chat_members(chat_id, user_id) "
                    "VALUES($1, $2), ($1, $3)",
                    chat_id, from, to);
            } else {
                chat_id = chat_res.AsSingleRow<int>();
            }

            auto msg_res = pg_cluster_->Execute(
                userver::storages::postgres::ClusterHostType::kMaster,
                "INSERT INTO messages(chat_id, sender_id, content) "
                "VALUES($1, $2, $3) "
                "RETURNING id",
                chat_id, from, text);

            const auto message_id = msg_res.AsSingleRow<int>();

            request.SetResponseStatus(userver::server::http::HttpStatus::kCreated);

            userver::formats::json::ValueBuilder res;
            res["id"] = message_id;
            res["chat_id"] = chat_id;
            res["from"] = from;
            res["text"] = text;
            return userver::formats::json::ToString(res.ExtractValue());
        }


        if (request.GetMethod() == userver::server::http::HttpMethod::kGet) {
            auto user_id_arg = request.GetArg("user_id");
            if (user_id_arg.empty()) {
                request.SetResponseStatus(userver::server::http::HttpStatus::kBadRequest);
                return R"({"error":"user_id is required"})";
            }

            const auto user_id = std::stoi(user_id_arg);

            auto result = pg_cluster_->Execute(
                userver::storages::postgres::ClusterHostType::kSlave,
                "SELECT m.id, m.chat_id, m.sender_id, m.content "
                "FROM messages m "
                "JOIN chat_members cm ON cm.chat_id = m.chat_id "
                "WHERE cm.user_id = $1 "
                "ORDER BY m.created_at DESC",
                user_id);

            userver::formats::json::ValueBuilder arr;

            for (const auto& row : result) {
                userver::formats::json::ValueBuilder item;
                item["id"] = row["id"].As<int>();
                item["chat_id"] = row["chat_id"].As<int>();
                item["from"] = row["sender_id"].As<int>();
                item["text"] = row["content"].As<std::string>();
                arr.PushBack(item.ExtractValue());
            }

            return userver::formats::json::ToString(arr.ExtractValue());
        }

        request.SetResponseStatus(userver::server::http::HttpStatus::kMethodNotAllowed);
        return R"({"error":"Method not allowed"})";
    }

private:
    userver::storages::postgres::ClusterPtr pg_cluster_;
};

}  // namespace
