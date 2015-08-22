var express = require('express');

// pass in Movie obj for the param
var routes = function(Movie) {

  // Route handler
  var movieRouter = express.Router();

  movieRouter.route('/')
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

  // middleware
  // next go from one middleware to the next (get, put, patch)
  movieRouter.use('/:movieId', function(req, res, next) {
    Movie.findById(req.params.movieId, function(err, movie) {
      if (err) {
        res.status(500).send(err);
      } else if (movie) {
        
        // if movie exists
        req.movie = movie;
        next();

      } else {
        res.status(404).send('No movie found.');
      }
    });
  });

  movieRouter.route('/:movieId')
    .get(function(req, res) {
      res.json(req.movie);
    })
    .put(function(req, res) {
      req.movie.title = req.body.title;
      req.movie.director = req.body.director;
      req.movie.genre = req.body.genre;
      req.movie.watch = req.body.watch;
      
      // asynchronous save
      req.movie.save(function(err) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(req.movie);
        }
      });
    })
    .patch(function(req, res) {
      if (req.body._id) {
        delete req.body._id;
      }

      for (var key in req.body) {
        req.movie[key] = req.body[key];
      }

      req.movie.save(function(err) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(req.movie);
        }
      });
    });
  // make the function return the movieRouter
  return movieRouter;
};

module.exports = routes;