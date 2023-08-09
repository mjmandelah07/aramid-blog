const mongoose = require("mongoose");
const Article = require("./Article");

const replySchema = new mongoose.Schema({
  name: String,
  reply: String,
  datetime: Date,
  avatar: String, // Avatar URL for the reply
  nestedReplies: [this], // nested replies
});

const commentSchema = new mongoose.Schema({
  name: String,
  comment: String,
  email: String,
  datetime: Date,
  avatar: String, // Avatar URL for the comment
  article: { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
  replies: [replySchema],
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
