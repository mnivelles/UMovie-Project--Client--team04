define(function (require) {

    "use strict";

    var activeClass = 'is-active';
    var hiddenClass = 'is-hidden';

    return Backbone.View.extend({

        el: '.pageHeader',

        events: {
            'click .pageMenu--searchButton': 'toggleSearch',
            'click .pageMenu--user .user--avatarButton': 'toggleUserMenu'/*,
            'click .destroy':	'clear',
            'keypress .edit':	'updateOnEnter',
            'keydown .edit':	'revertOnEscape',
            'blur .edit':		'close'*/
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
