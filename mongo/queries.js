use("social_network_mongo");

db.users.insertOne({
  login: "newuser",
  email: "newuser@example.com",
  password: "123456",
  first_name: "New",
  last_name: "User",
  age: 20,
  interests: ["music", "games"],
  created_at: new Date()
});

db.posts.insertOne({
  author_id: db.users.findOne({ login: "alice" })._id,
  content: "New MongoDB post",
  tags: ["mongodb", "backend"],
  likes: [],
  comments: [],
  created_at: new Date()
});

db.messages.insertOne({
  from_user_id: db.users.findOne({ login: "alice" })._id,
  to_user_id: db.users.findOne({ login: "bob" })._id,
  text: "Hello from MongoDB",
  is_read: false,
  created_at: new Date()
});

//$eq
db.users.find({
  login: { $eq: "alice" }
});

//$ne
db.users.find({
  age: { $ne: 25 }
});

//$gt
db.users.find({
  age: { $gt: 23 }
});

//$lt
db.users.find({
  age: { $lt: 30 }
});

//$in
db.posts.find({
  tags: { $in: ["tech"] }
});

//$and
db.users.find({
  $and: [
    { age: { $gt: 20 } },
    { age: { $lt: 30 } }
  ]
});

//$or
db.messages.find({
  $or: [
    { is_read: true },
    { text: "Hello Bob" }
  ]
});

//update user
db.users.updateOne(
  { login: "alice" },
  {
    $set: {
      age: 23
    }
  }
);

//add interest
db.users.updateOne(
  { login: "alice" },
  {
    $addToSet: {
      interests: "mongodb"
    }
  }
);

//add like
db.posts.updateOne(
  { content: "Hello from Alice" },
  {
    $addToSet: {
      likes: db.users.findOne({ login: "bob" })._id
    }
  }
);

//add comment
db.posts.updateOne(
  { content: "Hello from Alice" },
  {
    $push: {
      comments: {
        user_id: db.users.findOne({ login: "carol" })._id,
        text: "Great post!",
        created_at: new Date()
      }
    }
  }
);

//remove like
db.posts.updateOne(
  { content: "Hello from Alice" },
  {
    $pull: {
      likes: db.users.findOne({ login: "bob" })._id
    }
  }
);

//mark message as read
db.messages.updateOne(
  { text: "Hello Bob" },
  {
    $set: {
      is_read: true
    }
  }
);

//delete message
db.messages.deleteOne({
  text: "Hello from MongoDB"
});

//delete post
db.posts.deleteOne({
  content: "New MongoDB post"
});

//delete user
db.users.deleteOne({
  login: "newuser"
});

db.posts.aggregate([
  {
    $group: {
      _id: "$author_id",
      posts_count: { $sum: 1 },
      likes_count: { $sum: { $size: "$likes" } }
    }
  },
  {
    $lookup: {
      from: "users",
      localField: "_id",
      foreignField: "_id",
      as: "author"
    }
  },
  {
    $unwind: "$author"
  },
  {
    $project: {
      _id: 0,
      login: "$author.login",
      posts_count: 1,
      likes_count: 1
    }
  },
  {
    $sort: {
      posts_count: -1
    }
  }
]);