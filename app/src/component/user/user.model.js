define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        Common = require('/js/common.js');

    return Backbone.Model.extend({

        urlRoot : function () {
            return Common.UMOVIE_API_BASE_URL_SECURED + 'users/';
        },

        follow : function(){
            var user = this.toJSON();
            var token = $.cookie(Common.LOGIN_TOKEN_COOKIE);
            var data = {access_token : token ,id: user.id};

            $.ajax({
                url : Common.UMOVIE_API_BASE_URL_SECURED + 'follow',
                type : 'POST',
                data : JSON.stringify(data),
                contentType: 'application/json'
            }).done(function(){
                var message = "now following " + user.name + " !";
                Materialize.toast(message, 4000, 'success-toast rounded');
            }).fail(function(){
                var message = "following failed! try again later";
                Materialize.toast(message, 4000, 'error-toast rounded');
            });
        }
    });
});
