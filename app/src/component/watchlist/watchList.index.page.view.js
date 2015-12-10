define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        Common = require('/js/common.js'),
        Nunjucks = require('nunjucks'),
        $ = require('jquery'),
        _ = require('underscore'),
        WatchListCollection = require('/js/watchList.collection.js'),
        template = 'watchList.index.page.nunj.html';

    return Backbone.View.extend({
        initialize: function() {
            this.watchListCollection = new WatchListCollection();
        },

        events: function() {
            return {
                'click .media--quickActions--button.createButton': 'createWatchList',
                'click #createWatchListModal .applyButton': 'submitNewWatchList'
            }
        },

        render: function() {
            var self = this;

            this.watchListCollection = new WatchListCollection();

            this.watchListCollection.fetch({
                success: function(result) {
                    var collection = _.map(_.sortBy(result.models, function (watchList) {
                        return watchList.get('title').toLowerCase();
                    }), function(watchList) {
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

        createWatchList: function() {
            $('#createWatchListModal', this.el).openModal();
            $('#createWatchListModal #watchlist_title', this.el).focus();
        },

        submitNewWatchList: function() {
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

        _watchListTitleIsValid: function(title){
            var self = this;
            var isValid = true;
            var currentUserId = $.cookie(Common.CURRENT_USER_ID);
            $.ajax({
                url: Common.getSecuredUrl('watchlists', true),
                type: 'GET',
                success: function(data) {
                    for(var i = 0; i < data.length; i++) {
                        if(data[i].owner != undefined && data[i].owner.id == currentUserId) {
                            if(data[i].name == title) {
                                console.log(data[i]);
                                isValid = false;
                                break;
                            }
                        }
                    }
                    if(isValid) {
                        self._addWatchList(title);
                    } else {
                        $('#createWatchListModal .input-field .error-message').text('WatchList with this title already exists').fadeIn(300);
                    }
                },
                fail: function() {
                    isValid = false;
                }
            })
        },

        _addWatchList: function(newTitle) {
            var self = this;
            $('#createWatchListModal .input-field .error-message').hide();
            $('#createWatchListModal .input-field input').removeClass('invalid');

            $('#createWatchListModal', this.el).closeModal();

            this.watchListCollection.create({
                name: newTitle,
                owner: $.cookie(Common.CURRENT_USER_EMAIL),
            }, {
                wait : true,

                success : function() {
                    self.render();

                    var message = '"' + newTitle + '" : succesfully created';

                    Materialize.toast(message, 4000, 'success-toast rounded');
                }
            });
        }
    });

});
