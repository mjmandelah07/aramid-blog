const mongoose = require('mongoose');
const Category = require('./Category'); 

const articleSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: { type: Date, default: Date.now }, 
  author: String,
  mainImage: String,
  clickCount: { type: Number, default: 0},
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
});

module.exports = mongoose.model('Article', articleSchema);
