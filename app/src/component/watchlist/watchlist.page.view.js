define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        Nunjucks = require('nunjucks'),
        $ = require('jquery'),
        Common = require('/js/common.js'),
        WatchListModel = require('/js/watchList.model.js'),
        template = 'watchList.page.nunj.html';

    return Backbone.View.extend({
        initialize: function() {
            this.watchList = new WatchListModel();
        },

        events: function() {
            return {
                'click .media--quickActions--button.deleteButton': 'deleteWatchList',
                'click .media--quickActions--button.renameButton': 'renameWatchList',
                'click .unorderedEpisodeList--item .item--deleteButton': 'deleteMovie',
                'click #renameWatchListModal .applyButton': 'submitNewName'

            }
        },

        render: function(options) {
            var self = this;

            this.watchList = new WatchListModel({id: options.id});

            this.watchList.fetch({
                success: function (result) {
                    var html = Nunjucks.render(template, {
                        watchList: {
                            title: result.get('title'),
                            movies: result.get('simpleMovies')
                        }
                    });
                    self.$el.html(html);

                    $('.mediaSection--hideShowButton', self.el).click(function () {
                        self.toggleMediaSectionParentOfElement($(this));
                    });

                    self.hideMediaSectionForSmallScreen();
                }
            });

            return this;
        },

        renameWatchList: function() {
            $('#renameWatchListModal', this.el).openModal();

            var watchListTitleInput = $('#watchlist_title', this.el);
            watchListTitleInput.focus();
        },

        submitNewName: function() {
            var self = this;

            var newTitle = $('#watchlist_title', this.el).val();
            this.watchList.set({
                name: newTitle
            }).save().done(function() {
                self.render({
                    id: self.watchList.id
                });
            });
        },

        deleteWatchList: function() {
            this.watchList.destroy().done (function() {
                Backbone.history.navigate('/', {trigger: true});
            });

        },

        deleteMovie: function(event){
            var self = this;
            var button = $(event.currentTarget);
            var movieId = button.attr('data-id');


            $.ajax({
                url: Common.UMOVIE_API_BASE_URL + 'watchlists/' + self.watchList.id + '/movies/' + movieId,
                type: 'DELETE'
            }).done(function(){
                console.log('Movie ' + movieId + ' deleted');
                self.render({
                    id: self.watchList.id
                });
            }).fail(function(){
                console.log('Fail to remove Movie ' + movieId);
            });
        }
    });

});
