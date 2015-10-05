define(function (require) {

    "use strict";

    var template = 'featuredMediaCarousel.nunj.html';

    return Backbone.View.extend({

        render: function () {
            var html = nunjucks.render(template, {
                featuredMedia: this.collection
            });
            this.$el.html(html);

            this.manageCarousel();

            return this;
        },

        manageCarousel: function() {
            $('#featuredMediaCarousel', this.el).slick({
                accessibility: true,
                dots: false,
                arrows: false,
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 600,
                centerMode: true,
                variableWidth: true,
                autoplay: true,
                autoplaySpeed: 2000,
                responsive: [
                    {
                        breakpoint: 650,
                        settings: {
                            variableWidth: false,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            centerMode: false,
                            autoplaySpeed: 2400
                        }
                    }
                ]
            });
        }

    });

});
