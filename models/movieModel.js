var mongoose = require('mongoose'),
  Schema = mongoose.Schema;  // Mongoose Schema

// structure of the data
var movieModel = new Schema({
  title: {type: String},
  director: {type: String},
  genre: {type: String},
  watch: {type: Boolean, default: false}
});

// load this model into mongoose, calling it Movie
module.exports = mongoose.model('Movie', movieModel);