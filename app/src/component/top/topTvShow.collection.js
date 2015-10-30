define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        _ = require('underscore'),
        TopTvShowModel = require('/js/topTvShow.model.js');

    var number = 25; // 10, 25, 50, 100

    return Backbone.Collection.extend({

        model: TopTvShowModel,

        url: 'https://itunes.apple.com/us/rss/toptvepisodes/limit=' + number + '/json',

        parse : function(data) {
            return _.uniq(data.feed.entry, function(item, key, a) {
                return item['im:collection']['im:name']['label'];
            });
        }
    });
});
