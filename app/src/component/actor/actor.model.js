define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        Common = require('/js/common.js');

    return Backbone.Model.extend({

        idAttribute: 'artistId',

        url : function () {
            return Common.getSecuredUrl('actors/' + this.id, true);
        },

        parse : function(data) {
            return data.results[0];
        }
    });
});
