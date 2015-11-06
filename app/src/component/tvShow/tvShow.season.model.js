define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        Common = require('/js/common.js');

     return Backbone.Collection.extend({
        initialize: function (models, options) {
            this.id = options.id;
        },
        url: function () {
            return Common.UMOVIE_API_BASE_URL + 'tvshows/season/' + this.id;
        },

        parse: function (response) {
            return response.results;
        }
    });
});
