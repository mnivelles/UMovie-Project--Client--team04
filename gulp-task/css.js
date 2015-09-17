var cte = require('./constante.js');
var hlp = require('./helper.js');

var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');

var vendor = {
    src: [
        cte.basePaths.src + 'asset/css/nothing.css'//,
        // ajouter le CSS de lib externe
        //cte.basePaths.bower + 'spectrum/spectrum.css'
    ],
    destName: 'vendor.min.css'
};

gulp.task('css:vendor:concat', function() {
    return gulp.src(vendor.src)
        .pipe(concat(vendor.destName))
        .pipe(gulp.dest(cte.basePaths.dest + 'css/'));
});

gulp.task('css', ['css:vendor:concat'], function() {
    gutil.log(hlp.styledString(' o/ Successfully processed CSS files ', ['blue']));
});

module.exports.watchable = vendor.src;
