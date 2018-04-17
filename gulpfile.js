var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var stripCssComments = require('gulp-strip-css-comments');
var concat = require('gulp-concat');

gulp.task('pug', function() {
    gulp.src('./dev/pug/*.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('./dist'))
    gulp.src('./dev/pug/admin/*.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('./dist/admin'))
    .pipe(browserSync.stream())
});

gulp.task('css', function() {
    return gulp.src('./dev/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/assets/css'))
        .pipe(browserSync.stream())
});

gulp.task('images', function () {
    return gulp.src('dev/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/assets/img'))
});

gulp.task('copy', function () {
    return gulp.src('dev/scripts/*/*.js')
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(browserSync.stream())
})

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
});

/*gulp.task('scripts', function() {
    return gulp.src('./dev/scripts/*.js')
      .pipe(concat('script.js'))
      .pipe(stripCssComments(false))
      .pipe(gulp.dest('./dist/assets/js'))
      .pipe(browserSync.stream())
  });*/

gulp.task('watch', ['pug', 'browserSync', 'css', 'copy'], function () {
    gulp.watch('dev/pug/**/*.pug', ['pug']);
    gulp.watch('dev/sass/**/*.scss', ['css']);
    gulp.watch('dev/scripts/**/*.js', ['copy']);
});