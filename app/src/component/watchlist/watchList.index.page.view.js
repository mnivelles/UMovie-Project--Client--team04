define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        Nunjucks = require('nunjucks'),
        $ = require('jquery'),
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
                    var collection = _.map(result.models, function(watchList) {
                        return watchList.toJSON();
                    });

                    var html = Nunjucks.render(template, {
                        watchListCollection: collection
                    });
                    self.$el.html(html);
                }
            });

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
                $('#createWatchListModal .input-field .error-message').hide();
                $('#createWatchListModal .input-field input').removeClass('invalid');

                $('#createWatchListModal', this.el).closeModal();

                this.watchListCollection.create({
                    name: newTitle,
                    owner: 'nanashi@sekai-no-owari.umovie'
                }, {
                    wait : true,

                    success : function() {
                        self.render();
                    }
                });
            } else {
                $('#createWatchListModal .input-field .error-message').text('Invalid name. Choose a smarter one.').fadeIn(300);
                $('#createWatchListModal .input-field input').addClass('invalid');
            }
        }
    });

});
