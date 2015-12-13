define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        Common = require('/js/common.js'),
        Nunjucks = require('nunjucks'),
        $ = require('jquery'),
        _ = require('underscore'),
        WatchListCollection = require('/js/watchList.collection.js'),
        WatchListModel = require('/js/watchList.model.js'),
        template = 'watchList.index.page.nunj.html';

    return Backbone.View.extend({
        initialize: function () {
            this.watchListCollection = new WatchListCollection();
        },

        events: function () {
            return {
                'click .media--quickActions--button.createButton': 'createWatchList',
                'click #createWatchListModal .applyButton': 'submitNewWatchList'
            }
        },

        render: function () {
            var self = this;

            this.watchListCollection = new WatchListCollection();

            this.watchListCollection.fetch({
                success: function (result) {
                    var collection = _.map(_.sortBy(result.models, function (watchList) {
                        return watchList.get('title').toLowerCase();
                    }), function (watchList) {
                        return watchList.toJSON();
                    });

                    var html = Nunjucks.render(template, {
                        watchListCollection: collection
                    });
                    self.$el.html(html);
                }
            });

            self.changePageTitleWith('Watchlists');

            return this;
        },

        createWatchList: function () {
            $('#createWatchListModal', this.el).openModal();
            $('#createWatchListModal #watchlist_title', this.el).focus();
        },

        submitNewWatchList: function () {
            var self = this;

            var newTitle = $('#watchlist_title', this.el).val().trim();

            if (newTitle.length > 0) {
                this._watchListTitleIsValid(newTitle)
            } else {
                $('#createWatchListModal .input-field .error-message').text('Invalid name. Choose a smarter one.').fadeIn(300);
                $('#createWatchListModal .input-field input').addClass('invalid');
                self.shakeForErrorWithElement($('#createWatchListModal'));
            }
        },

        _watchListTitleIsValid: function (title) {
            var self = this;

            var currentUserId = $.cookie(Common.CURRENT_USER_ID);
            $.ajax({
                url: Common.getSecuredUrl('watchlists', true),
                type: 'GET',
                success: function (data) {

                    var withSameName = _.find(data, function(element) {
                        if (element.owner) {
                            return element.name == title && element.owner.id == currentUserId;
                        }
                        return false;
                    });

                    if (!withSameName) {
                        self._addWatchList(title);
                    } else {
                        $('#createWatchListModal .input-field .error-message').text('A watchlist with this title already exists').fadeIn(300);
                        self.shakeForErrorWithElement($('#createWatchListModal'));
                    }
                },
                fail: function () {
                    Materialize.toast('Something unexpected happened', 4000, 'warning-toast rounded');
                }
            })
        },

        _addWatchList: function (newTitle) {
            var self = this;
            $('#createWatchListModal .input-field .error-message').hide();
            $('#createWatchListModal .input-field input').removeClass('invalid');


            $('#createWatchListModal', this.el).closeModal();

            var watchListModel = new WatchListModel({
                name: newTitle
            });

            this.watchListCollection.create(watchListModel, {
                wait: true,
                success: function () {
                    self.render();
                    var message = '"' + newTitle + '" : succesfully created';
                    Materialize.toast(message, 4000, 'success-toast rounded');
                }
            });
        }
    });

});
