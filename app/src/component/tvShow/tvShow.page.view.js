define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        $ = require('jquery'),
        Nunjucks = require('nunjucks'),
        Moment = require('moment'),
        //TMDb = require('TMDbSearch'),
        template = 'tvShow.page.nunj.html',
        Episodes = require('tvShow.episodes.model'),
        Seasons = require('tvShow.season.model');
    require('https://apis.google.com/js/client.js?onload=googleApiClientReady');

    return Backbone.View.extend({


        getYoutubeTrailer: function() {
            var self = this;
            youtubeSearch(self.season.collectionName  + ' trailer', function(videoUrl){
                var episodes = new Episodes([], {id: self.id});
                episodes.fetch({
                    success: function (episodes) {
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

                        self.episodes = episodes.toJSON();
                        var html = Nunjucks.render(template, {
                            media: {
                                title: self.season.collectionName,
                                img: self.season.artworkUrl100.replace('100x100', '400x400'),
                                mainInformations: [
                                    'Released ' + Moment(self.season.releaseDate).format('LL'),
                                    self.season.primaryGenreName
                                ],
                                youtubeTrailerUrl: videoUrl,
                                synopsis: self.season.longDescription,
                                itunesUrl: self.season.collectionViewUrl,

                                episodes: self.episodes
                            },
                            reactions: reactions
                        });

                        self.$el.html(html);
                        $('.media--quickActions--button.showTrailerButton', self.$el).click(function () {
                            self.showTrailer();
                        });

                        $('.mediaSection--hideShowButton', self.$el).click(function () {
                            self.toggleMediaSectionParentOfElement($(this));
                        });

                        self.hideMediaSectionForSmallScreen();

                        self.changePageTitleWith(self.season.collectionName);
                    }
                });
            });
        },

        render: function (options) {
            var self = this;
            self.id = options.id;
            var seasons = new Seasons([], {id: self.id});

            seasons.fetch({
                success: function (seasons) {

                    self.season = seasons.toJSON().shift();
                    self.getYoutubeTrailer();
                }
            });

            return this;
        }
    });

});
