const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

// Create a new comment
router.post("/", async (req, res) => {
    try {
      const { name, comment, datetime, avatar, email } = req.body;
      const newComment = new Comment({
        name,
        comment,
        datetime,
        avatar,
        email,
        replies: [], 
      });
      const savedComment = await newComment.save();
      res.json(savedComment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

// GET all comments
router.get("/", async (req, res) => {
    try {
      const comments = await Comment.find().populate("replies");
      res.status(200).json(comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

// Create a new reply to a comment
router.post("/:commentId/replies", async (req, res) => {
  try {
    const { name, reply, datetime, avatar } = req.body;
    const commentId = req.params.commentId;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    comment.replies.push({ name, reply, datetime, avatar });
    const savedComment = await comment.save();
    res.json(savedComment.replies[savedComment.replies.length - 1]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
