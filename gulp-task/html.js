var cte = require('./constante.js');
var hlp = require('./helper.js');

var gulp = require('gulp');
var gutil = require('gulp-util');
var flatten = require('gulp-flatten');

var appFiles = {
    src: [cte.basePaths.src + 'src/**/*.html',
        hlp.inv(cte.basePaths.src + 'src/**/*.nunj.html')
        ]
};

gulp.task('html:copy', function() {
    return gulp.src(appFiles.src)
        .pipe(flatten())
        .pipe(gulp.dest(cte.basePaths.dest));
});

gulp.task('html', ['html:copy'], function() {
    gutil.log(hlp.styledString(' o/ Successfully copy HTML files ', ['blue']));
});

module.exports.watchable = appFiles.src;
