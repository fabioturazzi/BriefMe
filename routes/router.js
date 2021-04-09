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
  //Declare query string based on existing query parameters and parse to JSON
  var queryString = JSON.parse("{ "+
                    (req.query.category ? '"category":"' + req.query.category + '"' : "") + (req.query.category && req.query.source ? "," : "") +
                    (req.query.source ? '"source":"' + req.query.source + '"' : "") + " }");

  //Find all articles matching query string
  Article.find(queryString).sort({topstory: -1, title:1}).select({ "title": 1,"category": 1,"summary": 1,"topstory":1,"img": 1,"source": 1,"link": 1, "_id": 0})
  .then((articles) => {

    var queryCategories = JSON.parse("{" + (req.query.category ? '"category":"' + req.query.category + '"' : "") + "}");
    //Find unique categories from that source
    Article.find(queryCategories).distinct('source')
    .then((sources) => {
      //Render home page with data from mongodb
      res.render('index', {articleData: articles, appData: dataJson, currSources: sources, currSource: req.query.source, currCategory: req.query.category});
      next();
    })
    .catch((err) => res.status(400).json("Error: " + err));
  })
  .catch((err) => res.status(400).json("Error: " + err));
});

//Router for about page of the application
router.route("/about").get((req, res, next) => {

    //Find unique categories from that source
    Article.find({}).distinct('source')
    .then((sources) => {
      //Render home page with data from mongodb
      res.render('about', {appData: dataJson, currSources: sources});
      next();
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//Export router to be used in server.js
module.exports = router;
