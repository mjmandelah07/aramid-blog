const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

// GET click count data for all articles
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find();
    const clickCountData = articles;
    res.json(clickCountData);
  } catch (error) {
    console.error("Error fetching click count data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
