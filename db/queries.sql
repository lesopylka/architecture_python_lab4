-- получить пользователя по id
SELECT u.id, u.username, u.email, u.created_at,
       p.first_name, p.last_name, p.bio, p.birth_date
FROM users u
LEFT JOIN profiles p ON p.user_id = u.id
WHERE u.id = 1;

-- получить пользователя по username
SELECT id, username, email, password_hash, created_at
FROM users
WHERE username = 'alice';

-- создать пользователя
INSERT INTO users (username, email, password_hash)
VALUES ('new_user', 'new_user@mail.com', 'new_hash');

-- создать профиль
INSERT INTO profiles (user_id, first_name, last_name, bio, birth_date)
VALUES (11, 'New', 'User', 'new profile', '2001-01-01');

-- получить посты пользователя
SELECT id, author_id, content, created_at
FROM posts
WHERE author_id = 1
ORDER BY created_at DESC;

-- создать пост
INSERT INTO posts (author_id, content)
VALUES (1, 'New post from user 1');

-- получить список чатов пользователя
SELECT c.id, c.title, c.is_group, c.created_at
FROM chats c
JOIN chat_members cm ON cm.chat_id = c.id
WHERE cm.user_id = 1
ORDER BY c.created_at DESC;

-- получить участников чата
SELECT u.id, u.username, u.email
FROM chat_members cm
JOIN users u ON u.id = cm.user_id
WHERE cm.chat_id = 1;

-- получить сообщения чата
SELECT id, chat_id, sender_id, content, created_at
FROM messages
WHERE chat_id = 1
ORDER BY created_at ASC;

-- создать сообщение
INSERT INTO messages (chat_id, sender_id, content)
VALUES (1, 1, 'hello from queries.sql');

-- получить друзей пользователя
SELECT u.id, u.username, f.status, f.created_at
FROM friendships f
JOIN users u ON u.id = f.friend_id
WHERE f.user_id = 1 AND f.status = 'accepted'
ORDER BY f.created_at DESC;

-- создать заявку в друзья
INSERT INTO friendships (user_id, friend_id, status)
VALUES (1, 3, 'pending');

-- обновить статус дружбы
UPDATE friendships
SET status = 'accepted'
WHERE user_id = 1 AND friend_id = 3;

-- получить активные сессии пользователя
SELECT id, user_id, refresh_token, expires_at, created_at
FROM sessions
WHERE user_id = 1 AND expires_at > NOW();

-- создать сессию
INSERT INTO sessions (user_id, refresh_token, expires_at)
VALUES (1, 'token_new', NOW() + INTERVAL '7 days');

-- удалить истекшие сессии
DELETE FROM sessions
WHERE expires_at <= NOW();