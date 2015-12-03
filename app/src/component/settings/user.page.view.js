define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        Nunjucks = require('nunjucks'),
        template = 'user.page.nunj.html';

    return Backbone.View.extend({

        render: function() {
            var html = Nunjucks.render(template, {});
            this.$el.html(html);

            this.changePageTitleWith('User');

            return this;
        }
    });
});
