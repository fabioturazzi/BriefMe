const router = require("express").Router();
const fs = require('fs');
let Article = require("../models/article");
// var session = require('express-session');
// https://stackoverflow.com/questions/40755622/how-to-use-session-variable-with-nodejs
// var ssn;
// app.use(session({secret:'briefmeallday'}));

var rawData = fs.readFileSync('data.json');
var dataJson = JSON.parse(rawData);

//Router for home page of the application
router.route("/").get((req, res, next) => {
  // find all articles for a given category
  Article.find({})
    .then((articles) => {
      //Render home page with data from mongodb
        res.render('index', {articleData: articles, appData: dataJson});
        next();
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//Router for specific article categories
router.route("/:category").get((req, res, next) => {

  // find all articles for a given category
  Article.find({ 'category': req.params.category })
    .then((articles) => {
      //Render home page with data from mongodb filtered by category
        res.render('index', {articleData: articles, appData: dataJson});
        next();
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//Export router to be used in server.js
module.exports = router;
