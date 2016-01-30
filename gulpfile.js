'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');
var gls = require('gulp-live-server');

gulp.task('sass', function () {
    var processors = [
      autoprefixer({browsers: ['last 10 version']})
    ];
  return gulp.src('*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./.tmp/'));
});

gulp.task('default', ['sass'], function(){
  var server = gls.static(['./', '.tmp/'], 3000);
  server.start();

  gulp.watch('*.scss', ['sass']);

  gulp.watch('./.tmp/*', function (file){
    server.notify.apply(server, [file]);
  });

  gulp.watch(['!gulpfile.js', '*.js'], function (file){
    server.notify.apply(server, [file]);
  });

  gulp.watch('*.html', function (file){
    server.notify.apply(server, [file]);
  });
})