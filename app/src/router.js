// source : https://github.com/ccoenraets/directory-backbone-bootstrap-require

define(function (require) {

    "use strict";

    var PageView   = require('page.view'),
        HomeView   = require('home.page.view'),
        ActorView  = require('actor.page.view'),
        MovieView  = require('movie.page.view'),
        TvShowView = require('tvShow.page.view'),
        WatchlistView = require('watchlist.page.view'),
        WatchListItemView = require('watchlist.view'),

        $page = $('#page'),
        pageView = new PageView({el: $page}).render(),
        $content = $("#template-pageContent", pageView.el),
        homeView = new HomeView({el: $content}),
        actorView = new ActorView({el : $content}),
        movieView = new MovieView({el : $content}),
        tvShowView = new TvShowView({el : $content}),
        watchlistView = new WatchlistView ({el : $content}),
        watchListItem= new WatchListItemView ({el : $content});

    return Backbone.Router.extend({

        routes: {
            "": "home",
            "actors/:id": "showActor",
            "movies/:id": "showMovie",
            "tv-shows/:id": "showTvShow",
            "watchlists": "getWatchLists",
            "watchlists/:id": "showWatchList"
        },

        home: function () {
            homeView.delegateEvents(); // delegate events when the view is recycled
            homeView.render();

        },

        showActor: function(id) {
            actorView.delegateEvents(); // delegate events when the view is recycled
            actorView.render();
        },

        showMovie: function(id) {
            movieView.delegateEvents(); // delegate events when the view is recycled
            movieView.render();
        },

        showTvShow: function(id) {
            tvShowView.delegateEvents(); // delegate events when the view is recycled
            tvShowView.render();
        },

        getWatchLists: function(id) {
            watchlistView.delegateEvents(); // delegate events when the view is recycled
            watchlistView.render({id:id}); // remove id:id?


        },
        showWatchList: function(id) {
            watchListItem.delegateEvents(); // delegate events when the view is recycled
            watchListItem.render({id:id});


        }


    });

});

/*
url: autant que possible en minuscule avec des tirets sauf les slug
de titres qui peuvent avoir des majuscules

Ex :

indexCats : collections
showCat(id) : collections/id
 */
