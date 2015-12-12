define(function(require){

    'use strict';

    var Backbone = require('backbone'),
        _ = require('underscore'),
        Common = require('/js/common.js');

    return Backbone.Collection.extend({
        initialize : function (id) {
            this.id = id;
        },
        url : function(){
            return Common.getSecuredUrl('watchlists', true);
        },
        parse : function(watchlists){
            var userID = this.id;
            var userWatchlist = _.filter(watchlists, function(watchlist){
                return (typeof (watchlist.owner) != 'undefined' &&  watchlist.owner.id == userID);
            });
            return userWatchlist;
        }
    });
});
