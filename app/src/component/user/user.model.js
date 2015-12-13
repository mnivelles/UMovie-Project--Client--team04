define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        Common = require('/js/common.js');

    return Backbone.Model.extend({

        urlRoot : function () {
            return Common.UMOVIE_API_BASE_URL_SECURED + 'users/';
        },

        follow : function(callback){
            var user = this.toJSON();
            var data = {id: user.id};

            $.ajax({
                url : Common.getSecuredUrl('follow', true),
                type : 'POST',
                data : JSON.stringify(data),
                contentType: 'application/json'
            }).done(function(){
                var message = "Now following " + user.name + " !";
                Materialize.toast(message, 4000, 'success-toast rounded');
                if(typeof (callback) == 'function'){ callback();}
            }).fail(function(){
                var message = "Following failed! try again later";
                Materialize.toast(message, 4000, 'error-toast rounded');
            });
        },

        unFollow : function(callback){
            var user = this.toJSON();

            $.ajax({
                url : Common.getSecuredUrl('follow/' + user.id, false),
                type : 'DELETE',
                contentType: 'application/json'
            }).done(function(){
                var message = "Unfollow with succes! " + user.name + " !";
                Materialize.toast(message, 4000, 'information-toast rounded');
                if(typeof (callback) == 'function'){ callback();}
            }).fail(function(){
                var message = "Unfollowing failed! try again later";
                Materialize.toast(message, 4000, 'error-toast rounded');
            });
        }
    });
});
