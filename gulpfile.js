var gulp = require('gulp');
var through = require('gulp-through');
var preprocess = require('gulp-preprocess');
var PEG = require('pegjs');

gulpPeg = through('peg', function(file, config) {
  var result = PEG.buildParser(String(file.contents), {output: 'source'});
  file.contents = new Buffer(result);
  file.path = file.path.replace(/\.pegjs$/, '.js');
});

gulp.task('default', ['build']);

gulp.task('peg', function() {
  return gulp.src('*.pegjs')
      .pipe(gulpPeg())
      .pipe(gulp.dest('dist'));
});

gulp.task('build', ['peg'], function() {
  return gulp.src('archieml.js')
      .pipe(preprocess())
      .pipe(gulp.dest('dist'))
});

gulp.task('watch', ['peg', 'build'], function() {
  gulp.watch(['*.{js,pegjs}'], ['build']);
});
