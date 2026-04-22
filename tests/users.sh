echo "Create user"
curl -i -X POST http://localhost:8082/users \
  -H "Content-Type: application/json" \
  -d '{"login":"alice2","email":"alice2@example.com","password":"123456","first_name":"Alice","last_name":"Smith"}'
echo -e "\n"

echo "Get users"
curl -i http://localhost:8082/users
echo -e "\n"

echo "Find by login"
curl -i "http://localhost:8082/users?login=alice"
echo -e "\n"