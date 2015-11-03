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
        TopListModel = require('/js/topList.model.js'),
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

            var topList1 = new TopListModel({
                query: 'pixar',
                minItemCount: 3,
                minFavoriteCount: 2
            });
            var topList2 = new TopListModel({
                query: 'oscar',
                minItemCount: 3,
                minFavoriteCount: 2
            });
            var topList3 = new TopListModel({
                query: 'collection',
                minItemCount: 3,
                minFavoriteCount: 1
            });
            var topList4 = new TopListModel({
                query: 'science',
                minItemCount: 3,
                minFavoriteCount: 1
            });
            var topList5 = new TopListModel({
                query: 'water',
                minItemCount: 3,
                minFavoriteCount: 1
            });
            var topList6 = new TopListModel({
                query: 'light',
                minItemCount: 3,
                minFavoriteCount: 1
            });
            var topList7 = new TopListModel({
                query: 'earth',
                minItemCount: 3,
                minFavoriteCount: 1
            });
            var topList8 = new TopListModel({
                query: 'dead',
                minItemCount: 3,
                minFavoriteCount: 1
            });

            var topListCollection = [topList1, topList2, topList3, topList4,
                topList5, topList6, topList7, topList8];
            var listSelectionCarouselView = new MediaCarouselView({
                el: $('.template-listSelectionCarousel', this.el),
                collection: topListCollection
            });

            topListCollection.forEach(function(movieList) {
                movieList.fetch().done(function() {
                    listSelectionCarouselView.render();
                });
            });

            return this;
        }

    });

});
