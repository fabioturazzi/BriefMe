//Require dependencies
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
// const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// app.use(cors());
app.use(express.json());

//Set pug as view engine
app.set('view engine', 'pug');

//Use static directory (for css, js) and body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));

const uri = "mongodb+srv://briefme:briefmeapp@briefmecluster.ylnmc.mongodb.net/briefmedb?retryWrites=true&w=majority&authSource=admin";
mongoose.connect(uri, {  useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const appRouter = require('./routes/router');

app.use('/', appRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
