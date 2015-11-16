define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        _ = require('underscore'),
        Common = require('/js/common.js');

    return Backbone.Model.extend({
        parse : function(data) {
            return data;
        }
    });
});
