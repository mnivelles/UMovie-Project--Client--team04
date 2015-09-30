var cte = require('./constante.js');
var hlp = require('./helper.js');

var gulp = require('gulp');
var gutil = require('gulp-util');
var nunjucks = require('gulp-nunjucks');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var flatten = require('gulp-flatten');

var paths = {
    src: cte.basePaths.src + 'src/',
    dest: cte.basePaths.dest + 'js/'
};

var appFiles = {
    src: [paths.src + '**/*.nunj.html'],
    destName: 'template.min.js'
};

gulp.task('nunjucks:compile', function () {
    return gulp.src(appFiles.src)
        .pipe(flatten())
        .pipe(nunjucks())
        .pipe(plumber({errorHandler: hlp.displayError}))
        .pipe(concat(appFiles.destName))
        .pipe(getUglify())
        .pipe(gulp.dest(paths.dest));
});

gulp.task('nunjucks', ['nunjucks:compile'], function() {
    gutil.log(hlp.styledString(' o/ Successfully compile nunjucks files ', ['blue']));
});

function getUglify() {
    if (gutil.env.production) {
        return uglify({
            beautify: true,
            mangle: false
        }).on('error', function(err) {
            hlp.displayError(err);
        });
    } else {
        return gutil.noop();
    }
}

module.exports.watchable = appFiles.src;
