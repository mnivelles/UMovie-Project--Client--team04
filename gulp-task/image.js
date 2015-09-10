var cte = require('./constante.js');
var hlp = require('./helper.js');

var gulp = require('gulp');
var gutil = require('gulp-util');

var imageFolder = cte.basePaths.src + 'asset/image/';

var appFiles = {
    src: [imageFolder + '**/*.*'
    ]
};

gulp.task('image:copy', function() {
    return gulp.src(appFiles.src,
        {base: imageFolder})
        .pipe(gulp.dest(cte.basePaths.dest + 'image/'));
});

gulp.task('image', ['image:copy'], function() {
    gutil.log(hlp.styledString(' o/ Successfully copy images ', ['blue']));
});

module.exports.watchable = appFiles.src;
