define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        _ = require('underscore'),
        Common = require('/js/common.js');

    var listBaseUrl = Common.TMDB_API_BASE_URL + 'search/list?query=%s&api_key=' + Common.TMDB_API_KEY;
    var imageWidth = 342;
    var imageBaseUrl = 'http://image.tmdb.org/t/p/w' + imageWidth;

    return Backbone.Model.extend({
        initialize: function() {
            this.url = listBaseUrl.replace('%s', encodeURIComponent(this.get('query')));
        },

        parse : function(data) {
            var self = this;
            var result = _.filter(data.results, function(element) {
                return element.item_count >= self.get('minItemCount') &&
                    element.favorite_count >= self.get('minFavoriteCount');
            });
            var list = _.sample(result);
            var image = list.poster_path ?
                imageBaseUrl + list.poster_path + '?api_key=' + Common.TMDB_API_KEY :
                'http://dummyimage.com/342x514/cccccc/4d4d4d&text='+ encodeURIComponent('Image not found :(');
            return {
                title: list.name,
                img: image,
                url: '/#' + list.id
            };
        }
    });
});
