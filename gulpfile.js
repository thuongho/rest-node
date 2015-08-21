// gulp will look for a file called gulpfile.js
var gulp = require('gulp'),
  nodemon = require('gulp-nodemon');

// default is the name of the task
gulp.task('default', function() {
  // nodemon takes in a json obj to configure itself
  nodemon({
    script: 'app.js',
    ext: 'js',  // watch for js extensions
    env: {
      PORT:8000
    },
    ignore: ['./node_modules/**']
  })
  // let us know when we restarted the server
  .on('restart', function() {
    console.log('Restarting...');
  });
});

// launch the web server with 'gulp' in terminal