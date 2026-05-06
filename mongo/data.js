use("social_network_mongo");

db.users.insertMany([
  {
    login: "alice",
    email: "alice@example.com",
    password: "123456",
    first_name: "Alice",
    last_name: "Smith",
    age: 22,
    interests: ["music", "movies"],
    created_at: new Date()
  },
  {
    login: "bob",
    email: "bob@example.com",
    password: "123456",
    first_name: "Bob",
    last_name: "Johnson",
    age: 25,
    interests: ["sport", "games"],
    created_at: new Date()
  },
  {
    login: "carol",
    email: "carol@example.com",
    password: "123456",
    first_name: "Carol",
    last_name: "Brown",
    age: 21,
    interests: ["books", "art"],
    created_at: new Date()
  },
  {
    login: "dave",
    email: "dave@example.com",
    password: "123456",
    first_name: "Dave",
    last_name: "White",
    age: 28,
    interests: ["travel", "cars"],
    created_at: new Date()
  },
  {
    login: "eva",
    email: "eva@example.com",
    password: "123456",
    first_name: "Eva",
    last_name: "Black",
    age: 24,
    interests: ["fashion", "music"],
    created_at: new Date()
  },
  {
    login: "frank",
    email: "frank@example.com",
    password: "123456",
    first_name: "Frank",
    last_name: "Green",
    age: 30,
    interests: ["fitness", "coding"],
    created_at: new Date()
  },
  {
    login: "grace",
    email: "grace@example.com",
    password: "123456",
    first_name: "Grace",
    last_name: "Hall",
    age: 23,
    interests: ["anime", "games"],
    created_at: new Date()
  },
  {
    login: "henry",
    email: "henry@example.com",
    password: "123456",
    first_name: "Henry",
    last_name: "King",
    age: 27,
    interests: ["football", "movies"],
    created_at: new Date()
  },
  {
    login: "irene",
    email: "irene@example.com",
    password: "123456",
    first_name: "Irene",
    last_name: "Moore",
    age: 26,
    interests: ["music", "travel"],
    created_at: new Date()
  },
  {
    login: "jack",
    email: "jack@example.com",
    password: "123456",
    first_name: "Jack",
    last_name: "Lee",
    age: 29,
    interests: ["tech", "cars"],
    created_at: new Date()
  }
]);

const users = db.users.find().toArray();

db.posts.insertMany([
  {
    author_id: users[0]._id,
    content: "Hello from Alice",
    tags: ["mongodb", "backend"],
    likes: [users[1]._id, users[2]._id],
    comments: [
      {
        user_id: users[1]._id,
        text: "Nice post!",
        created_at: new Date()
      }
    ],
    created_at: new Date()
  },
  {
    author_id: users[1]._id,
    content: "Bob first post",
    tags: ["sport"],
    likes: [users[0]._id],
    comments: [],
    created_at: new Date()
  },
  {
    author_id: users[2]._id,
    content: "Carol likes books",
    tags: ["books"],
    likes: [],
    comments: [],
    created_at: new Date()
  },
  {
    author_id: users[3]._id,
    content: "Travel is awesome",
    tags: ["travel"],
    likes: [users[4]._id],
    comments: [],
    created_at: new Date()
  },
  {
    author_id: users[4]._id,
    content: "Music time",
    tags: ["music"],
    likes: [],
    comments: [],
    created_at: new Date()
  },
  {
    author_id: users[5]._id,
    content: "Gym motivation",
    tags: ["fitness"],
    likes: [],
    comments: [],
    created_at: new Date()
  },
  {
    author_id: users[6]._id,
    content: "Anime recommendations",
    tags: ["anime"],
    likes: [users[0]._id],
    comments: [],
    created_at: new Date()
  },
  {
    author_id: users[7]._id,
    content: "Football news",
    tags: ["football"],
    likes: [],
    comments: [],
    created_at: new Date()
  },
  {
    author_id: users[8]._id,
    content: "Summer vacation",
    tags: ["travel"],
    likes: [],
    comments: [],
    created_at: new Date()
  },
  {
    author_id: users[9]._id,
    content: "Tech world",
    tags: ["tech"],
    likes: [users[0]._id, users[1]._id],
    comments: [],
    created_at: new Date()
  }
]);

db.messages.insertMany([
  {
    from_user_id: users[0]._id,
    to_user_id: users[1]._id,
    text: "Hello Bob",
    is_read: true,
    created_at: new Date()
  },
  {
    from_user_id: users[1]._id,
    to_user_id: users[0]._id,
    text: "Hi Alice",
    is_read: true,
    created_at: new Date()
  },
  {
    from_user_id: users[2]._id,
    to_user_id: users[3]._id,
    text: "How are you?",
    is_read: false,
    created_at: new Date()
  },
  {
    from_user_id: users[3]._id,
    to_user_id: users[4]._id,
    text: "Good morning",
    is_read: false,
    created_at: new Date()
  },
  {
    from_user_id: users[4]._id,
    to_user_id: users[5]._id,
    text: "MongoDB is cool",
    is_read: true,
    created_at: new Date()
  },
  {
    from_user_id: users[5]._id,
    to_user_id: users[6]._id,
    text: "See you later",
    is_read: false,
    created_at: new Date()
  },
  {
    from_user_id: users[6]._id,
    to_user_id: users[7]._id,
    text: "Let's play",
    is_read: true,
    created_at: new Date()
  },
  {
    from_user_id: users[7]._id,
    to_user_id: users[8]._id,
    text: "Football tonight",
    is_read: false,
    created_at: new Date()
  },
  {
    from_user_id: users[8]._id,
    to_user_id: users[9]._id,
    text: "Travel plans",
    is_read: true,
    created_at: new Date()
  },
  {
    from_user_id: users[9]._id,
    to_user_id: users[0]._id,
    text: "Hello from Jack",
    is_read: false,
    created_at: new Date()
  }
]);

print("Test data inserted");