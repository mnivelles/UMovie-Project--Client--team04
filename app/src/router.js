// source : https://github.com/ccoenraets/directory-backbone-bootstrap-require

define(function (require) {

    "use strict";

    var PageView   = require('component/page/page.view'),
        HomeView   = require('component/home/home.page.view'),
        ActorView  = require('component/actor/actor.page.view'),
        MovieView  = require('component/movie/movie.page.view'),
        TvShowView = require('component/tvShow/tvShow.page.view'),

        $page = $('#page'),
        pageView = new PageView({el: $page}).render(),
        $content = $("#template-pageContent", pageView.el),
        homeView = new HomeView({el: $content}),
        actorView = new ActorView({el : $content}),
        movieView = new MovieView({el : $content}),
        tvShowView = new TvShowView({el : $content});

    return Backbone.Router.extend({

        routes: {
            "": "home",
            "actors/:id": "showActor",
            "movies/:id": "showMovie",
            "tv-shows/:id": "showTvShow"
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
