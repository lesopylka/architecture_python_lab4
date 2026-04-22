echo "Send message"
curl -i -X POST http://localhost:8084/messages \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer 123" \
  -d '{"from":1,"to":2,"text":"hi"}'
echo -e "\n"

echo "Get messages"
curl -i "http://localhost:8084/messages?user_id=1" \
  -H "Authorization: Bearer 123"
echo -e "\n"