define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        $ = require('jquery'),
        slick = require('slick'),
        Nunjucks = require('nunjucks'),
        template = 'mediaCarousel.nunj.html';

    return Backbone.View.extend({

        initialize: function() {

        },

        render: function () {
            var html = Nunjucks.render(template, {
                media: this.collection
            });
            this.$el.html(html);

            this.manageCarousel();

            return this;
        },

        manageCarousel: function() {
            $('.mediaCarousel', this.el).slick({
                infinite: false,
                arrows: true,
                speed: 300,
                slidesToShow: 7.5,
                slidesToScroll: 7,
                responsive: [
                    {
                        breakpoint: 1280,
                        settings: {
                            slidesToShow: 6.5,
                            slidesToScroll: 6,
                        }
                    },
                    {
                        breakpoint: 1000,
                        settings: {
                            slidesToShow: 5.5,
                            slidesToScroll: 5
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 4.5,
                            slidesToScroll: 4
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 3.5,
                            slidesToScroll: 3
                        }
                    }
                ]
            });
        }

    });

});
