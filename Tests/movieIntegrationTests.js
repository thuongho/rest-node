// npm install supertest gulp-env --save-dev
var should = require('should'),
  request = require('supertest'),
  app = require('../app'),
  mongoose = require('mongoose'),
  Movie = mongoose.model('Movie'),  // access model directly
  agent = request.agent(app);  // supertest agent executes all the http calls

describe('Movie CRUD Test', function() {
  it('Should allow a movie to be posted and return a watch and _id', function(done) {
    var moviePost = {title: "Infinite Galaxy", director: "Sam Smith", genre: "Sci-Fi"};

    agent.post('/api/movies')
      .send(moviePost)
      .expect(200)
      .end(function(err, results) {
        results.body.watch.should.equal(false);
        results.body.should.have.property('_id');
        done();
      })
  })

  afterEach(function(done) {
    Movie.remove().exec();
    done();
  })
})