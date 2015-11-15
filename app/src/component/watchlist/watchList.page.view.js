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

            var reactions = {
                happy: {
                    percentage: 20,
                    percentageSize: 'xsmall'
                },
                cry: {
                    percentage: 10,
                    percentageSize: 'small'
                },
                shoot: {
                    percentage: 10,
                    percentageSize: 'large'
                },
                devil: {
                    percentage: 10,
                    percentageSize: 'xlarge'
                },
                cheers: {
                    percentage: 5,
                    percentageSize: 'medium'
                },
                cool: {
                    percentage: 15,
                    percentageSize: 'large'
                },
                surprised: {
                    percentage: 8,
                    percentageSize: 'small'
                },
                sad: {
                    percentage: 7,
                    percentageSize: 'xsmall'
                },
                funny: {
                    percentage: 15,
                    percentageSize: 'medium'
                }
            };

            this.watchList = new WatchListModel({id: options.id});

            this.watchList.fetch({
                success: function (result) {
                    var html = Nunjucks.render(template, {
                        watchList: {
                            title: result.get('title'),
                            movies: result.get('simpleMovies')
                        },
                        reactions: reactions
                    });
                    self.$el.html(html);

                    $('.mediaSection--hideShowButton', self.el).click(function () {
                        self.toggleMediaSectionParentOfElement($(this));
                    });

                    self.hideMediaSectionForSmallScreen();

                    self.changePageTitleWith(result.get('title'));
                }
            });

            return this;
        },

        renameWatchList: function() {
            $('#renameWatchListModal', this.el).openModal();

            var watchListTitleInput = $('#renameWatchListModal #watchlist_title', this.el);
            watchListTitleInput.focus();
        },

        submitNewName: function() {
            var self = this;

            var newTitle = $('#watchlist_title', this.el).val().trim();

            if (newTitle.length > 0) {
                $('#renameWatchListModal .input-field .error-message').hide();
                $('#renameWatchListModal .input-field input').removeClass('invalid');

                $('#renameWatchListModal', this.el).closeModal();

                this.watchList.set({
                    name: newTitle
                }).save().done(function() {
                    self.render({
                        id: self.watchList.id
                    });

                    var message = 'Rename as "' + newTitle + '"';

                    Materialize.toast(message, 4000, 'success-toast rounded');
                });
            } else {
                $('#renameWatchListModal .input-field .error-message').text('Invalid name. Choose a smarter one.').fadeIn(300);
                $('#renameWatchListModal .input-field input').addClass('invalid');
                self.shakeForErrorWithElement($('#renameWatchListModal'));
            }
        },

        deleteWatchList: function() {
            this.watchList.destroy().done (function() {
                Backbone.history.navigate('/watchlists', {trigger: true});
            });

        },

        deleteMovie: function(event){
            var self = this;
            var button = $(event.currentTarget);
            var movieId = button.attr('data-id');


            $.ajax({
                url: Common.UMOVIE_API_BASE_URL + 'watchlists/' + self.watchList.id + '/movies/' + movieId,
                type: 'DELETE'
            }).done(function(e){
                self.render({
                    id: self.watchList.id
                });
                var message = 'The film has been removed from the list';
                Materialize.toast(message, 4000, 'information-toast rounded');
            }).fail(function(){
                console.log('Fail to remove Movie ' + movieId);
            });
        }
    });

});
