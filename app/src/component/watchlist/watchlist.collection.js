/**
 * Created by erminewankpo on 2015-10-29.
 */

define(function (require) {

    var WatchListModel= require('watchlist.model');

    return Backbone.Collection.extend({
        model:WatchListModel,

        url : 'https://umovie.herokuapp.com/unsecure/watchlists',

        validate: function( attributes ){
            if( attributes.name == "" || attributes.owner==""){
                return "Name or owner can't be empty";
            }
        },

        initialize:function(){

            console.log(' model model');
            this.on("change", function(){
                console.log(' a change happened')
            });

            this.bind("error", function(model, error){
                console.log( error );
            });

        },

        parse: function (response) {
            return response;
        }

    });


});


