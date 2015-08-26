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
        res.json(movies);
      }
    });
  };

  return {
    post: post,
    get: get
  }
};

module.exports = movieController;