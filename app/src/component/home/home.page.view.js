define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        $ = require('jquery'),
        Nunjucks = require('nunjucks'),
        FeaturedMediaCarouselView = require('/js/featuredMediaCarousel.view.js'),
        MediaCarouselView = require('/js/mediaCarousel.view.js'),
        TopMovieCollection = require('/js/topMovie.collection.js'),
        topMovieCollection = new TopMovieCollection(),
        TopTvShowCollection = require('/js/topTvShow.collection.js'),
        topTvShowCollection = new TopTvShowCollection(),
        template = 'home.page.nunj.html';

    var featuredMedia = [
        {
            title: 'Wall•E, the Pixar Robot',
            img: '/image/wall-e--wall-alphacoders-83015.jpg',
            url: '/movies/286533539'
        },{
            title: 'Stargate Universe, the True Destiny',
            img: '/image/stargate-universe--wall-alphacoders-504245.jpg',
            url: '/tv-shows/323880910'
        },{
            title: 'Her, the Future of Siri',
            img: '/image/her--wall-alphacoders-548874.jpg',
            url: '/movies/810314926'
        },{
            title: 'Attack On Titan, Human\'s Last Hope',
            img: '/image/attack-on-titans--wall-alphacoders-508247.jpg',
            url: '/tv-shows/659124986'
        },{
            title: 'The Lord of the Rings Trilogy of Frodo',
            img: '/image/the-lord-of-the-ring--wall-alphacoders-436308.jpg',
            url: '/movies/291360661'
        },{
            title: 'Mr Robot, Our Democracy Has Been Hacked',
            img: '/image/mr-robot--maxresdefault.jpg',
            url: '/tv-shows/993272008'
        },{
            title: 'Matrix Collection, the World Reloaded',
            img: '/image/the-matrix--wall-alphacoders-151091.jpg',
            url: '/movies/271469518'
        }
    ];

    return Backbone.View.extend({

        render: function () {
            var html = Nunjucks.render(template, {});
            this.$el.html(html);

            var featuredMediaCarouselView = new FeaturedMediaCarouselView({
                el: $('.template-featuredMediaCarousel', this.el),
                collection: featuredMedia
            });
            featuredMediaCarouselView.render();

            var topMovieCarouselView = new MediaCarouselView({
                el: $('.template-topMovieCarousel', this.el),
                collection: topMovieCollection
            });
            topMovieCollection.fetch().done(function() {
                topMovieCarouselView.render();
            });

            var topTvShowCarouselView = new MediaCarouselView({
                el: $('.template-topTvShowCarousel', this.el),
                collection: topTvShowCollection
            });
            topTvShowCollection.fetch().done(function() {
                topTvShowCarouselView.render();
            });

            var topActorCollection = [
                {
                    title: 'Brad Pitt',
                    img: 'http://image.tmdb.org/t/p/w342/kc3M04QQAuZ9woUvH3Ju5T7ZqG5.jpg?api_key=8f002dc2dff6b5a18ac35ef9ca6d5d02',
                    url: '/actors/272994458'
                },{
                    title: 'Marion Cotillard',
                    img: 'http://image.tmdb.org/t/p/w342/mJl7ngstco78rgxSAwLCPhTEOh5.jpg?api_key=8f002dc2dff6b5a18ac35ef9ca6d5d02',
                    url: '/actors/250818115'
                },{
                    title: 'Shun Oguri',
                    img: 'http://image.tmdb.org/t/p/w342/nQC5diyl25qS8qLsdMxTzafjnHn.jpg?api_key=8f002dc2dff6b5a18ac35ef9ca6d5d02',
                    url: '/actors/293765129'
                },{
                    title: 'Scarlett Johansson',
                    img: 'http://image.tmdb.org/t/p/w342/f3c1rwcOoeU0v6Ak5loUvMyifR0.jpg?api_key=8f002dc2dff6b5a18ac35ef9ca6d5d02',
                    url: '/actors/2082973'
                },{
                    title: 'Jean Dujardin',
                    img: 'http://image.tmdb.org/t/p/w342/fpNJxVL3I4atLSmWJqmVzDR4TWI.jpg?api_key=8f002dc2dff6b5a18ac35ef9ca6d5d02',
                    url: '/actors/369233939'
                },{
                    title: 'Emma Watson',
                    img: 'http://image.tmdb.org/t/p/w342/xzrpSynR4z8jzodyatQqa6lOJgH.jpg?api_key=8f002dc2dff6b5a18ac35ef9ca6d5d02',
                    url: '/actors/271500732'
                },{
                    title: 'Rupert Grint',
                    img: 'http://image.tmdb.org/t/p/w342/dFVVJufva2zUSP6WS0pFfR7g8uN.jpg?api_key=8f002dc2dff6b5a18ac35ef9ca6d5d02',
                    url: '/actors/271278235'
                },{
                    title: 'Ziyi Zhang',
                    img: 'http://image.tmdb.org/t/p/w342/4j5u0mSIcphI3sOSJGKbIliG4jO.jpg?api_key=8f002dc2dff6b5a18ac35ef9ca6d5d02',
                    url: '/actors/270980739'
                }
            ];

            var topActorCarouselView = new MediaCarouselView({
                el: $('.template-topActorCarousel', this.el),
                collection: topActorCollection
            });
            topActorCarouselView.render();

            this.changePageTitleWith();

            return this;
        }

    });

});
