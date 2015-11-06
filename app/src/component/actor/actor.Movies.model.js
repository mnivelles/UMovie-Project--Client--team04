define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        Common = require('/js/common.js');

    return Backbone.Collection.extend({
        initialize: function(id) {
            this.id = id;
        },
        url : function() {
          return Common.UMOVIE_API_BASE_URL + 'actors/' + this.id + '/movies';
        },
        parse : function(result){
            return result.results;
        }
    });
});
