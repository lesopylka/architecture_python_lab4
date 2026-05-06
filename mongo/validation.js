use("social_network_mongo");

db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "login",
        "email",
        "password",
        "first_name",
        "last_name",
        "created_at"
      ],
      properties: {
        login: {
          bsonType: "string",
          minLength: 3,
          description: "login must be a string"
        },

        email: {
          bsonType: "string",
          pattern: "^.+@.+\\..+$",
          description: "email must be valid"
        },

        password: {
          bsonType: "string",
          minLength: 6
        },

        first_name: {
          bsonType: "string"
        },

        last_name: {
          bsonType: "string"
        },

        age: {
          bsonType: "int",
          minimum: 0,
          maximum: 120
        },

        interests: {
          bsonType: "array",
          items: {
            bsonType: "string"
          }
        },

        created_at: {
          bsonType: "date"
        }
      }
    }
  }
});

db.createCollection("posts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "author_id",
        "content",
        "created_at"
      ],
      properties: {

        author_id: {
          bsonType: "objectId"
        },

        content: {
          bsonType: "string",
          minLength: 1
        },

        tags: {
          bsonType: "array",
          items: {
            bsonType: "string"
          }
        },

        likes: {
          bsonType: "array",
          items: {
            bsonType: "objectId"
          }
        },

        comments: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: [
              "user_id",
              "text",
              "created_at"
            ],
            properties: {

              user_id: {
                bsonType: "objectId"
              },

              text: {
                bsonType: "string"
              },

              created_at: {
                bsonType: "date"
              }
            }
          }
        },

        created_at: {
          bsonType: "date"
        }
      }
    }
  }
});

db.createCollection("messages", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "from_user_id",
        "to_user_id",
        "text",
        "is_read",
        "created_at"
      ],
      properties: {

        from_user_id: {
          bsonType: "objectId"
        },

        to_user_id: {
          bsonType: "objectId"
        },

        text: {
          bsonType: "string",
          minLength: 1
        },

        is_read: {
          bsonType: "bool"
        },

        created_at: {
          bsonType: "date"
        }
      }
    }
  }
});

//invalid user
db.users.insertOne({
  login: "ab",
  email: "wrong_email",
  password: "1",
  first_name: "Bad",
  last_name: "User",
  created_at: new Date()
});

//invalid post
db.posts.insertOne({
  content: "",
  created_at: new Date()
});

//invalid message
db.messages.insertOne({
  text: "",
  is_read: "yes"
});