INSERT INTO users (username, email, password_hash) VALUES
('alice', 'alice@mail.com', 'hash1'),
('bob', 'bob@mail.com', 'hash2'),
('carol', 'carol@mail.com', 'hash3'),
('dave', 'dave@mail.com', 'hash4'),
('eva', 'eva@mail.com', 'hash5'),
('frank', 'frank@mail.com', 'hash6'),
('grace', 'grace@mail.com', 'hash7'),
('henry', 'henry@mail.com', 'hash8'),
('irene', 'irene@mail.com', 'hash9'),
('jack', 'jack@mail.com', 'hash10');

INSERT INTO profiles (user_id, first_name, last_name, bio, birth_date) VALUES
(1, 'Alice', 'Smith', 'Backend developer', '2000-01-01'),
(2, 'Bob', 'Johnson', 'Loves databases', '2000-02-02'),
(3, 'Carol', 'Brown', 'Writes APIs', '2000-03-03'),
(4, 'Dave', 'White', 'C++ developer', '2000-04-04'),
(5, 'Eva', 'Black', 'Machine learning fan', '2000-05-05'),
(6, 'Frank', 'Green', 'PostgreSQL user', '2000-06-06'),
(7, 'Grace', 'Hall', 'Docker enthusiast', '2000-07-07'),
(8, 'Henry', 'King', 'Chat service tester', '2000-08-08'),
(9, 'Irene', 'Moore', 'Wall service tester', '2000-09-09'),
(10, 'Jack', 'Lee', 'Auth service tester', '2000-10-10');

INSERT INTO posts (author_id, content, created_at) VALUES
(1, 'First post by Alice', '2025-04-01 10:00:00'),
(2, 'First post by Bob', '2025-04-01 10:10:00'),
(3, 'First post by Carol', '2025-04-01 10:20:00'),
(4, 'First post by Dave', '2025-04-01 10:30:00'),
(5, 'First post by Eva', '2025-04-01 10:40:00'),
(6, 'First post by Frank', '2025-04-01 10:50:00'),
(7, 'First post by Grace', '2025-04-01 11:00:00'),
(8, 'First post by Henry', '2025-04-01 11:10:00'),
(9, 'First post by Irene', '2025-04-01 11:20:00'),
(10, 'First post by Jack', '2025-04-01 11:30:00');

INSERT INTO chats (title, is_group, created_at) VALUES
('Alice and Bob', FALSE, '2025-04-02 09:00:00'),
('Carol and Dave', FALSE, '2025-04-02 09:10:00'),
('Study Group', TRUE, '2025-04-02 09:20:00'),
('Project Team', TRUE, '2025-04-02 09:30:00'),
('Eva and Frank', FALSE, '2025-04-02 09:40:00'),
('Grace and Henry', FALSE, '2025-04-02 09:50:00'),
('Database Group', TRUE, '2025-04-02 10:00:00'),
('Irene and Jack', FALSE, '2025-04-02 10:10:00'),
('Backend Team', TRUE, '2025-04-02 10:20:00'),
('Friends Chat', TRUE, '2025-04-02 10:30:00');

INSERT INTO chat_members (chat_id, user_id, joined_at) VALUES
(1, 1, '2025-04-02 09:00:00'),
(1, 2, '2025-04-02 09:00:00'),
(2, 3, '2025-04-02 09:10:00'),
(2, 4, '2025-04-02 09:10:00'),
(3, 1, '2025-04-02 09:20:00'),
(3, 3, '2025-04-02 09:20:00'),
(3, 5, '2025-04-02 09:20:00'),
(4, 2, '2025-04-02 09:30:00'),
(4, 4, '2025-04-02 09:30:00'),
(4, 6, '2025-04-02 09:30:00');

INSERT INTO messages (chat_id, sender_id, content, created_at) VALUES
(1, 1, 'Hi Bob', '2025-04-03 08:00:00'),
(1, 2, 'Hi Alice', '2025-04-03 08:01:00'),
(2, 3, 'Hello Dave', '2025-04-03 08:05:00'),
(2, 4, 'Hello Carol', '2025-04-03 08:06:00'),
(3, 1, 'Welcome to study group', '2025-04-03 08:10:00'),
(3, 3, 'Thanks', '2025-04-03 08:11:00'),
(3, 5, 'Glad to join', '2025-04-03 08:12:00'),
(4, 2, 'Project started', '2025-04-03 08:20:00'),
(4, 4, 'Okay', '2025-04-03 08:21:00'),
(4, 6, 'I am here', '2025-04-03 08:22:00');

INSERT INTO friendships (user_id, friend_id, status, created_at) VALUES
(1, 2, 'accepted', '2025-04-04 10:00:00'),
(2, 3, 'accepted', '2025-04-04 10:05:00'),
(3, 4, 'pending', '2025-04-04 10:10:00'),
(4, 5, 'blocked', '2025-04-04 10:15:00'),
(5, 6, 'accepted', '2025-04-04 10:20:00'),
(6, 7, 'accepted', '2025-04-04 10:25:00'),
(7, 8, 'pending', '2025-04-04 10:30:00'),
(8, 9, 'accepted', '2025-04-04 10:35:00'),
(9, 10, 'accepted', '2025-04-04 10:40:00'),
(10, 1, 'accepted', '2025-04-04 10:45:00');

INSERT INTO sessions (user_id, refresh_token, expires_at, created_at) VALUES
(1, 'token1', NOW() + INTERVAL '1 day', NOW()),
(2, 'token2', NOW() + INTERVAL '1 day', NOW()),
(3, 'token3', NOW() + INTERVAL '1 day', NOW()),
(4, 'token4', NOW() + INTERVAL '1 day', NOW()),
(5, 'token5', NOW() + INTERVAL '1 day', NOW()),
(6, 'token6', NOW() + INTERVAL '1 day', NOW()),
(7, 'token7', NOW() + INTERVAL '1 day', NOW()),
(8, 'token8', NOW() + INTERVAL '1 day', NOW()),
(9, 'token9', NOW() + INTERVAL '1 day', NOW()),
(10, 'token10', NOW() + INTERVAL '1 day', NOW());