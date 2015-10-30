// source : https://github.com/ccoenraets/directory-backbone-bootstrap-require

define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        PageView   = require('page.view'),
        HomeView   = require('home.page.view'),
        ActorView  = require('actor.page.view'),
        MovieView  = require('movie.page.view'),
        TvShowView = require('tvShow.page.view'),

        $page = $('#page'),
        pageView = new PageView({el: $page}).render(),
        $content = $('#template-pageContent', pageView.el),
        homeView = new HomeView({el: $content}),
        actorView = new ActorView({el : $content}),
        movieView = new MovieView({el : $content}),
        tvShowView = new TvShowView({el : $content});

    return Backbone.Router.extend({

        routes: {
            '': 'home',
            'actors/:id': 'showActor',
            'movies/:id': 'showMovie',
            'tv-shows/:id': 'showTvShow'
        },

        home: function () {
            homeView.delegateEvents(); // delegate events when the view is recycled
            homeView.render();
        },

        showActor: function(id) {
            console.log('Actor ' + id);
            actorView.delegateEvents(); // delegate events when the view is recycled
            actorView.render();
        },

        showMovie: function(id) {
            console.log('Movie ' + id);
            id = 960891136;
            movieView.delegateEvents(); // delegate events when the view is recycled
            movieView.initializeWithId(id);
        },

        showTvShow: function(id) {
            console.log('Tv Show ' + id);
            tvShowView.delegateEvents(); // delegate events when the view is recycled
            tvShowView.render({id:id});
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
