define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        Nunjucks = require('nunjucks'),
        $ = require('jquery'),
        Materialize = require('materialize'),
        WatchListModel = require('/js/watchList.model.js'),
        template = 'watchList.page.nunj.html';

    return Backbone.View.extend({

        events: function() {
            return {
                'click .media--quickActions--button.deleteButton': 'deleteWatchList',
                'click .media--quickActions--button.editButton': 'editWatchList',
                'click .unorderedEpisodeList--item .item--deleteButton': 'deleteMovie'
            }
        },

        render: function(options) {
            var self = this;

            var watchList = new WatchListModel({id: options.id});

            watchList.fetch().done(function(data) {
                var html = Nunjucks.render(template, {
                    watchList: {
                        title: data.name,
                        movies: data.movies
                    }
                });
                self.$el.html(html);

                $('.mediaSection--hideShowButton', this.el).click(function() {
                    self.toggleMediaSectionParentOfElement($(this));
                });

                self.hideMediaSectionForSmallScreen();
            });

            return this;
        },

        editWatchList: function() {
            $('#renameWatchListModal', this.el).openModal();

            var watchListTitleInput = $('#watchlist_title', this.el);
            watchListTitleInput.focus();
        },

        deleteWatchList: function() {
            console.log('Inu');
        },

        deleteMovie: function(event){
            console.log('Delete item was clicked')

        }
    });

});
