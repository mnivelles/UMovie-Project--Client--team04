/**
 * Created by erminewankpo on 2015-10-29.
 */

define(function (require) {

    'use strict';

    var Backbone = require('backbone');

    return Backbone.Model.extend({
        urlRoot : 'https://umovie.herokuapp.com/unsecure/watchlists',
        initialize:function(){
            console.log('called');
        },

        parse: function(response) {

            this.id = response.id;
            //console.log(response);
            return response;
        }

    });

});


