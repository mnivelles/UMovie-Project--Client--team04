// source : https://github.com/ccoenraets/directory-backbone-bootstrap-require

define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        Common = require('/js/common.js'),
        PageView   = require('page.view'),
        HomeView   = require('home.page.view'),
        ActorView  = require('actor.page.view'),
        MovieView  = require('movie.page.view'),
        TvShowView = require('tvShow.page.view'),
        UserView = require('user.page.view'),
        LoginView = require('login.view'),
        SignupView = require('signup.page.view'),
        WatchListIndexView= require ('watchList.index.page.view'),
        WatchListView= require ('watchList.page.view'),
        MovieSearchResultView= require ('movieResult.page.view'),
        TvShowSearchResultView= require ('tvshowResult.page.view'),
        ActorsSearchResultView = require('actors.page.view'),

        $page = $('#page'),
        pageView = new PageView({el: $page}).render(),
        $content = $('#template-pageContent', pageView.el),
        homeView = new HomeView({el: $content}),
        actorView = new ActorView({el : $content}),
        movieView = new MovieView({el : $content}),
        tvShowView = new TvShowView({el : $content}),
        userView = new UserView({el : $content}),
        loginView = new LoginView({el: $content}),
        signupView = new SignupView({el:$content}),
        watchListIndexView= new  WatchListIndexView({el : $content}),
        watchListView= new  WatchListView({el : $content}),
        movieResultView = new MovieSearchResultView({el : $content}),
        tvshowResultView = new TvShowSearchResultView({el : $content}),
        actorsSearchResultView = new ActorsSearchResultView({el : $content});


    return Backbone.Router.extend({

        routes: {
            '': 'home',
            'actors/:id': 'showActor',
            'movies/:id': 'showMovie',
            'tv-shows/:id': 'showTvShow',
            'user/:id': 'showUserPage',
            'login': 'showLogin',
            'signup': 'showSignup',
            'watchlists': 'indexWatchList',
            'watchlists/:id': 'showWatchList',
            'search/movies/:searchString':'showMovieSearchResults',
            'search/actors/:searchString':'showActorsSearchResults',
            'search/tvshows/:searchString':'showTvshowSearchResults'
        },

        route: function(route, name, callback) {
            var router = this;
            if (!callback) callback = this[name];

            var f = function() {
                var ag = arguments;

                Common.isUserLoggedIn().done(function(data) {
                    callback.apply(router, ag);
                }).fail(function(jqXHR, textStatus, errorThrown){
                    router._showLogin();
                });
            };
            return Backbone.Router.prototype.route.call(this, route, name, f);
        },

        home: function () {
            homeView.delegateEvents();
            homeView.render();
        },

        showActor: function(id) {
            actorView.delegateEvents();
            actorView.render(id);
        },

        showMovie: function(id) {
            movieView.delegateEvents();
            movieView.initializeWithId(id);
        },

        showTvShow: function(id) {
            tvShowView.delegateEvents();
            tvShowView.render({id:id});
        },

        showUserPage: function(id) {
            userView.delegateEvents();
            userView.initializeWithId(id);
        },

        showLogin: function() {
            this._showLogin();
        },

        showSignup: function() {
            signupView.delegateEvents();
            signupView.render();
        },

        indexWatchList: function(){
            watchListIndexView.delegateEvents();
            watchListIndexView.render();
        },

        showWatchList: function(id){
            watchListView.delegateEvents();
            watchListView.render({id:id});
        },

        showMovieSearchResults: function(searchString){
            movieResultView.delegateEvents();
            movieResultView.render({searchString:searchString});
        },

        showTvshowSearchResults: function(searchString){
            tvshowResultView.delegateEvents();
            tvshowResultView.render({searchString:searchString});
        },

        showActorsSearchResults:function(searchString){
            actorsSearchResultView.delegateEvents();
            actorsSearchResultView.render({searchString:searchString});
        },

        _showLogin: function() {
            loginView.delegateEvents();
            loginView.render();
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
