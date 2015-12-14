define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        Common = require('/js/common.js');

    return Backbone.Collection.extend({
        initialize: function(searchString) {
            this.searchString = searchString;
        },
        url : function() {
            return Common.getSecuredUrl('search/movies?q=' + this.searchString + '&limit=99');
        },
        parse : function(result){
            return result.results;
        }
    });
});
