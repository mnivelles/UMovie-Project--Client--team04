var hlp = require('./helper.js');
var js = require('./js.js');

var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var plumber = require('gulp-plumber');
var runSequence = require('run-sequence');

var config = {
    bitwise: true,
    camelcase: true,
    curly: true,
    eqeqeq: true,
    es3: false,
    freeze: true,
    immed: true,
    indent: 4,
    maxcomplexity: 3,
    maxdepth: 2,
    maxlen: 120,
    maxparams: 3,
    maxstatements:5,
    newcap: true,
    noarg: true,
    nocomma: true,
    noempty: true,
    nonbsp: true,
    nonew: true,
    quotmark: 'single',
    singleGroups: true,
    undef: true,
    unused: true,
    elision: true,
    //strict: true,
    browser: true,
    devel: gutil.env.production ? false : true,
    mocha: false,
    globals: {}
};

var normalConfig = Object.create(config);
var gulpConfig = Object.create(config);

normalConfig.globals = {
    'define': false
};

gulpConfig.globals = {
    'module': false,
    'require': false,
    '__dirname': false
};

var appFiles = {
    normal: js.watchable,
    gulp: ['gulpfile.js', 'gulp-task/**/*.js']
};

gulp.task('jshint:normal:hint', function() {
    if (gutil.env.production) {
        return;
    } else {
        return gulp.src(appFiles.normal)
            .pipe(plumber({errorHandler: hlp.displayError}))
            .pipe(jshint(normalConfig))
            .pipe(jshint.reporter(jshintStylish));
    }
});

gulp.task('jshint:gulp:hint', function() {
    if (gutil.env.production) {
        return;
    } else {
        return gulp.src(appFiles.gulp)
            .pipe(plumber({errorHandler: hlp.displayError}))
            .pipe(jshint(gulpConfig))
            .pipe(jshint.reporter(jshintStylish));
    }
});

gulp.task('jshint', function(callback) {
    runSequence('jshint:normal:hint', 'jshint:gulp:hint', callback);

    gutil.log(hlp.styledString(' o/ Successfully jsHint files ', ['blue']));
});
