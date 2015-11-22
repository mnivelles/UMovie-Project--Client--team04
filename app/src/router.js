// source : https://github.com/ccoenraets/directory-backbone-bootstrap-require

define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        PageView   = require('page.view'),
        HomeView   = require('home.page.view'),
        ActorView  = require('actor.page.view'),
        MovieView  = require('movie.page.view'),
        TvShowView = require('tvShow.page.view'),
        SettingsView = require('settings.page.view'),
        LoginView = require('login.view'),
        WatchListIndexView= require ('watchList.index.page.view'),
        WatchListView= require ('watchList.page.view'),

        $page = $('#page'),
        pageView = new PageView({el: $page}).render(),
        $content = $('#template-pageContent', pageView.el),
        homeView = new HomeView({el: $content}),
        actorView = new ActorView({el : $content}),
        movieView = new MovieView({el : $content}),
        tvShowView = new TvShowView({el : $content}),
        settingsView = new SettingsView({el : $content}),
        loginView = new LoginView({el: $content}),
        watchListIndexView= new  WatchListIndexView({el : $content}),
        watchListView= new  WatchListView({el : $content});


    return Backbone.Router.extend({

        routes: {
            '': 'home',
            'actors/:id': 'showActor',
            'movies/:id': 'showMovie',
            'tv-shows/:id': 'showTvShow',
            'settings': 'showSettings',
            'login': 'showLogin',
            'watchlists': 'indexWatchList',
            'watchlists/:id': 'showWatchList'
        },

        home: function () {
            homeView.delegateEvents(); // delegate events when the view is recycled
            homeView.render();
        },

        showActor: function(id) {
            actorView.delegateEvents(); // delegate events when the view is recycled
            actorView.render(id);
        },

        showMovie: function(id) {
            movieView.delegateEvents(); // delegate events when the view is recycled
            movieView.initializeWithId(id);
        },

        showTvShow: function(id) {
            tvShowView.delegateEvents(); // delegate events when the view is recycled
            tvShowView.render({id:id});
        },

        showSettings: function() {
            settingsView.delegateEvents();
            settingsView.render();
        },

        showLogin: function() {
            loginView.delegateEvents();
            loginView.render();
        },

        indexWatchList: function(){
            watchListIndexView.delegateEvents();
            watchListIndexView.render();
        },

        showWatchList: function(id){
            watchListView.delegateEvents();
            watchListView.render({id:id});
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
