define(function (require) {

    "use strict";

    var template = 'actor.page.nunj.html';

    return Backbone.View.extend({

        render: function () {
            var html = nunjucks.render(template, {});
            this.$el.html(html);
            return this;
        }
    });

});
