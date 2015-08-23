var express = require('express');

// pass in Movie obj for the param
var routes = function(Movie) {

  // Route handler
  var movieRoutes = express.Router();
  var movieController = require('../Controllers/movieController')(Movie);

  movieRoutes.route('/')
    .post(movieController.post)
    .get(movieController.get);

  // middleware
  // next go from one middleware to the next (get, put, patch)
  movieRoutes.use('/:movieId', function(req, res, next) {
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

  movieRoutes.route('/:movieId')
    .get(function(req, res) {
      res.json(req.movie);
    }) // end of get
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
    }) // end of put
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
    }) // end of patch
    .delete(function(req, res) {
      req.movie.remove(function(err) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(204).send('Movie removed.'); // movie was deleted, send back msg
        }
      });
    }); // end of delete

  // make the function return the movieRoutes
  return movieRoutes;
};

module.exports = routes;