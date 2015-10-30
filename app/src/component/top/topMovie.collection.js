define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        TopMovieModel = require('/js/topMovie.model.js');

    var number = 25; // 10, 25, 50, 100

    return Backbone.Collection.extend({

        model: TopMovieModel,

        url: 'https://itunes.apple.com/us/rss/topmovies/limit=' + number + '/json',

        parse : function(data) {
            return data.feed.entry;
        }
    });
});
