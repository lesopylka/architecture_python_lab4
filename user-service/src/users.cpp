#include <userver/formats/json.hpp>
#include <userver/server/handlers/http_handler_base.hpp>
#include <userver/server/http/http_method.hpp>
#include <userver/server/http/http_status.hpp>
#include <userver/storages/postgres/cluster.hpp>
#include <userver/storages/postgres/component.hpp>
#include <userver/components/component_context.hpp>

namespace {

class UsersHandler final : public userver::server::handlers::HttpHandlerBase {
public:
    static constexpr std::string_view kName = "handler-users";

    UsersHandler(const userver::components::ComponentConfig& config,
                 const userver::components::ComponentContext& context)
        : HttpHandlerBase(config, context),
          pg_cluster_(
              context.FindComponent<userver::components::Postgres>("postgres-db")
                  .GetCluster()) {}

    std::string HandleRequestThrow(
        const userver::server::http::HttpRequest& request,
        userver::server::request::RequestContext&) const override {

        if (request.GetMethod() == userver::server::http::HttpMethod::kPost) {
            auto json = userver::formats::json::FromString(request.RequestBody());

            if (!json.HasMember("login") ||
                !json.HasMember("email") ||
                !json.HasMember("password") ||
                !json.HasMember("first_name") ||
                !json.HasMember("last_name")) {
                request.SetResponseStatus(userver::server::http::HttpStatus::kBadRequest);
                return R"({"error":"login, email, password, first_name, last_name are required"})";
            }

            const auto login = json["login"].As<std::string>();
            const auto email = json["email"].As<std::string>();
            const auto password_hash = json["password"].As<std::string>();
            const auto first_name = json["first_name"].As<std::string>();
            const auto last_name = json["last_name"].As<std::string>();

            auto user_res = pg_cluster_->Execute(
                userver::storages::postgres::ClusterHostType::kMaster,
                "INSERT INTO users(username, email, password_hash) "
                "VALUES($1, $2, $3) "
                "RETURNING id",
                login, email, password_hash);

            const auto user_id = user_res.AsSingleRow<int>();

            pg_cluster_->Execute(
                userver::storages::postgres::ClusterHostType::kMaster,
                "INSERT INTO profiles(user_id, first_name, last_name) "
                "VALUES($1, $2, $3)",
                user_id, first_name, last_name);

            request.SetResponseStatus(userver::server::http::HttpStatus::kCreated);


            userver::formats::json::ValueBuilder res;
            res["id"] = user_id;
            res["login"] = login;
            res["email"] = email;
            res["first_name"] = first_name;
            res["last_name"] = last_name;
            return userver::formats::json::ToString(res.ExtractValue());
        }

        if (request.GetMethod() == userver::server::http::HttpMethod::kGet) {
            const auto login = request.GetArg("login");
            const auto name = request.GetArg("name");

            auto result = pg_cluster_->Execute(
                userver::storages::postgres::ClusterHostType::kSlave,
                "SELECT u.id, u.username, p.first_name, p.last_name "
                "FROM users u "
                "LEFT JOIN profiles p ON p.user_id = u.id "
                "WHERE ($1::text = '' OR u.username = $1) "
                "  AND ($2::text = '' OR p.first_name ILIKE '%' || $2 || '%' "
                "                   OR p.last_name ILIKE '%' || $2 || '%') "
                "ORDER BY u.id",
                login, name);

            userver::formats::json::ValueBuilder arr;

            for (const auto& row : result) {
                userver::formats::json::ValueBuilder item;
                item["id"] = row["id"].As<int>();
                item["login"] = row["username"].As<std::string>();
                item["first_name"] = row["first_name"].As<std::string>();
                item["last_name"] = row["last_name"].As<std::string>();
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
