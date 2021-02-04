const mongoose = require('mongoose');

// Define schema
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: String,
    description: String,
    category: String,
    img: String,
    source: String,
    link: String
  });

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;