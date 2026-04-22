FROM ghcr.io/userver-framework/ubuntu-22.04-userver-base:latest

RUN apt update && apt install -y \
    libpq-dev \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY . .

RUN cmake -S . -B build -G Ninja \
    -DUSERVER_FEATURE_TESTSUITE=OFF \
    -DUSERVER_FEATURE_CURL=OFF \
    -DUSERVER_FEATURE_POSTGRESQL=ON

RUN cmake --build build -j2
CMD ["./build/user_service", "--config", "configs/static_config.yaml"]