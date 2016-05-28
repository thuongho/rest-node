// unit testing
// npm install gulp-mocha should sinon --save
var should = require('should'),
  sinon = require('sinon');

describe('Movie Controller Tests: ', function() {
  // Post tests
  describe('Post', function() {
    it('should not allow an empty title on post', function() {
      // In post, it is just movie.save so this doesn't have to do anything
      var Movie = function(movie){this.save = function(){}};

      var req = {
        body: {
          director: "James Cameron"
        }
      }

      // needs status and send
      var res = {
        status: sinon.spy(),
        send: sinon.spy()
      }

      var movieController = require('../Controllers/movieController')(Movie);

      // simulating the post
      movieController.post(req, res);

      // 400 bad request
      res.status.calledWith(400).should.equal(true, "Bad Status " + res.status.args[0][0]);
      res.send.calledWith('Title is required').should.equal(true);
    })
  })
})