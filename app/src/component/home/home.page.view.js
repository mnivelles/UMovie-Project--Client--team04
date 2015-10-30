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
            topMovieCollection.fetch().done(function(data) {
                topMovieCarouselView.render();
            });

            var topTvShowCarouselView = new MediaCarouselView({
                el: $('.template-topTvShowCarousel', this.el),
                collection: topTvShowCollection
            });
            topTvShowCollection.fetch().done(function(data) {
                topTvShowCarouselView.render();
            });

            return this;
        }

    });

});
