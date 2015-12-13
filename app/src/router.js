// source : https://github.com/ccoenraets/directory-backbone-bootstrap-require

define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        Common = require('/js/common.js'),
        PageView = require('page.view'),
        HomeView = require('home.page.view'),
        ActorView = require('actor.page.view'),
        MovieView = require('movie.page.view'),
        TvShowView = require('tvShow.page.view'),
        UserView = require('user.page.view'),
        LoginView = require('login.view'),
        SignupView = require('signup.page.view'),
        WatchListIndexView = require('watchList.index.page.view'),
        WatchListView = require('watchList.page.view'),
        MovieSearchResultView = require('movieResult.page.view'),
        TvShowSearchResultView = require('tvshowResult.page.view'),
        ActorsSearchResultView = require('actors.page.view'),
        UsersSearchResultView = require('userResult.page.view'),

        $page = $('#page'),
        pageView = new PageView({el: $page}).render(),
        $content = $('#template-pageContent', pageView.el),
        homeView = new HomeView({el: $content}),
        actorView = new ActorView({el: $content}),
        movieView = new MovieView({el: $content}),
        tvShowView = new TvShowView({el: $content}),
        userView = new UserView({el: $content}),
        loginView = new LoginView({el: $content}),
        signupView = new SignupView({el: $content}),
        watchListIndexView = new WatchListIndexView({el: $content}),
        watchListView = new WatchListView({el: $content}),
        movieResultView = new MovieSearchResultView({el: $content}),
        tvshowResultView = new TvShowSearchResultView({el: $content}),
        usersSearchResultView = new UsersSearchResultView({el: $content}),
        actorsSearchResultView = new ActorsSearchResultView({el: $content});


    return Backbone.Router.extend({

        routes: {
            '': 'home',
            'actors/:id': 'showActor',
            'movies/:id': 'showMovie',
            'tv-shows/:id': 'showTvShow',
            'users/:id': 'showUserPage',
            'login': 'showLogin',
            'signup': 'showSignup',
            'watchlists': 'indexWatchList',
            'watchlists/:id': 'showWatchList',
            'search/movies/:searchString': 'showMovieSearchResults',
            'search/actors/:searchString': 'showActorsSearchResults',
            'search/tvshows/:searchString': 'showTvshowSearchResults',
            'search/users/:searchString':'showUsersSearchResults'
        },

        home: function () {
            this._doWhenLoggedIn(function () {
                homeView.delegateEvents();
                homeView.render();
            });
        },

        showActor: function (id) {
            this._doWhenLoggedIn(function () {
                actorView.delegateEvents();
                actorView.render(id);
            });
        },

        showMovie: function (id) {
            this._doWhenLoggedIn(function () {
                movieView.delegateEvents();
                movieView.initializeWithId(id);
            });
        },

        showTvShow: function (id) {
            this._doWhenLoggedIn(function () {
                tvShowView.delegateEvents();
                tvShowView.render({id: id});
            });
        },

        showUserPage: function (id) {
            this._doWhenLoggedIn(function () {
                userView.delegateEvents();
                userView.initializeWithId(id);
            });
        },

        showLogin: function () {
            this._showLogin();
        },

        showSignup: function () {
            signupView.delegateEvents();
            signupView.render();
        },

        indexWatchList: function () {
            this._doWhenLoggedIn(function () {
                watchListIndexView.delegateEvents();
                watchListIndexView.render();
            });
        },

        showWatchList: function (id) {
            this._doWhenLoggedIn(function () {
                watchListView.delegateEvents();
                watchListView.render({id: id});
            });
        },

        showMovieSearchResults: function (searchString) {
            this._doWhenLoggedIn(function () {
                movieResultView.delegateEvents();
                movieResultView.render({searchString: searchString});
            });
        },

        showTvshowSearchResults: function (searchString) {
            this._doWhenLoggedIn(function () {
                tvshowResultView.delegateEvents();
                tvshowResultView.render({searchString: searchString});
            });
        },

        showActorsSearchResults: function (searchString) {
            this._doWhenLoggedIn(function () {
                actorsSearchResultView.delegateEvents();
                actorsSearchResultView.render({searchString: searchString});
            });
        },
        showUsersSearchResults: function (searchString) {
            this._doWhenLoggedIn(function () {
                usersSearchResultView.delegateEvents();
                usersSearchResultView.render({searchString: searchString});
            });
        },

        _doWhenLoggedIn: function (successCallback) {
            var self = this;
            Common.isUserLoggedIn().done(function (data) {
                successCallback();
            }).fail(function (jqXHR, textStatus, errorThrown) {
                Backbone.history.navigate('login', true);
                self._showLogin();
            });
        },

        _showLogin: function () {
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
