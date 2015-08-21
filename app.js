var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

// Route handler
var movieRouter = express.Router();

movieRouter.route('/Movies')
  .get(function(req, res) {
    var responseJson = { greeting: "Movies galore!" };

    res.json(responseJson);
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