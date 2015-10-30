define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        TopTvShowModel = require('/js/topTvShow.model.js');

    var number = 25; // 10, 25, 50, 100

    return Backbone.Collection.extend({

        model: TopTvShowModel,

        url: 'https://itunes.apple.com/us/rss/toptvepisodes/limit=' + number + '/json',

        parse : function(data) {
            return data.feed.entry;
        }
    });
});
