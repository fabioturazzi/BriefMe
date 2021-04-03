const mongoose = require('mongoose');

// Define schema
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: String,
    // description: String,
    summary: String,
    category: String,
    img: String,
    topstory: String,
    source: String,
    link: String
  });

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;