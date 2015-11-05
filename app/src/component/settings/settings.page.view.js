define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        Nunjucks = require('nunjucks'),
        template = 'settings.page.nunj.html';

    return Backbone.View.extend({

        render: function() {
            var html = Nunjucks.render(template, {});
            this.$el.html(html);

            return this;
        }
    });

});
