#!/bin/bash

echo "Create post"
curl -X POST http://localhost:8083/posts \
-H "Authorization: Bearer 123" \
-d '{"user_id":1,"content":"hello"}'
echo -e "\n"

echo "Get posts"
curl "http://localhost:8083/posts?user_id=1" \
-H "Authorization: Bearer 123"
echo -e "\n"