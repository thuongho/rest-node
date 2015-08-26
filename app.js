var express = require('express'),
  mongoose = require('mongoose'),  // mongoose converts mongodb to json format
  bodyParser = require('body-parser');  // allows express to read the body and parse it into json

// opens a connection to the db and if movieAPI doesn't exist, it will create it
var db;

if (process.env.ENV == 'Test') {
  db = mongoose.connect('mongodb://localhost/movieAPI_test');
} else {
  db = mongoose.connect('mongodb://localhost/movieAPI');
}

// Movie db from model
var Movie = require('./models/movieModel');

var app = express();

var port = process.env.PORT || 3000;


// Let the app know that we will use the body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); // look at body for json obj and add to req.body

// execute the function to return back the movieRoutes
movieRoutes = require('./Routes/movieRoutes')(Movie);  // inject Movie model to use in the router

// Route paths
app.use('/api/movies', movieRoutes);  // path will be localhost:8000/api/movies
// app.use('/api/directors', directorRouter);

// handler
app.get('/', function(req, res) {
  res.send('welcome to my API!')
});

// listen to the port and tell us that the app is listening
app.listen(port, function() {
  console.log('Running on PORT: ' + port);
});

module.exports = app;