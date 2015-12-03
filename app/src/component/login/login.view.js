define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        Nunjucks = require('nunjucks'),
        template = 'login.nunj.html',
        Common = require('/js/common.js');

    return Backbone.View.extend({

        events: {
            'click .loginButton': 'login',
            'click .signupButton': 'redirectToSignupPage'
        },

        render: function() {
            var html = Nunjucks.render(template, {});
            this.$el.html(html);
            this.changePageTitleWith('Login');

            return this;
        },

        login: function() {
            $('.invalidInfo-card').hide();
            var credentials = {
                'email' : $('#email').val(),
                'password': $('#password').val()
            }
            $.ajax({
                url: Common.UMOVIE_API_BASE_URL_SECURED + 'login',
                type: 'POST',
                data: JSON.stringify(credentials),
                contentType: 'application/json'
            }).done(function(data){
                $.cookie(Common.LOGIN_TOKEN_COOKIE, data.token);
                $.cookie(Common.CURRENT_USER_ID, data.id);
                Backbone.history.navigate('', true);
            }).fail(function(){
                $('.invalidInfo-card').show();
            });
        },

        redirectToSignupPage: function() {
            Backbone.history.navigate('signup', true);
        }
    });
});
