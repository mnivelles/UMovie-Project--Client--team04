
define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        Common = require('/js/common.js');

    return Backbone.Collection.extend({
        initialize: function(searchString) {
            this.searchString = searchString;
        },
        url : function() {
            return Common.UMOVIE_API_BASE_URL + 'search/tvshows/seasons?q=' + this.searchString + '&limit=20';
        },
        parse : function(result){
            return result.results;
        }
    });
});
