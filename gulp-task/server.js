var cte = require('./constante.js');
var hlp = require('./helper.js');

var gulp = require('gulp');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var modRewrite = require('connect-modrewrite');

var config = {
    port: 8042,
    root: cte.basePaths.dest,
    middleware: function() {
        return [
            modRewrite(['^[^\\.]*$ /index.html [L]'])
        ];
    },
    livereload: true
};

// TODO chercher les paramètres de ce serveur
gulp.task('server:start', function() {
    connect.server(config);
});

gulp.task('server:reload', function () {
    gulp.src(cte.basePaths.dest + '**/*.*')
        .pipe(connect.reload());
});

gulp.task('server', ['server:start'], function() {
    gutil.log(hlp.styledString(' o/ Successfully started server ', ['blue']));
});

/*
 gulp.task('html', function () {
 gulp.src('./app/*.html')
 .pipe(connect.reload());
 });
 */
