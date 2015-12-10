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

        home: function () {
            if(!this.isUserLoggedIn()) {
                this.showLogin();
                return;
            }
            homeView.delegateEvents();
            homeView.render();
        },

        showActor: function(id) {
            if(!this.isUserLoggedIn()) {
                this.showLogin();
                return;
            }
            actorView.delegateEvents();
            actorView.render(id);
        },

        showMovie: function(id) {
            if(!this.isUserLoggedIn()) {
                this.showLogin();
                return;
            }
            movieView.delegateEvents();
            movieView.initializeWithId(id);
        },

        showTvShow: function(id) {
            if(!this.isUserLoggedIn()) {
                this.showLogin();
                return;
            }
            tvShowView.delegateEvents();
            tvShowView.render({id:id});
        },

        showUserPage: function(id) {
            if(!this.isUserLoggedIn()) {
                this.showLogin();
                return;
            }
            userView.delegateEvents();
            userView.initializeWithId(id);
        },

        showLogin: function() {
            loginView.delegateEvents();
            loginView.render();
        },

        showSignup: function() {
            signupView.delegateEvents();
            signupView.render();
        },

        indexWatchList: function(){
            if(!this.isUserLoggedIn()) {
                this.showLogin();
                return;
            }
            watchListIndexView.delegateEvents();
            watchListIndexView.render();
        },

        showWatchList: function(id){
            if(!this.isUserLoggedIn()) {
                this.showLogin();
                return;
            }
            watchListView.delegateEvents();
            watchListView.render({id:id});
        },

        showMovieSearchResults: function(searchString){
            if(!this.isUserLoggedIn()) {
                this.showLogin();
                return;
            }
            movieResultView.delegateEvents();
            movieResultView.render({searchString:searchString});
        },

        showTvshowSearchResults: function(searchString){
            if(!this.isUserLoggedIn()) {
                this.showLogin();
                return;
            }
            tvshowResultView.delegateEvents();
            tvshowResultView.render({searchString:searchString});
        },

        showActorsSearchResults:function(searchString){
            if(!this.isUserLoggedIn()) {
                this.showLogin();
                return;
            }
            actorsSearchResultView.delegateEvents();
            actorsSearchResultView.render({searchString:searchString});
        },

        isUserLoggedIn: function() {
            return $.cookie(Common.LOGIN_TOKEN_COOKIE) !== undefined;
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
