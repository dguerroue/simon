'use strict';

const gulp        = require('gulp');
const sass        = require('gulp-sass');
const cssmin      = require('gulp-cssmin');
const sourcemaps  = require('gulp-sourcemaps');
const rename      = require('gulp-rename');
const prefix      = require('gulp-autoprefixer');
const babel       = require('gulp-babel');
const uglify      = require('gulp-uglify');
const concat      = require('gulp-concat');
const imagemin    = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const del         = require('del');

// Static Server + watching scss/html files
function serve() {

}

function serve() {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    port: 3000
  });
}

// BrowserSync Reload
function browserSyncReload() {
  browserSync.reload();
}

// scss tasks
function scss() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sourcemaps.init())
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(prefix('last 2 versions'))
    .pipe(sourcemaps.write())
    .pipe(rename({
      basename: 'style'
    }))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream());
};

function scssMin() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(prefix('last 2 versions'))
    .pipe(cssmin())
    .pipe(rename({
      basename: 'style',
      suffix: '.min'
    }))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream());
};

// js tasks
function js() {
  return gulp.src('src/js/**/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('app.js'))
    // .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/js'))
    .pipe(browserSync.stream());
};
function jsMin() {
  return gulp.src('src/js/**/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(concat('app.js'))
    // .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/js'))
};

// images tasks
function images() {
  return gulp.src('src/img/**/*.+(png|jpg|gif|svg)')
    .pipe(imagemin())
    .pipe(gulp.dest('public/img'));
};

// php tasks
function php() {
  return gulp.src('src/php/**/*.php')
    .pipe(gulp.dest('public/php'));
};

// includes tasks
function inc() {
  return gulp.src('src/includes/**/*.php')
    .pipe(gulp.dest('public/includes'));
};

// Task to delete target build folder
function clean() {
  return del(['./public/']);
};


function watchFiles () {
  gulp.watch('src/scss/**/*.scss', gulp.series(scss)).on('change', browserSync.reload);;
  gulp.watch('src/js/**/*.js', gulp.series(js)).on('change', browserSync.reload);;
  gulp.watch('src/php/**/*.php', gulp.series(php));
  gulp.watch('src/includes/**/*.php', gulp.series(inc));
  gulp.watch('./**/*.php').on('change', browserSync.reload);
  gulp.watch('./*.html').on('change', browserSync.reload);
};

const watch = gulp.parallel(watchFiles)
const dev   = gulp.series(clean, gulp.parallel(scss, js, php, inc, images), gulp.parallel(watchFiles, serve))
const build = gulp.series(clean, gulp.parallel(scssMin, jsMin, php, inc, images))

exports.watch = watch
exports.dev = dev
exports.build = build