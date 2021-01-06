const GulpClient = require('gulp');
const {src, dest, series, parallel} = require('gulp');
const minify = require('gulp-minify');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const ghpages = require ('gh-pages');


const scriptTask = () => {
  return src('src/**/*.js', {sourcemaps: true})
  .pipe(minify({
    noSource: true,
  }))
  .pipe(concat("all.js"))
  .pipe(dest('dist/js/', {sourcemaps: true}));

}


const markupTask = () => {
  return src('src/*.html')
  .pipe(dest('dist/'))
}


const styleTask = () => {
  return src('src/*.css', {sourcemaps: true})
  .pipe(concat('styles.css'))
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(dest('dist/', {sourcemaps: true}));
}

const imageTask = () => {
  return src('src/images/**/*')
   .pipe(imagemin())
   .pipe(dest('dist/images/'))
}

const deployTask = () => {
  return ghpages.publish('dist', function (err) {});

}

exports.tasks = parallel(scriptTask, styleTask, markupTask, imageTask);
exports.deploy = series(scriptTask, styleTask, markupTask, imageTask, deployTask); 