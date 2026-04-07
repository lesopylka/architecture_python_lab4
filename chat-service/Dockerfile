FROM ghcr.io/userver-framework/ubuntu-22.04-userver-base:latest

WORKDIR /app
COPY . .

RUN cmake -S . -B build -G Ninja \
    -DUSERVER_FEATURE_TESTSUITE=OFF \
    -DUSERVER_FEATURE_CURL=OFF

RUN cmake --build build -j2

CMD ["./build/chat_service", "--config", "configs/static_config.yaml"]