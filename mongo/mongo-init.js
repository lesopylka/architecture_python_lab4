db = db.getSiblingDB("social_network_mongo");

db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["login", "email", "password", "first_name", "last_name", "created_at"],
      properties: {
        login: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9_]{3,30}$"
        },
        email: {
          bsonType: "string",
          pattern: "^.+@.+\\..+$"
        },
        password: {
          bsonType: "string",
          minLength: 6
        },
        first_name: { bsonType: "string" },
        last_name: { bsonType: "string" },
        age: {
          bsonType: "int",
          minimum: 0,
          maximum: 120
        },
        interests: {
          bsonType: "array",
          items: { bsonType: "string" }
        },
        created_at: { bsonType: "date" }
      }
    }
  }
});

const users = db.users.insertMany([
  {
    login: "alice",
    email: "alice@test.com",
    password: "123456",
    first_name: "Alice",
    last_name: "Smith",
    age: 25,
    interests: ["music", "books"],
    created_at: new Date()
  },
  {
    login: "bob",
    email: "bob@test.com",
    password: "123456",
    first_name: "Bob",
    last_name: "Johnson",
    age: 30,
    interests: ["sports"],
    created_at: new Date()
  },
  {
    login: "carol",
    email: "carol@test.com",
    password: "123456",
    first_name: "Carol",
    last_name: "Brown",
    age: 28,
    interests: ["movies"],
    created_at: new Date()
  },
  {
    login: "dave",
    email: "dave@test.com",
    password: "123456",
    first_name: "Dave",
    last_name: "White",
    age: 35,
    interests: ["travel"],
    created_at: new Date()
  },
  {
    login: "eva",
    email: "eva@test.com",
    password: "123456",
    first_name: "Eva",
    last_name: "Black",
    age: 22,
    interests: ["art"],
    created_at: new Date()
  },
  {
    login: "frank",
    email: "frank@test.com",
    password: "123456",
    first_name: "Frank",
    last_name: "Green",
    age: 40,
    interests: ["cars"],
    created_at: new Date()
  },
  {
    login: "grace",
    email: "grace@test.com",
    password: "123456",
    first_name: "Grace",
    last_name: "Hall",
    age: 27,
    interests: ["fashion"],
    created_at: new Date()
  },
  {
    login: "henry",
    email: "henry@test.com",
    password: "123456",
    first_name: "Henry",
    last_name: "King",
    age: 31,
    interests: ["tech"],
    created_at: new Date()
  },
  {
    login: "irene",
    email: "irene@test.com",
    password: "123456",
    first_name: "Irene",
    last_name: "Moore",
    age: 29,
    interests: ["fitness"],
    created_at: new Date()
  },
  {
    login: "jack",
    email: "jack@test.com",
    password: "123456",
    first_name: "Jack",
    last_name: "Lee",
    age: 33,
    interests: ["gaming"],
    created_at: new Date()
  }
]);

const userIds = users.insertedIds;

db.createCollection("posts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["author_id", "content", "tags", "likes", "comments", "created_at"],
      properties: {
        author_id: { bsonType: "objectId" },
        content: { bsonType: "string" },
        tags: {
          bsonType: "array",
          items: { bsonType: "string" }
        },
        likes: {
          bsonType: "array",
          items: { bsonType: "objectId" }
        },
        comments: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["user_id", "text", "created_at"],
            properties: {
              user_id: { bsonType: "objectId" },
              text: { bsonType: "string" },
              created_at: { bsonType: "date" }
            }
          }
        },
        created_at: { bsonType: "date" }
      }
    }
  }
});

db.posts.insertMany([
  {
    author_id: userIds["0"],
    content: "Hello world",
    tags: ["intro"],
    likes: [userIds["1"], userIds["2"]],
    comments: [
      {
        user_id: userIds["1"],
        text: "Nice post!",
        created_at: new Date()
      }
    ],
    created_at: new Date()
  },
  {
    author_id: userIds["1"],
    content: "Another post",
    tags: ["random"],
    likes: [],
    comments: [],
    created_at: new Date()
  },
  {
    author_id: userIds["2"],
    content: "MongoDB is cool",
    tags: ["db", "mongo"],
    likes: [userIds["0"]],
    comments: [],
    created_at: new Date()
  },
  {
    author_id: userIds["3"],
    content: "Travel blog",
    tags: ["travel"],
    likes: [],
    comments: [],
    created_at: new Date()
  },
  {
    author_id: userIds["4"],
    content: "Art post",
    tags: ["art"],
    likes: [],
    comments: [],
    created_at: new Date()
  },
  {
    author_id: userIds["5"],
    content: "Cars review",
    tags: ["cars"],
    likes: [],
    comments: [],
    created_at: new Date()
  },
  {
    author_id: userIds["6"],
    content: "Fashion trends",
    tags: ["fashion"],
    likes: [],
    comments: [],
    created_at: new Date()
  },
  {
    author_id: userIds["7"],
    content: "Tech news",
    tags: ["tech"],
    likes: [],
    comments: [],
    created_at: new Date()
  },
  {
    author_id: userIds["8"],
    content: "Fitness tips",
    tags: ["fitness"],
    likes: [],
    comments: [],
    created_at: new Date()
  },
  {
    author_id: userIds["9"],
    content: "Gaming post",
    tags: ["gaming"],
    likes: [],
    comments: [],
    created_at: new Date()
  }
]);

db.createCollection("messages", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["from_user_id", "to_user_id", "text", "is_read", "created_at"],
      properties: {
        from_user_id: { bsonType: "objectId" },
        to_user_id: { bsonType: "objectId" },
        text: { bsonType: "string" },
        is_read: { bsonType: "bool" },
        created_at: { bsonType: "date" }
      }
    }
  }
});

db.messages.insertMany([
  {
    from_user_id: userIds["0"],
    to_user_id: userIds["1"],
    text: "Hello!",
    is_read: false,
    created_at: new Date()
  },
  {
    from_user_id: userIds["1"],
    to_user_id: userIds["0"],
    text: "Hi!",
    is_read: true,
    created_at: new Date()
  },
  {
    from_user_id: userIds["2"],
    to_user_id: userIds["3"],
    text: "Hey",
    is_read: false,
    created_at: new Date()
  },
  {
    from_user_id: userIds["3"],
    to_user_id: userIds["4"],
    text: "Yo",
    is_read: false,
    created_at: new Date()
  },
  {
    from_user_id: userIds["4"],
    to_user_id: userIds["5"],
    text: "Hi there",
    is_read: false,
    created_at: new Date()
  },
  {
    from_user_id: userIds["5"],
    to_user_id: userIds["6"],
    text: "Test",
    is_read: false,
    created_at: new Date()
  },
  {
    from_user_id: userIds["6"],
    to_user_id: userIds["7"],
    text: "Message",
    is_read: false,
    created_at: new Date()
  },
  {
    from_user_id: userIds["7"],
    to_user_id: userIds["8"],
    text: "Ping",
    is_read: false,
    created_at: new Date()
  },
  {
    from_user_id: userIds["8"],
    to_user_id: userIds["9"],
    text: "Pong",
    is_read: false,
    created_at: new Date()
  },
  {
    from_user_id: userIds["9"],
    to_user_id: userIds["0"],
    text: "Last message",
    is_read: false,
    created_at: new Date()
  }
]);

print("MongoDB initialized with test data");