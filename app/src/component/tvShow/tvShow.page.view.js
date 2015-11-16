define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        $ = require('jquery'),
        Nunjucks = require('nunjucks'),
        Moment = require('moment'),
        Common = require('/js/common.js'),
        //TMDb = require('TMDbSearch'),
        template = 'tvShow.page.nunj.html',
        ReactionsCollection = require('/js/reactions.collection.js'),
        ReactionsView = require('/js/reactions.view.js'),
        Episodes = require('tvShow.episodes.model'),
        Seasons = require('tvShow.season.model');
    require('https://apis.google.com/js/client.js?onload=googleApiClientReady');

    return Backbone.View.extend({
        initialize: function() {
            this.reactionsCollection = new ReactionsCollection();
            this.reactionsCollection.url = Common.REACTIONS_EMOJI_TVSHOW_URL;

            this.reactionsView = new ReactionsView();
        },

        getYoutubeTrailer: function() {
            var self = this;
            youtubeSearch(self.season.collectionName  + ' trailer', function(videoUrl){
                var episodes = new Episodes([], {id: self.id});
                episodes.fetch({
                    success: function (episodes) {

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
                            }
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

                        self.reactionsView = new ReactionsView({
                            el: $('.template-reactions', self.el),
                            collection: self.reactionsCollection
                        });

                        self.reactionsCollection.fetch({
                            success: function(data) {
                                self.reactionsView.renderWithId(self.id);
                            }
                        });
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
