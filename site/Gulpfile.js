var gulp = require('gulp');
var sass = require('gulp-sass');
var bs = require('browser-sync').create();
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
const babel = require('gulp-babel');

gulp.task('browser-sync', ['sass'], function() {
  bs.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('sass', function () {
  return gulp.src('scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'))
    .pipe(bs.reload({stream: true}));
});

gulp.task('js', function () {
  return gulp.src('js/*js')
    .pipe(concat('scripts.js'))
    .pipe(babel({
            presets: ['es2015']
        }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(bs.reload({stream: true}));
});

gulp.task('watch', ['browser-sync'], function () {
  gulp.watch("scss/*.scss", ['sass']);
  gulp.watch("js/*.js", ['js']);
  gulp.watch("index.html").on('change', bs.reload);
});

var jsFiles = 'js/*.js',
    jsDest = 'dist/js';

gulp.task('scripts', function() {
  return gulp.src(jsFiles)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(jsDest));
});