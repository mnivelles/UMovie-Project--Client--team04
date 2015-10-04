define(function (require) {

    "use strict";

    var template = 'featuredMediaCarousel.nunj.html';

    var featuredMedia = [
        {
            title: 'The World of Animals',
            img: 'http://lorempixel.com/650/300/animals',
            url: '/'
        },{
            title: 'Sky Cities',
            img: 'http://lorempixel.com/g/650/300/city',
            url: '/'
        },{
            title: 'Overcrowded Land',
            img: 'http://lorempixel.com/650/300/people/2',
            url: '/'
        },{
            title: 'No Human\'s Planet',
            img: 'http://lorempixel.com/650/300/nature',
            url: '/'
        },{
            title: 'Kin Sekai',
            img: 'http://lorempixel.com/650/300/sports',
            url: '/'
        },{
            title: 'All works',
            img: 'http://lorempixel.com/g/650/300/business',
            url: '/'
        },{
            title: 'Takoyaki',
            img: 'http://lorempixel.com/650/300/food',
            url: '/'
        }
    ];

    return Backbone.View.extend({

        render: function () {
            var html = nunjucks.render(template, {featuredMedia: featuredMedia});
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
