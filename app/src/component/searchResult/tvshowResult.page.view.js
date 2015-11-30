define(function (require) {

    'use strict';


    var Backbone = require('backbone'),
        $ = require('jquery'),
        Nunjucks = require('nunjucks'),
        Moment = require('moment'),
        moviesTemplate = 'movieResult.page.nunj.html',
        _ = require('underscore'),
        TvShows = require('search.tvshows.model');


    return Backbone.View.extend({

        events: function() {
            return {
                'click .mediaSection--hideShowButton': 'toggleMediaSection'
            }
        },

        render: function (options){
            var self = this;
            self.searchString = options.searchString;
            var tvShows = new TvShows(self.searchString);
            tvShows.fetch({
                success : function(result) {
                    var tvShows = self.format(result);
                    var displayCount = tvShows.length;
                    var showList = [];
                    for(var i= 0; i < displayCount; i++){
                        showList.push(tvShows[i]);
                    }
                    self.display(showList);

                    $('.mediaSection--hideShowButton', self.el).click(function() {
                        self.toggleMediaSectionParentOfElement($(this));
                    });

                    self.hideMediaSectionForSmallScreen();
                }
            });

            return this;
        },

        toggleMediaSection: function(event) {
            this.toggleMediaSectionParentOfElement($(event.currentTarget));
        },

        format : function(rawTvSeasonList) {
            var tvSeasonList = [];
            _.each(rawTvSeasonList.toJSON(), function(tvSeason) {
                tvSeasonList.push(
                    {
                        id: tvSeason.collectionId,
                        title : tvSeason.collectionName,
                        poster : tvSeason.artworkUrl100.replace('100x100','400x400'),
                        trailerLink: 'https://www.youtube.com/embed/2m9IFlz2iYo',
                        releaseDate : Moment(tvSeason.releaseDate).format('ll')
                    }
                );
            });
            return tvSeasonList;
        },

        display : function(movies) {
            var self = this;
            var html = Nunjucks.render(moviesTemplate, { movies : movies} );
            self.$el.html(html);
        }
    });

});
