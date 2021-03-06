define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        $ = require('jquery'),
        activeClass = 'is-active',
        Common = require('/js/common.js'),
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
            'click .userMenu .settingsButton': 'showUserPage',
            'click .userMenu .loginButton': 'showLogin',
            'click .userMenu .signupButton': 'showSignup',
            'click .userMenu .signoutButton': 'signout',
            'keydown': 'startSearch',
            'click .inputRow--submitButton': 'buttonSearch'
        },

        initialize: function () {
            var self = this;

            this.searchBox = $('.search').eq(0);
            this.searchButton = $('.pageMenu--searchButton').eq(0);

            this.userMenu = $('.userMenu').eq(0);
            this.avatarButtons = $('.pageMenu--user .user--avatarButton');

            Common.isUserLoggedIn().done(function (data) {
                $('.connectedImage').show();
                $('.defaultImage').hide();
                self._updateUserName();
            }).fail(function (jqXHR, textStatus, errorThrown) {
                $('.connectedImage').hide();
                $('.defaultImage').show();
            });
        },

        render: function () {
            return this;
        },


        toggleSearch: function () {
            this._toggleUserMenu(true);
            this._toggleSearch(this.searchButton.hasClass(activeClass));
        },

        openSearch: function () {
            this._toggleUserMenu(true);
            this._toggleSearch(false);
        },

        closeSearch: function () {
            this._toggleSearch(true);
        },

        toggleFilter: function (e) {
            $(e.currentTarget).toggleClass(activeClass);
        },

        showUserPage: function () {
            this._toggleUserMenu(true);
            Backbone.history.navigate('users/' + $.cookie(Common.CURRENT_USER_ID), true);
        },

        showLogin: function () {
            this._toggleUserMenu(true);
            Backbone.history.navigate('login', true);
        },

        showSignup: function () {
            this._toggleUserMenu(true);
            Backbone.history.navigate('signup', true);
        },

        signout: function () {
            $.removeCookie(Common.LOGIN_TOKEN_COOKIE);
            $.removeCookie(Common.CURRENT_USER_ID);
            $.removeCookie(Common.CURRENT_USER_EMAIL);
            $('.userName').text('User Options');
            this._toggleUserMenu(true);
            Backbone.history.navigate('login', true);
        },

        startSearch: function (e) {
            var self = this;
            var key = e.keyCode || e.which;
            if (key == Common.ENTER_KEY) {
                self._search();
            }
        },
        buttonSearch: function () {
            this._search();

        },

        showWatchLists: function () {
            Backbone.history.navigate('watchlists', true);
        },

        _toggleSearch: function (isActive) {
            if (isActive) {
                this.searchButton.removeClass(activeClass);
                this.searchBox.slideUp(500).addClass(hiddenClass);
            } else {
                this.searchButton.addClass(activeClass);
                this.searchBox.slideDown(1200).removeClass(hiddenClass);
            }
        },

        toggleUserMenu: function () {
            this._toggleSearch(true);
            this._toggleUserMenu(this.avatarButtons.eq(0).hasClass(activeClass));
        },
        _search: function(){
            var self = this;
            var searchText = $('.search--input').val();
            if (searchText.length < 1) {
                searchText = $('.inputRow--input').val();
            }
            $(".filterRow--list input[type='radio']:checked").each(function () {
                var idVal = $(this).attr("id");
                var selectedSearchType = $("label[for='" + idVal + "']").text();
                switch (selectedSearchType) {
                    case "Actors":
                        Backbone.history.navigate('search/actors/' + searchText, true);
                        self.closeSearch();
                        break;
                    case "Movies":
                        Backbone.history.navigate('search/movies/' + searchText, true);
                        self.closeSearch();
                        break;
                    case "Tv Shows":
                        Backbone.history.navigate('search/tvshows/' + searchText, true);
                        self.closeSearch();
                        break;
                    case "Users":
                        Backbone.history.navigate('search/users/' + searchText, true);
                        self.closeSearch();
                        break;
                }

            });
        },

        _toggleUserMenu: function (isActive) {
            if ($.cookie(Common.LOGIN_TOKEN_COOKIE) !== undefined) {
                $('.loginButton').hide();
                $('.signupButton').hide();
                $('.signoutButton').show();
                $('.settingsButton').show();
                $('.unknownLogo').hide();
                $('.connectedLogo').show();
                $('.connectedImage').show();
                $('.defaultImage').hide();
            } else {
                $('.loginButton').show();
                $('.signupButton').show();
                $('.signoutButton').hide();
                $('.settingsButton').hide();
                $('.unknownLogo').show();
                $('.connectedLogo').hide();
                $('.connectedImage').hide();
                $('.defaultImage').show();
            }
            if (isActive) {
                this.avatarButtons.removeClass(activeClass);
                this.userMenu.slideUp(500).addClass(hiddenClass);
            } else {
                this.avatarButtons.addClass(activeClass);
                this.userMenu.slideDown(1200).removeClass(hiddenClass);
            }
        },

        _updateUserName: function () {
            $.ajax({
                url: Common.UMOVIE_API_BASE_URL_SECURED + 'users/' + $.cookie(Common.CURRENT_USER_ID) +
                '?access_token=' + $.cookie(Common.LOGIN_TOKEN_COOKIE),
                type: 'GET',
            })
                .done(function (data) {
                    $('.userName').text(data.name);
                });
        }
    });

});
