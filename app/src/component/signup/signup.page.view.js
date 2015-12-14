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
            if(this._signupFormIsValid()) {
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
                    Materialize.toast('Registered', 4000, 'success-toast rounded');
                    Backbone.history.navigate('', true);
                }).fail(function(){
                    $('.invalidInfo-card').text('Please try again later.');
                    $('.invalidInfo-card').show();
                });
            }
        },

        _signupFormIsValid: function() {
            if ($('#name').val() == '') {
                $('.invalidInfo-card').text('Please fill the name field.');
                $('.invalidInfo-card').show();
                return false;
            } else if ($('#email').val() == '') {
                $('.invalidInfo-card').text('Please fill the email field.');
                $('.invalidInfo-card').show();
                return false;
            } else if (!this._emailIsValid($('#email').val())) {
                $('.invalidInfo-card').text('Please fill the email field with a valid email address.');
                $('.invalidInfo-card').show();
                return false;
            } else if($('#password').val() == '') {
                $('.invalidInfo-card').text('Please fill the password.');
                $('.invalidInfo-card').show();
                return false;
            } else if($('#confirmPassword').val() == '') {
                $('.invalidInfo-card').text('Please Confirm your password using the Confirm Password field.');
                $('.invalidInfo-card').show();
                return false;
            } else if($('#confirmPassword').val() !== $('#password').val()) {
                $('.invalidInfo-card').text('Make sure your password is identical in both Password and ' +
                    'Confirm Password fields.');
                $('.invalidInfo-card').show();
                return false;
            }
            return true;
        },

        _emailIsValid : function (email) {
            // regex prise sur stackoverflow : http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            console.log(re.test(email));
            return re.test(email);
        }
    });
});
