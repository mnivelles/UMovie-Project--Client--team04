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
            if(this._loginFormIsValid()) {
                var credentials = {
                    'email' : $('#email').val(),
                    'password': $('#password').val()
                };
                $.ajax({
                    url: Common.UMOVIE_API_BASE_URL_SECURED + 'login',
                    type: 'POST',
                    data: JSON.stringify(credentials),
                    contentType: 'application/json'
                }).done(function(data){
                    $.cookie(Common.LOGIN_TOKEN_COOKIE, data.token);
                    $.cookie(Common.CURRENT_USER_ID, data.id);
                    Backbone.history.navigate('', true);
                }).fail(function(jqXHR, textStatus, errorThrown){
                    if(jqXHR.status == 401) {
                        $('.invalidInfo-card').text('Invalid email or password.');
                        $('.invalidInfo-card').show();
                    } else {
                        $('.invalidInfo-card').text('Please try again later.');
                        $('.invalidInfo-card').show();
                    }
                });
            }
        },

        redirectToSignupPage: function() {
            Backbone.history.navigate('signup', true);
        },

        _loginFormIsValid: function() {
            if($('#email').val() == '') {
                $('.invalidInfo-card').text('Please fill the email field with your email.');
                $('.invalidInfo-card').show();
                return false;
            } else if($('#password').val() == '') {
                $('.invalidInfo-card').text('Please fill the password field with your password.');
                $('.invalidInfo-card').show();
                return false;
            }
            return true;
        }
    });
});
