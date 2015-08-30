var movieController = function(Movie) {

  var post = function(req, res) {
    var movie = new Movie(req.body);  // pass in post data that's been sent to us

    if (!req.body.title) {
      res.status(400);
      res.send('Title is required');
    } else {
      // console.log(movie);
      movie.save();  // create new movie in MongoDB
      // 201 status is created
      // res.status(201).send(movie);  // make id avail to client

      // unchain for gulp tests
      res.status(201);
      res.send(movie);
    }
  };

  var get = function(req, res) {
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
        // HATEOS
        var returnMovie = [];
        movies.forEach(function(element, index, array) {
          // instead of adding links to Mongoose model, create a new obj with links
          var newMovie = element.toJSON();
          
          // linkable id
          newMovie.links = {};
          newMovie.links.self = 'http://' + req.headers.host + '/api/movies/' + newMovie._id;
          returnMovie.push(newMovie);
        });
        // res.json(movies);
        res.json(returnMovie);
      }
    });
  };

  return {
    post: post,
    get: get
  }
};

module.exports = movieController;