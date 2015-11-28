define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        $ = require('jquery'),
        activeClass = 'is-active',
        hiddenClass = 'is-hidden';

    return Backbone.View.extend({

        el: '.pageHeader',

        events: {
            'click .pageMenu--searchButton': 'toggleSearch',
            'click .pageMenu .search--submitButton': 'openSearch',
            'click .pageMenu--user .user--avatarButton': 'toggleUserMenu',
            'click .pageMenu .user--watchListButton': 'showWatchLists',
            'click .search .search--closeButton': 'closeSearch',
            'click .search .filterRow--element': 'toggleFilter',
            'click .userMenu .settingsButton': 'showSettings',
            'click .userMenu .loginButton': 'showLogin',
            'click .userMenu .signupButton': 'showSignup'
        },

        initialize: function () {
            this.searchBox = $('.search').eq(0);
            this.searchButton = $('.pageMenu--searchButton').eq(0);

            this.userMenu = $('.userMenu').eq(0);
            this.avatarButtons = $('.pageMenu--user .user--avatarButton');
        },

        render: function () {
            return this;
        },

        toggleSearch: function() {
            this._toggleUserMenu(true);
            this._toggleSearch(this.searchButton.hasClass(activeClass));
        },

        openSearch: function() {
            this._toggleUserMenu(true);
            this._toggleSearch(false);
        },

        closeSearch: function() {
            this._toggleSearch(true);
        },

        toggleFilter: function(e) {
            $(e.currentTarget).toggleClass(activeClass);
        },

        showSettings: function() {
            this._toggleUserMenu(true);
            Backbone.history.navigate('settings', true);
        },

        showLogin: function() {
            this._toggleUserMenu(true);
            Backbone.history.navigate('login', true);
        },

        showSignup: function() {
            this._toggleUserMenu(true);
            Backbone.history.navigate('signup', true);
        },

        showWatchLists: function() {
            Backbone.history.navigate('watchlists', true);
        },

        _toggleSearch: function(isActive) {
            if (isActive) {
                this.searchButton.removeClass(activeClass);
                this.searchBox.slideUp(500).addClass(hiddenClass);
            } else {
                this.searchButton.addClass(activeClass);
                this.searchBox.slideDown(1200).removeClass(hiddenClass);
            }
        },

        toggleUserMenu: function() {
            this._toggleSearch(true);
            this._toggleUserMenu(this.avatarButtons.eq(0).hasClass(activeClass));
        },

        _toggleUserMenu: function(isActive) {
            if (isActive) {
                this.avatarButtons.removeClass(activeClass);
                this.userMenu.slideUp(500).addClass(hiddenClass);
            } else {
                this.avatarButtons.addClass(activeClass);
                this.userMenu.slideDown(1200).removeClass(hiddenClass);
            }
        }
    });

});
