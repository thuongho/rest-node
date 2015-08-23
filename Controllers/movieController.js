var movieController = function(Movie) {

  var post = function(req, res) {
    var movie = new Movie(req.body);  // pass in post data that's been sent to us

    // console.log(movie);
    movie.save();  // create new movie in MongoDB
    // 201 status is created
    res.status(201).send(movie);  // make id avail to client

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