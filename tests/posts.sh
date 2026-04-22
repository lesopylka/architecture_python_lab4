echo "Create post"
curl -i -X POST http://localhost:8083/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 123" \
  -d '{"user_id":1,"content":"hello"}'
echo -e "\n"

echo "Get posts"
curl -i "http://localhost:8083/posts?user_id=1" \
  -H "Authorization: Bearer 123"
echo -e "\n"
