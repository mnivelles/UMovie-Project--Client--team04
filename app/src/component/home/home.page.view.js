define(function (require) {

    "use strict";

    var FeaturedMediaCarouselView = require('/js/featuredMediaCarousel.view.js'),
        MediaCarouselView = require('/js/mediaCarousel.view.js'),
        template = 'home.page.nunj.html';

    var featuredMedia = [
        {
            title: 'The World of Animals',
            img: 'http://lorempixel.com/650/300/animals',
            url: '/movies/1'
        },{
            title: 'Sky Cities',
            img: 'http://lorempixel.com/g/650/300/city',
            url: '/tv-shows/1'
        },{
            title: 'Overcrowded Land',
            img: 'http://lorempixel.com/650/300/people/2',
            url: '/movies/1'
        },{
            title: 'No Human\'s Planet',
            img: 'http://lorempixel.com/650/300/nature',
            url: '/tv-shows/1'
        },{
            title: 'Kin Sekai',
            img: 'http://lorempixel.com/650/300/sports',
            url: '/movies/1'
        },{
            title: 'All works',
            img: 'http://lorempixel.com/g/650/300/business',
            url: '/tv-shows/1'
        },{
            title: 'Takoyaki',
            img: 'http://lorempixel.com/650/300/food',
            url: '/movies/1'
        }
    ];

    var newMovies = [
        {
            title: 'Interstellar',
            img: '/image/interstellar.jpg',
            url: '/movies/1'
        },{
            title: 'Big Hero 6',
            img: '/image/bighero6.jpg',
            url: '/movies/1'
        },{
            title: 'Kill Bill Vol. 1',
            img: '/image/killbill.jpg',
            url: '/movies/1'
        },{
            title: 'Up',
            img: '/image/up.jpg',
            url: '/movies/1'
        },{
            title: 'Batman Begins',
            img: '/image/batman.jpg',
            url: '/movies/1'
        },{
            title: 'The Imitation Game',
            img: '/image/theimitationgame.jpg',
            url: '/movies/1'
        },{
            title: 'Lord of the Rings: The Return of the King',
            img: '/image/lotr.jpg',
            url: '/movies/1'
        },{
            title: 'Star Trek: Into Darkness',
            img: '/image/startrek.jpg',
            url: '/movies/1'
        },{
            title: 'Forrest Gump',
            img: '/image/forestgump.jpg',
            url: '/movies/1'
        },{
            title: 'Mad Max: Fury Road',
            img: '/image/madmax.jpg',
            url: '/movies/1'
        },{
            title: 'Jurassic World',
            img: '/image/jurrassicworld.jpg',
            url: '/movies/1'
        },{
            title: 'Inside Out',
            img: '/image/insideout.jpg',
            url: '/movies/1'
        },{
            title: 'Avengers: Age of Ultron',
            img: '/image/avengers.jpg',
            url: '/movies/1'
        },{
            title: 'Mission Impossible: Rogue Nation',
            img: '/image/missionimpossible.jpg',
            url: '/movies/1'
        },{
            title: 'Pawn Sacrifice',
            img: '/image/pawnsacrifice.jpg',
            url: '/movies/1'
        }
    ];

    var newTVShow = [
        {
            title: 'Abstract',
            img: 'http://lorempixel.com/340/510/abstract',
            url: '/tv-shows/1'
        },{
            title: 'Transport',
            img: 'http://lorempixel.com/340/510/transport',
            url: '/tv-shows/1'
        },{
            title: 'Animals',
            img: 'http://lorempixel.com/340/510/animals',
            url: '/tv-shows/1'
        },{
            title: 'Technics',
            img: 'http://lorempixel.com/340/510/technics',
            url: '/tv-shows/1'
        },{
            title: 'Business',
            img: 'http://lorempixel.com/340/510/business',
            url: '/tv-shows/1'
        },{
            title: 'Sports',
            img: 'http://lorempixel.com/340/510/sports',
            url: '/tv-shows/1'
        },{
            title: 'Cats',
            img: 'http://lorempixel.com/340/510/cats',
            url: '/tv-shows/1'
        },{
            title: 'Nature',
            img: 'http://lorempixel.com/340/510/nature',
            url: '/tv-shows/1'
        },{
            title: 'City',
            img: 'http://lorempixel.com/340/510/city',
            url: '/tv-shows/1'
        },{
            title: 'People',
            img: 'http://lorempixel.com/340/510/people',
            url: '/tv-shows/1'
        },{
            title: 'Food',
            img: 'http://lorempixel.com/340/510/food',
            url: '/tv-shows/1'
        },{
            title: 'Fashion',
            img: 'http://lorempixel.com/340/510/fashion',
            url: '/tv-shows/1'
        },{
            title: 'Nightlife',
            img: 'http://lorempixel.com/340/510/nightlife',
            url: '/tv-shows/1'
        }
    ];

    return Backbone.View.extend({

        render: function () {
            var html = nunjucks.render(template, {});
            this.$el.html(html);

            var featuredMediaCarouselView = new FeaturedMediaCarouselView({
                el: $('.template-featuredMediaCarousel', this.el),
                collection: featuredMedia
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
