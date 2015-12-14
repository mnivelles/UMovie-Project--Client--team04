define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        Common = require('/js/common.js');

    return Backbone.Collection.extend({
        initialize: function (models, options) {
            this.id = options.id;
        },
        url: function () {
            return Common.getSecuredUrl('tvshows/season/' + this.id + '/episodes', true);
        },
        parse: function (response) {
            return response.results;
        }
    });
});
