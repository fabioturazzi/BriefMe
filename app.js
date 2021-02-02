//Require dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

//Use pug as view engine
app.set('view engine', 'pug');

//Use static directory (for css, js) and body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://briefme:<briefmeapp>@briefmecluster.ylnmc.mongodb.net/<articledb>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


//Handle requests to home page
app.get('/', (req, res, next) => {
  //Read JSON data file and load project objects in the page
    var rawData = fs.readFileSync('data.json');
    var dataJson = JSON.parse(rawData);
    res.render('index', {articleData: dataJson.articleData, categories: dataJson.categories});
    next();
});
   
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

