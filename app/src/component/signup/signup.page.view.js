define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        Nunjucks = require('nunjucks'),
        template = 'signup.nunj.html',
        Common = require('/js/common.js');

    return Backbone.View.extend({

        events: {
            'click .signupButton': 'signup'
        },

        render: function() {
            var html = Nunjucks.render(template, {});
            this.$el.html(html);
            this.changePageTitleWith('Signup');

            return this;
        },

        signup: function() {
            $('.invalidInfo-card').hide();
            var signUpInfo = {
                'name' : $('#name').val(),
                'email' : $('#email').val(),
                'password': $('#password').val()
            }
            $.ajax({
                url: Common.UMOVIE_API_BASE_URL_SECURED + 'signup',
                type: 'POST',
                data: JSON.stringify(signUpInfo),
                contentType: 'application/json'
            }).done(function(data){
                Backbone.history.navigate('', true);
            }).fail(function(){
                $('.invalidInfo-card').show();
            });
        }
    });
});
