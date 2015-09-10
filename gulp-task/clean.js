var cte = require('./constante.js');
var hlp = require('./helper.js');

var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');

gulp.task('clean', function() {
    del.sync([cte.basePaths.dest + '**', hlp.inv(cte.basePaths.dest)]);
    gutil.log(hlp.styledString(' o/ Successfully delete ' + cte.basePaths.dest + ' directory ', ['blue']));
});
