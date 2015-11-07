define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        _ = require('underscore'),
        Common = require('/js/common.js'),
        WatchListModel = require('/js/watchList.model.js');


    return Backbone.Collection.extend({

        model: WatchListModel,

        url : function () {
            return Common.UMOVIE_API_BASE_URL + 'watchlists';
        },

        parse : function(data) {
            return data;
        }
    });
});
