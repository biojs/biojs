var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');

// external tools
var path = require('path');
var join = path.join;
var mkdirp = require('mkdirp');
var gzip = require('gulp-gzip');
var clean = require('gulp-rimraf');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');

// config
var buildDir = "build";
var browserFile = "browser.js";
var packageConfig = require('./package.json');
var outputFile = packageConfig.name;

// auto config
var outputFileSt = outputFile + ".js";
var outputFilePath = join(buildDir,outputFileSt);
var outputFileMinSt = outputFile + ".min.js";
var outputFileMin = join(buildDir,outputFileMinSt);

// a failing test breaks the whole build chain
gulp.task('default', ['lint', 'build-browser', 'build-browser-gzip']);

gulp.task('lint', function() {
  return gulp.src('./src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});



gulp.task('test', function () {
    return gulp.src('./test/**/*.js', {read: false})
        .pipe(mocha({reporter: 'spec',
                    useColors: false}));
});

gulp.task('watch', function() {
   gulp.watch(['./src/**/*.js', './test/**/*.js'], function() {
     gulp.run('test');
   });
});

// browserify debug
gulp.task('build-browser',['init'], function() {
  return gulp.src(browserFile)
  .pipe(browserify({debug:true}))
  .pipe(rename(outputFileSt))
  .pipe(gulp.dest(buildDir));
});

// browserify min
gulp.task('build-browser-min',['init'], function() {
  return gulp.src(browserFile)
  .pipe(browserify({}))
  .pipe(uglify())
  .pipe(rename(outputFileMinSt))
  .pipe(gulp.dest(buildDir));
});
 
gulp.task('build-browser-gzip', ['build-browser-min'], function() {
  return gulp.src(outputFileMin)
    .pipe(gzip({append: false, gzipOptions: { level: 9 }}))
    .pipe(rename(outputFile + ".min.gz.js"))
    .pipe(gulp.dest(buildDir));
});



// will remove everything in build
gulp.task('clean', function() {
  return gulp.src(buildDir).pipe(clean());
});

// just makes sure that the build dir exists
gulp.task('init', ['clean'], function() {
  mkdirp(buildDir, function (err) {
    if (err) console.error(err)
  });
});


