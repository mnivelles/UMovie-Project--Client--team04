define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        $ = require('jquery'),
        Nunjucks = require('nunjucks'),
        Common = require('/js/common.js'),
        template = 'tvShow.page.nunj.html';

    /*$.ajaxPrefilter(function (options) {
        options.url = 'https://umovie.herokuapp.com/unsecure' + options.url;
    });*/

    var Seasons = Backbone.Collection.extend({
        initialize: function (models, options) {
            this.id = options.id;
        },
        url: function () {
            return Common.UMOVIE_API_BASE_URL + 'tvshows/season/' + this.id
        },

        parse: function (response) {
            return response.results;
        }
    });

    var Episodes = Backbone.Collection.extend({
        initialize: function (models, options) {
            this.id = options.id;
        },
        url: function () {
            return Common.UMOVIE_API_BASE_URL + 'tvshows/season/' + this.id + '/episodes'
        },
        parse: function (response) {
            return response.results;
        }
    });


    return Backbone.View.extend({

        render: function (options) {
            var self = this;
            self.id = options.id;
            var seasons = new Seasons([], {id: self.id});

            seasons.fetch({
                success: function (seasons) {

                    self.season = seasons.toJSON().shift();
                    var episodes = new Episodes([], {id: self.id});
                    episodes.fetch({
                        success: function (episodes) {
                            self.episodes = episodes.toJSON();
                            var html = Nunjucks.render(template, {
                                media: {
                                    title: self.season.collectionName,
                                    img: self.season.artworkUrl100.replace("100x100", "400x400"),
                                    mainInformations: [
                                        self.season.releaseDate.split('T')[0],
                                        self.season.primaryGenreName
                                    ],
                                    youtubeTrailerUrl: 'https://www.youtube.com/embed/0HyD3aKFTkA',
                                    synopsis: self.season.longDescription,
                                    itunesUrl: self.season.artistViewUrl,

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
                        }
                    });

                }
            });

            return this;
        }
    });

});
