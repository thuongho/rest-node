var express = require('express'),
  mongoose = require('mongoose'),  // mongoose converts mongodb to json format
  bodyParser = require('body-parser');  // allows express to read the body and parse it into json

// opens a connection to the db and if movieAPI doesn't exist, it will create it
var db = mongoose.connect('mongodb://localhost/movieAPI');

// Movie db
var Movie = require('./models/movieModel');

var app = express();

var port = process.env.PORT || 3000;


// Let the app know that we will use the body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); // look at body for json obj and add to req.body

// Route handler
var movieRouter = express.Router();

movieRouter.route('/Movies')
  .post(function(req, res) {
    var movie = new Movie(req.body);  // pass in post data that's been sent to us

    // console.log(movie);
    movie.save();  // create new movie in MongoDB
    // 201 status is created
    res.status(201).send(movie);  // make id avail to client

  })
  .get(function(req, res) {
    // var query = req.query;  // this method allows anything to query the db
    var query = {}; // more secure

    if (req.query.genre) {
      query.genre = req.query.genre;
    } 

    // add query as a param to the find
    Movie.find(query, function(err, movies) {
      if (err) {
        res.status(500).send(err); // display 500 error page with the error
      } else {
        res.json(movies);
      }
    });
  });

movieRouter.route('/Movies/:movieId')
  .get(function(req, res) {
    Movie.findById(req.params.bookId, function(err, book) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(book);
      }
    });
  });

// path will be /api/Movies
app.use('/api', movieRouter);

// handler
app.get('/', function(req, res) {
  res.send('welcome to my API!')
});

// listen to the port and tell us that the app is listening
app.listen(port, function() {
  console.log('Running on PORT: ' + port);
});