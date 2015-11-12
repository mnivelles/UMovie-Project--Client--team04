define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        $ = require('jquery'),
        Nunjucks = require('nunjucks'),
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
                            happyPercentage: 20,
                            cryPercentage: 10,
                            shootPercentage: 10,
                            devilPercentage: 10,
                            cheersPercentage: 5,
                            coolPercentage: 15,
                            surprisedPercentage: 8,
                            sadPercentage: 7,
                            funnyPercentage: 15
                        };

                        self.episodes = episodes.toJSON();
                        var html = Nunjucks.render(template, {
                            media: {
                                title: self.season.collectionName,
                                img: self.season.artworkUrl100.replace('100x100', '400x400'),
                                mainInformations: [
                                    self.season.releaseDate.split('T')[0],
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
