var gulp    = require('gulp');
var plugins = require('gulp-load-plugins')();
var run     = require('run-sequence');
var del     = require('del');
var dirs    = require('./package.json').config.dirs;

gulp.task('sass', function () {
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

gulp.task('js:vendor', function () {
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

gulp.task('js:main', function () {
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

gulp.task('js', function () {
  return run(['js:vendor', 'js:main']);
});

gulp.task('lint', function () {
  var src = dirs.js.main;
  plugins.util.log(plugins.util.colors.yellow('Linting ' + src));
  return gulp.src(src)
             .pipe(plugins.jshint())
             .pipe(plugins.jshint.reporter(plugins.stylish));
});

gulp.task('watch', function () {
  gulp.watch(dirs.js.main, ['lint', 'js']);
  gulp.watch(dirs.sass, ['sass']);
  return run(['lint', 'js', 'sass']);
});

gulp.task('app', plugins.shell.task(['node app/app.js']));

gulp.task('db', plugins.shell.task(['cd scripts && ./build_db.sh']));

gulp.task('dev', function () {
  return run(['js:vendor', 'watch', 'app']);
});

gulp.task('help', plugins.taskListing);

gulp.task('default', function () {
  return run('help');
});
