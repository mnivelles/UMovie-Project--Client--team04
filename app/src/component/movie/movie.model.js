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
        },

        addToWatchList: function(watchlistId) {
            $.ajax({
                url: Common.UMOVIE_API_BASE_URL + 'watchlists/' + watchlistId + '/movies',
                type: 'POST',
                data: JSON.stringify(this.toJSON()),
                contentType: 'application/json'
            }).done(function(){
                console.log('movie added to watchlist');
            }).fail(function(){
                console.log('add to watchlist failed');
            });
        }
    });
});
