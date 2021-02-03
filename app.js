//Require dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose');
//Set pug as view engine
app.set('view engine', 'pug');

//Use static directory (for css, js) and body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));

// Define schema
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: String,
  description: String,
  category: String,
  img: Date
});


const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://briefme:<briefmeapp>@briefmecluster.ylnmc.mongodb.net/<articledb>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// listDatabases(MongoClient);

// async function listDatabases(client){
//   databasesList = await client.db().admin().listDatabases();
//   console.log("Databases:");
//   databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };


//Handle requests to home page
app.get('/', (req, res, next) => {
  //Read JSON data file and load project objects in the page
  var rawData = fs.readFileSync('data.json');
  var dataJson = JSON.parse(rawData);

  const uri = "mongodb+srv://briefme:briefmeapp@briefmecluster.ylnmc.mongodb.net/briefmedb?retryWrites=true&w=majority&authSource=admin";
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB Connected…")

    // With a JSON doc
    var Article = mongoose.model('Article', ArticleSchema);

    // find all athletes who play tennis, selecting the 'name' and 'age' fields
    Article.find({ 'category': "World" }, function (err, articles) {
      if (err) return handleError(err);
      // 'athletes' contains the list of athletes that match the criteria.
      console.log(articles);
      res.render('index', {articleData: articles, categories: dataJson.categories});
      next();
    })
  })
  .catch(err => console.log(err))

 
  
  // res.render('index', {articleData: dataJson.articleData, categories: dataJson.categories});
  // next();

});

function queryArticlesByCategory (articleCategory) {
  const uri = "mongodb+srv://briefme:briefmeapp@briefmecluster.ylnmc.mongodb.net/briefmedb?retryWrites=true&w=majority&authSource=admin";
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB Connected…")

    // With a JSON doc
    var Article = mongoose.model('Article', ArticleSchema);

    // find all athletes who play tennis, selecting the 'name' and 'age' fields
    Article.find({ 'category': articleCategory }, function (err, articles) {
      if (err) return handleError(err);
      // 'athletes' contains the list of athletes that match the criteria.
      console.log(articles);
      return articles;
    })
  })
  .catch(err => console.log(err))

}
// //Handle requests to home page
// app.get('/', (req, res, next) => {
//   //Read JSON data file and load project objects in the page
//   var rawData = fs.readFileSync('data.json');
//   var dataJson = JSON.parse(rawData);
//   res.render('index', {articleData: dataJson.articleData, categories: dataJson.categories});
//   next();
  
//   const uri = "mongodb+srv://briefme:<briefmeapp>@briefmecluster.ylnmc.mongodb.net/<articledb>?retryWrites=true&w=majority";
//   const client = new MongoClient(uri, { useNewUrlParser: true });
// });


//Dynamic routing for projects page (e.g.: link for project 0 is /projects/0)
app.get('/projects/:id', function(req , res, next){
    //Read JSON data file and load project objects in the page
    var rawData = fs.readFileSync('data.json');
    var projects = JSON.parse(rawData);
    res.render('project', {id:req.params.id, projectData: projects.projectData[req.params.id]});
    next();
  });

//Listen for requests on localhost: 3000
app.listen(3000, () => {
 console.log('The application is running on localhost:3000!')
});

