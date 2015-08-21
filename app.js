var express = require('express');

var app = express();

var port = process.env.PORT || 3000;

// handler
app.get('/', function(req, res) {
  res.send('welcome to my API!')
});

// listen to the port and tell us that the app is listening
app.listen(port, function() {
  console.log('Running on PORT: ' + port);
});