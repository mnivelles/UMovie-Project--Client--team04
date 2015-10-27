define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        Nunjucks = require('nunjucks'),
        PageHeaderView  = require('pageHeader.view'),
        template = 'page.nunj.html';

    return Backbone.View.extend({

        initialize: function () {
        },

        render: function () {
            var html = Nunjucks.render(template, {});
            this.$el.html(html);

            new PageHeaderView();

            return this;
        }
    });

});
