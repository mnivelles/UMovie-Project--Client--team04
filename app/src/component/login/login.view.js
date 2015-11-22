define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        Nunjucks = require('nunjucks'),
        template = 'login.nunj.html';

    return Backbone.View.extend({

        render: function() {
            var html = Nunjucks.render(template, {});
            this.$el.html(html);
            this.changePageTitleWith('Login');

            return this;
        }
    });
});
