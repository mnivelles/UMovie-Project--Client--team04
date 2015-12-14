define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        Common = require('/js/common.js');

    return Backbone.Model.extend({

        idAttribute: 'trackId',

        url : function () {
            return Common.getSecuredUrl('movies/' + this.id, true);
        },

        parse : function(data) {
            return data.results[0];
        },

        addToWatchList: function(watchlistId) {
            $.ajax({
                url: Common.getSecuredUrl('watchlists/' + watchlistId + '/movies', true),
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
