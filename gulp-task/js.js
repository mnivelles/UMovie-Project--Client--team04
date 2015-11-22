var cte = require('./constante.js');
var hlp = require('./helper.js');

var gulp = require('gulp');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var flatten = require('gulp-flatten');

var paths = {
    src: cte.basePaths.src + 'src/',
    dest: cte.basePaths.dest + 'js/'
};

var appFiles = {
    src: [paths.src + '**/*.js']
};

var vendor = { // TODO en production, il faut utiliser un CDN pour ceux disponibles
    src: [
        cte.basePaths.bower + 'requirejs/require.js',
        cte.basePaths.bower + 'jquery/dist/jquery.js',
        cte.basePaths.bower + 'jquery.cookie/jquery.cookie.js',
        //cte.basePaths.bower + 'materialize/dist/js/materialize.js', // Materialize need jQuery

        // source : https://github.com/noodny/materializecss-amd
        // cette version v0.97.0 de materialize fonctionne avec requirejs
        cte.basePaths.src + 'asset/js/materialize.amd.js',

        cte.basePaths.bower + 'slick-carousel/slick/slick.js',
        cte.basePaths.bower + 'lodash/lodash.js', // au lieu de underscorejs
        cte.basePaths.bower + 'backbone/backbone.js', // Backbone need Lodash ou Underscore
        cte.basePaths.bower + 'nunjucks/browser/nunjucks-slim.js',

        // ajouter ici d'autres bibliothèques
        cte.basePaths.bower + 'bluebird/js/browser/bluebird.js',
        cte.basePaths.bower + 'moment/min/moment-with-locales.js'
    ],
    dest: paths.dest + 'lib/'
};

gulp.task('js:vendor:copy', function() {
    return gulp.src(vendor.src)
        .pipe(plumber({errorHandler: hlp.displayError}))
        .pipe(getUglify())
        .pipe(gulp.dest(vendor.dest));
});

gulp.task('js:app:copy', function() {
    return gulp.src(appFiles.src)
        .pipe(sourcemaps.init())
        .pipe(flatten())
        .pipe(plumber({errorHandler: hlp.displayError}))
        .pipe(getUglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dest));
});


gulp.task('js', ['js:vendor:copy', 'js:app:copy'], function() {
    gutil.log(hlp.styledString(' o/ Successfully processed Javascript files ', ['blue']));
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
