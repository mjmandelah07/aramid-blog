const express = require('express');
const Article = require('../models/Article');

const router = express.Router();

// Create API endpoint to add a new article
router.post('/', async (req, res) => {
  const articleData = req.body;
  const newArticle = new Article(articleData);

  try {
    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    console.error('Error saving article:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Create API endpoint to get all articles
router.get('/', (req, res) => {
  Article.find()
    .populate('categories') // Populate the 'categories' field with category data
    .exec((err, articles) => {
      if (err) {
        console.error('Error fetching articles:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(200).json(articles);
      }
    });
});

router.post('/increment-click/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    article.clickCount += 1;
    await article.save();
    res.json(article);
  } catch (error) {
    console.error('Error incrementing click count:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;


