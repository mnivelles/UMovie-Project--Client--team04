define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        $ = require('jquery'),
        _ = require('underscore'),
        Nunjucks = require('nunjucks'),
        Materialize = require('materialize'),
        Common = require('/js/common.js'),
        template = 'movie.page.nunj.html',
        MovieModel = require('movie.model'),
        WatchListCollection = require('/js/watchList.collection.js');

    require('https://apis.google.com/js/client.js?onload=googleApiClientReady');


    function getMovieReleaseDateFormatedString(releaseDate) {
        return releaseDate.substring(0, releaseDate.indexOf('T'));
    }

    function getMovieLengthString(lengthInMillis) {
        var seconds = lengthInMillis / 1000;
        var minutes = seconds / 60;
        var hours = minutes / 60;
        return Math.floor(hours).toString() + 'h' + Math.floor(minutes % 60).toString();
    }

    return Backbone.View.extend({

        events: function() {
            return {
                'click #watchListSelectionDropDown .watchListSelection--item': 'addToWatchList'
            }
        },

        initializeWithId: function (id) {
            this.model = new MovieModel({trackId: id});
            this.listenTo(this.model, 'change', this.getMovieInfo);
            this.model.fetch();

            this.watchListCollection = new WatchListCollection();
            this.watchListCollection.fetch();
        },

        getMovieInfo: function () {
            var self = this;
            youtubeSearch(this.model.get('trackName'), function (videoUrl) {
                self.render(videoUrl);
            });
        },

        render: function (videoUrl) {
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

            var html = Nunjucks.render(template, {
                        media: {
                            title: self.model.get('trackName'),
                            img: self.model.get('artworkUrl100').replace('100x100', '400x400'),
                            mainInformations: [
                                getMovieReleaseDateFormatedString(self.model.get('releaseDate')),
                                self.model.get('primaryGenreName'),
                                getMovieLengthString(self.model.get('trackTimeMillis')),
                                'by ' + self.model.get('artistName'),
                                'Rating: <span class="media--ratingLogo">' + self.model.get('contentAdvisoryRating') + '</span>'
                            ],
                            itunesLink: self.model.get('trackViewUrl'),
                            youtubeTrailerUrl: videoUrl,
                            synopsis: self.model.get('longDescription')
                        },
                        reactions: reactions,
                        watchListCollection: _.map(_.sortBy(self.watchListCollection.models, function (watchList) {
                            return watchList.get('title').toUpperCase();
                        }), function (watchList) {
                            return {
                                id: watchList.get('id'),
                                title: watchList.get('title')
                            }
                        })
                    }
                );

            self.$el.html(html);

            $('.watchListButton.dropdown-button').dropdown({
                    inDuration: 300,
                    outDuration: 225,
                    constrain_width: false,
                    hover: false,
                    gutter: 0,
                    belowOrigin: false,
                    alignment: 'left'
                }
            );

            $('.media--quickActions--button.showTrailerButton', this.el).click(function () {
                self.showTrailer();
            });

            $('.mediaSection--hideShowButton', this.el).click(function () {
                self.toggleMediaSectionParentOfElement($(this));
            });

            self.hideMediaSectionForSmallScreen();

            self.changePageTitleWith(self.model.get('trackName'));

            return this;
        },

        addToWatchList: function(event) {
            var button = $(event.currentTarget);
            var watchListId = button.attr('data-id');

            this.model.addToWatchList(watchListId);

            var message = '"' + this.model.get('trackName') + '"' +
                ' added to watchlist : "' + button.text() + '"';

            Materialize.toast(message, 4000, 'success-toast rounded');
        }
    });
});
