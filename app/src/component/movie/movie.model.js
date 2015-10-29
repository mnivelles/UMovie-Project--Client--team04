define(function (require) {

    'use strict';

    var Backbone = require('backbone');

    return Backbone.Model.extend({

        urlRoot : 'https://umovie.herokuapp.com/unsecure/movies',

        parse : function(data) {
            return data.results[0];
        }
    });
});
