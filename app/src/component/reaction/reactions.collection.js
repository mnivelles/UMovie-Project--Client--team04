define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        _ = require('underscore'),
        Common = require('/js/common.js'),
        ReactionsModel = require('/js/reactions.model.js');

    return Backbone.Collection.extend({
        model: ReactionsModel,

        parse: function (data) {
            return data;
        }
    });
});
