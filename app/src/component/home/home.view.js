define(function (require) {

    "use strict";

    var FeaturedMediaCarouselView = require('/js/component/carousel/featuredMediaCarousel.view.js'),
        MediaCarouselView = require('/js/component/carousel/mediaCarousel.view.js'),
        template = 'home.nunj.html';

    var newMovies = [
        {
            title: 'Interstellar',
            img: '/image/interstellar.jpg',
            url: '/'
        },{
            title: 'Big Hero 6',
            img: '/image/bighero6.jpg',
            url: '/'
        },{
            title: 'Kill Bill Vol. 1',
            img: '/image/killbill.jpg',
            url: '/'
        },{
            title: 'Up',
            img: '/image/up.jpg',
            url: '/'
        },{
            title: 'Batman Begins',
            img: '/image/batman.jpg',
            url: '/'
        },{
            title: 'The Imitation Game',
            img: '/image/theimitationgame.jpg',
            url: '/'
        },{
            title: 'Lord of the Rings: The Return of the King',
            img: '/image/lotr.jpg',
            url: '/'
        },{
            title: 'Star Trek: Into Darkness',
            img: '/image/startrek.jpg',
            url: '/'
        },{
            title: 'Forrest Gump',
            img: '/image/forestgump.jpg',
            url: '/'
        },{
            title: 'Mad Max: Fury Road',
            img: '/image/madmax.jpg',
            url: '/'
        },{
            title: 'Jurassic World',
            img: '/image/jurrassicworld.jpg',
            url: '/'
        },{
            title: 'Inside Out',
            img: '/image/insideout.jpg',
            url: '/'
        },{
            title: 'Avengers: Age of Ultron',
            img: '/image/avengers.jpg',
            url: '/'
        },{
            title: 'Mission Impossible: Rogue Nation',
            img: '/image/missionimpossible.jpg',
            url: '/'
        },{
            title: 'Pawn Sacrifice',
            img: '/image/pawnsacrifice.jpg',
            url: '/'
        }
    ];

    var newTVShow = [
        {
            title: 'Abstract',
            img: 'http://lorempixel.com/340/510/abstract',
            url: '/'
        },{
            title: 'Transport',
            img: 'http://lorempixel.com/340/510/transport',
            url: '/'
        },{
            title: 'Animals',
            img: 'http://lorempixel.com/340/510/animals',
            url: '/'
        },{
            title: 'Technics',
            img: 'http://lorempixel.com/340/510/technics',
            url: '/'
        },{
            title: 'Business',
            img: 'http://lorempixel.com/340/510/business',
            url: '/'
        },{
            title: 'Sports',
            img: 'http://lorempixel.com/340/510/sports',
            url: '/'
        },{
            title: 'Cats',
            img: 'http://lorempixel.com/340/510/cats',
            url: '/'
        },{
            title: 'Nature',
            img: 'http://lorempixel.com/340/510/nature',
            url: '/'
        },{
            title: 'City',
            img: 'http://lorempixel.com/340/510/city',
            url: '/'
        },{
            title: 'People',
            img: 'http://lorempixel.com/340/510/people',
            url: '/'
        },{
            title: 'Food',
            img: 'http://lorempixel.com/340/510/food',
            url: '/'
        },{
            title: 'Fashion',
            img: 'http://lorempixel.com/340/510/fashion',
            url: '/'
        },{
            title: 'Nightlife',
            img: 'http://lorempixel.com/340/510/nightlife',
            url: '/'
        }
    ];

    return Backbone.View.extend({

        render: function () {
            var html = nunjucks.render(template, {});
            this.$el.html(html);

            var featuredMediaCarouselView = new FeaturedMediaCarouselView({
                el: $('.template-featuredMediaCarousel', this.el)
            });
            featuredMediaCarouselView.render();

            var newMovieCarouselView = new MediaCarouselView({
                el: $('.template-newMovieCarousel', this.el),
                collection: newMovies
            });
            newMovieCarouselView.render();

            var newTVShowCarouselView = new MediaCarouselView({
                el: $('.template-newTVShowCarousel', this.el),
                collection: newTVShow
            });
            newTVShowCarouselView.render();

            return this;
        }

    });

});
