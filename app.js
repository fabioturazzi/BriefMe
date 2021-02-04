//Require dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
var models = require('./models');

// Yes! You can use the model defined in the models/user.js directly
var Article = mongoose.model('Article');

//Set pug as view engine
app.set('view engine', 'pug');

//Use static directory (for css, js) and body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));

const uri = "mongodb+srv://briefme:briefmeapp@briefmecluster.ylnmc.mongodb.net/briefmedb?retryWrites=true&w=majority&authSource=admin";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
    console.log('DB connection successful');
    //Listen for requests on localhost: 3000
    app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
    });
})
.catch((err) => {
  console.log(err);
});

//Handle requests to home page
app.get('/', (req, res, next) => {
  //Read JSON data file and load project objects in the page
  var rawData = fs.readFileSync('data.json');
  var dataJson = JSON.parse(rawData);

    // find all articles for a given category
    Article.find({}, function (err, articles) {
      if (err) return handleError(err);
      
      //Rearrange articles in 3 column arrays
      var rearrangedArticles = [];
      while(articles.length) rearrangedArticles.push(articles.splice(0,4));
      console.log(rearrangedArticles);
      res.render('index', {articleData: rearrangedArticles, categories: dataJson.categories});
      next();
    })
});

//Handle requests to home page
app.get('/:category', (req, res, next) => {
  //Read JSON data file and load project objects in the page
  var rawData = fs.readFileSync('data.json');
  var dataJson = JSON.parse(rawData);

    // find all articles for a given category
    Article.find({ 'category': req.params.category }, function (err, articles) {
      if (err) return handleError(err);
      
      //Rearrange articles in 3 column arrays
      var rearrangedArticles = [];
      while(articles.length) rearrangedArticles.push(articles.splice(0,3));
      res.render('index', {articleData: rearrangedArticles, categories: dataJson.categories});
      next();
    })
});


