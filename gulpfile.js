var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('default', function() {
  // place code for your default task here
  return gulp.src('server/**/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('dist'));
});