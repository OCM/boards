var gulp    = require('gulp');
var plugins = require('gulp-load-plugins')();
var run     = require('run-sequence');
var del     = require('del');
var dirs    = require('./package.json').config.dirs;

gulp.task('build:sass', function () {
  var src  = dirs.sass;
  var dest = dirs.public + '/css';
  plugins.util.log(plugins.util.colors.yellow('Building ' + src));
  return gulp.src(src)
             .pipe(plugins.sass({
               outputStyle: 'compressed'
             }))
             .pipe(gulp.dest(dest))
             .on('error', plugins.util.log);
});

gulp.task('build:js:vendor', function () {
  var src = dirs.js.vendor;
  var dest = dirs.public + '/js';
  plugins.util.log(plugins.util.colors.yellow('Building ' + src));
  return gulp.src(src)
             .pipe(plugins.concat('vendor.js'))
             .pipe(gulp.dest(dest))
             .pipe(plugins.uglify())
             .pipe(plugins.rename('vendor.min.js'))
             .pipe(gulp.dest(dest))
             .on('error', plugins.util.log);
});

gulp.task('build:js:main', function () {
  var src = dirs.js.main;
  var dest = dirs.public + '/js';
  plugins.util.log(plugins.util.colors.yellow('Building ' + src));
  return gulp.src(src)
             .pipe(plugins.concat('main.js'))
             .pipe(plugins.babel())
             .pipe(gulp.dest(dest))
             .pipe(plugins.uglify())
             .pipe(plugins.rename('main.min.js'))
             .pipe(gulp.dest(dest))
             .on('error', plugins.util.log);
});

gulp.task('build:js:lint', function () {
  var src = dirs.js.main;
  plugins.util.log(plugins.util.colors.yellow('Linting ' + src));
  return gulp.src(src)
             .pipe(plugins.jshint())
             .pipe(plugins.jshint.reporter(plugins.stylish));
});

gulp.task('build:js', function () {
  return run(['build:js:vendor', 'build:js:main', 'build:js:lint']);
});

gulp.task('dev:watch', function () {
  gulp.watch(dirs.js.main, ['build:js']);
  gulp.watch(dirs.sass, ['build:sass']);
  return run(['build:js', 'build:sass']);
});

gulp.task('dev:app', plugins.shell.task(['node app/app.js']));

gulp.task('build:db', plugins.shell.task(['cd scripts && ./build_db.sh']));

gulp.task('dev', function () {
  return run(['dev:watch', 'dev:app']);
});

gulp.task('help', plugins.taskListing);
