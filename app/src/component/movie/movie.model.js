define(function (require) {

    'use strict';

    var Backbone = require('backbone');

    return Backbone.Model.extend({

        urlRoot : '/movies',

        parse : function(data) {
            return data.results[0];
        }
    });
});
