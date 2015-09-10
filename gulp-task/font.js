var cte = require('./constante.js');
var hlp = require('./helper.js');

var gulp = require('gulp');
var gutil = require('gulp-util');

var fontFolder = cte.basePaths.src + 'asset/font/';

var appFiles = {
    src: [fontFolder + '**/*.*'
    ]
};

var vendor = {
    src: [
        // ajouter les polices des vendeurs
        cte.basePaths.bower + 'materialize/dist/font/**/*.*'
    ]
};

gulp.task('font:app:copy', function() {
    return gulp.src(appFiles.src,
        {base: fontFolder})
        .pipe(gulp.dest(cte.basePaths.dest + 'font/'));
});

gulp.task('font:vendor:copy', function() {
    return gulp.src(vendor.src)
        .pipe(gulp.dest(cte.basePaths.dest + 'font/'));
});


gulp.task('font', ['font:app:copy', 'font:vendor:copy'], function() {
    gutil.log(hlp.styledString(' o/ Successfully copy fonts ', ['blue']));
});

module.exports.watchable = appFiles.src;
