var cte = require('./constante.js');

var gutil = require('gulp-util');

var notification = require('./Notification');

function inv(source) {
    return '!' + source;
}

function displayError(error) {
    var errorString = styledString(pluginStr(error), ['magenta', 'italic']);
    errorString += styledString(messageStr(error), ['red', 'bold']);
    errorString += fileNameStr(error);
    errorString += lineNumberStr(error);

    gutil.log(errorString);
    notification.error(error, 'Consultes le terminal');
    this.emit('end');
}

function pluginStr(error) {
    return '[' + error.plugin + ']';
}

function messageStr(error) {
    return ' ' + error.message.replace('\n', '');
}

function fileNameStr(error) {
    return error.fileName ? ' in ' + error.fileName : '';
}

function lineNumberStr(error) {
    return error.lineNumber ? ' on line ' + error.lineNumber : '';
}

function changeEvent(evt) {
    gutil.log('File', styledString(fileNameWithoutBasePath(evt.path), ['cyan']),
        'was', styledString(evt.type, ['magenta', 'italic']));
}

// TODO réutilisable ?
function fileNameWithoutBasePath(fileNamePath) {
    return fileNamePath.replace(new RegExp('/.*(?=/' + cte.basePaths.src + ')/'), '');
}

function styledString(source, styles) {
    var result = source;
    for (var i in styles) {
        result = styledStringWithProperty(result, styles[i]);
    }
    return result;
}

function styledStringWithProperty(source, property) {
    return gutil.colors[property](source);
}

module.exports.inv = inv;
module.exports.displayError = displayError;
module.exports.changeEvent = changeEvent;
module.exports.styledString = styledString;
