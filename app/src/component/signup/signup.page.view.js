define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        Nunjucks = require('nunjucks'),
        UserModel = require('user.model'),
        template = 'signup.nunj.html',
        Common = require('/js/common.js');

    return Backbone.View.extend({

        render: function() {
            var html = Nunjucks.render(template, {});
            this.$el.html(html);
            this.changePageTitleWith('Signup');

            return this;
        }
    });
});
