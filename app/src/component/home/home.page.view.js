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
