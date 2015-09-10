// TODO à ajouter dans un Readme
// https://github.com/laravel/elixir license MIT

var notify = require('gulp-notify');

var n = {};

/**
 * Display a notification.
 *
 * @param {string} message
 */
n.success = function(message) {
    notify.logLevel(2);

    return notify({
        title: 'UMI project',
        message: message,
        icon: __dirname + '/../icon-notification-umi-project-logo.png',
        onLast: true,
        sound: 'Submarine'
    });
};


/**
 * Display an error notification.
 *
 * @param {object} e
 * @param {string} message
 */
n.error = function(e, message) {
    notify.logLevel(0);

    notify.onError({
        title: 'Erreur - UMI project',
        message: message + ' : <%= error.message %>',
        icon: __dirname + '/../icon-error-notification-umi-project-logo.png',
        onLast: true,
        sound: 'Glass'
    })(e);

    // We'll spit out the error, just in
    // case it is useful for the user.
    //console.log(e);
};

module.exports = n;
