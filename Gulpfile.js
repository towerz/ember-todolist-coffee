var gulp = require("gulp");
var browserify = require('gulp-browserify');
var changed = require('gulp-changed');
var coffee = require('gulp-coffee');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var utils = require('gulp-util');

var glob = require('glob').sync;
var mkdirp = require('mkdirp').sync;
var path = require('path');
var fs = require('fs');
var _ = require('underscore');

var paths = {
  files: ['src/**/*.js', 'src/**/*.css', 'src/**/*.coffee', 'src/**/*.scss'],
  main: ['src/index.js'],
  tests: ['test/**/*.js'],
  dest: 'bin'
};

var jstFile = "build/jst.js";
var codeTemplate = _.template("//This file is generated by JST\n" +
  "var _ = require('underscore');\n" +
  "module.exports = { " +
  "<% _.each(templates, function(template) { %>" +
  "'<%= template.name %>': _.template('<%= template.content %>')," +
  "<% }); %>" +
  "CSS: {" +
    "<% _.each(styles, function(style) { %>" +
      "'<%= style.name %>': '<%= style.content %>'," +
    "<% }); %>" +
  "}" +
"};");


function format(filePath) {
  var expression = path.dirname(filePath) + '/../' + path.basename(filePath);
  var name = path.basename(path.dirname(path.resolve(expression)));
  var content = fs.readFileSync(filePath).toString().replace(/\r?\n|\r/g, '');
  return {name: name, content: content};
}

function copy(file, dest) {
  fs.createReadStream(file).pipe(fs.createWriteStream(dest));
}

function copyAssets(asset) {
  copy(asset, paths.dest + '/assets/' + path.basename(asset));
}

gulp.task('sass', function () {
    return gulp.src('src/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest("build"));
});

gulp.task("jst", ["sass"], function() {
  var templates = glob('src/**/*.html').map(format);
  var styles = glob('{src,build}/**/*.css').map(format);
  fs.writeFileSync(jstFile, codeTemplate({templates: templates, styles: styles}));
});

gulp.task("assets", function() {
  mkdirp(paths.dest + '/assets/');
  glob('src/**/*.{png,jpeg,jpg,gif,swf,eot,ttf,svg}').map(copyAssets);
});

gulp.task('coffee', function() {
  gulp.src('src/**/*.coffee')
    .pipe(coffee({bare: true}).on('error', utils.log))
    .pipe(gulp.dest('build'));
});

gulp.task("copy-sources", function() {
  return gulp.src(paths.files.slice(0, 2))
    .pipe(gulp.dest('build'));
});

gulp.task("build", ["assets", "jst", "coffee", "copy-sources"], function () {
  return gulp.src('build/index.js', { read: false })
      .pipe(changed(paths.dest))
      .pipe(browserify())
      .pipe(gulp.dest(paths.dest))
      .on("error", function(err) {
        throw err;
      });
});

gulp.task("watch", ["build"], function() {
  gulp.watch(paths.files, function() {
    gulp.run('build');
  });
});

gulp.task("libs", function() {
  return gulp.src('bower.js')
});

gulp.task("default", ["build"]);
