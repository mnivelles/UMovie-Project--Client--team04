var cte = require('./constante.js');
var hlp = require('./helper.js');

var gulp = require('gulp');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var del = require('del');

// var autoprefixer = require('gulp-autoprefixer'); Non nécessaire car Chrome seulement

var scssFolder = cte.basePaths.src + 'asset/scss/';

gulp.task('scss:materialize-config:copy', function() {
    del.sync(cte.basePaths.bower + 'materialize/sass/materialize.scss');

    return gulp.src(scssFolder + '_materialize.scss',
        {base: scssFolder})
        .pipe(gulp.dest(cte.basePaths.bower + 'materialize/sass/materialize.scss'));
});

var paths = {
    includePaths: [
        scssFolder,

        // vendor
        cte.basePaths.bower + 'materialize/sass/',
        cte.basePaths.bower + 'jeet/scss/'
    ],
    dest: cte.basePaths.dest + 'css/'
};

var appFiles = {
    src: scssFolder + 'app.scss',
    watchable: scssFolder + '**/*.scss',
    destName: 'app.min.css'
};

gulp.task('scss:compile', ['scss:materialize-config:copy'], function() {
    return gulp.src(appFiles.src)
        .pipe(sourcemaps.init())
        .pipe(plumber({errorHandler: hlp.displayError}))
        .pipe(sass({
            includePaths: paths.includePaths,
            outputStyle: getScssStyle(),
            noCache: true
        }))
        .pipe(rename(appFiles.destName))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dest));
});

gulp.task('scss', ['scss:compile'], function() {
    gutil.log(hlp.styledString(' o/ Successfully processed SCSS files ', ['blue']));
});


function getScssStyle() {
    if (gutil.env.production) {
        return 'compressed';
    } else {
        return 'expanded';
    }
}

module.exports.watchable = appFiles.watchable;
