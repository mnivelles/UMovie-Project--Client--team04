define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        Common = require('/js/common.js');

    return Backbone.Model.extend({

        urlRoot : function () {
            return Common.UMOVIE_API_BASE_URL + 'watchlists';
        },

        parse : function(data) {
            return {
                movies: data.movies
            };
        }
    });
});
