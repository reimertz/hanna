'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var gls = require('gulp-live-server');

gulp.task('sass', function () {
  return gulp.src('*.scss')
    .pipe(sass().on('error', sass.logError))
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