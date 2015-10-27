define(function (require) {

    "use strict";

    var PageHeaderView  = require('pageHeader.view'),
        template = 'page.nunj.html';

    return Backbone.View.extend({

        initialize: function () {
        },

        render: function () {
            var html = nunjucks.render(template, {});
            this.$el.html(html);

            new PageHeaderView();

            return this;
        }
    });

});
