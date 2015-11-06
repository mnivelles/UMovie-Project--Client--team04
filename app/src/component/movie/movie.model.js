define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        Common = require('/js/common.js');

    return Backbone.Model.extend({

        idAttribute: 'trackId',

        urlRoot : function () {
            return Common.UMOVIE_API_BASE_URL + 'movies';
        },

        parse : function(data) {
            return data.results[0];
        }
    });
});
