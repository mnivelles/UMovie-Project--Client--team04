define(function (require) {

    "use strict";

    var FeaturedMediaCarouselView = require('/js/component/carousel/featuredMediaCarousel.view.js'),
        template = 'home.nunj.html';

    return Backbone.View.extend({

        render: function () {
            var html = nunjucks.render(template, {});
            this.$el.html(html);

            var featuredMediaCarouselView = new FeaturedMediaCarouselView({el: $('.template-featuredMediaCarousel', this.el)});
            featuredMediaCarouselView.render();

            return this;
        }

    });

});
