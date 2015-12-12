define(function (require) {

    'use strict';


    var Backbone = require('backbone'),
        $ = require('jquery'),
        Nunjucks = require('nunjucks'),
        Moment = require('moment'),
        tvshowTemplate = 'tvshowResult.page.nunj.html',
        _ = require('underscore'),
        TvShows = require('search.tvshows.model');


    return Backbone.View.extend({

        events: function() {
            return {
                'click .mediaSection--hideShowButton': 'toggleMediaSection',
                'change .movie-genre-select':'filterTvshows'
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

        display : function(tvshows) {
            var self = this;
            var html = Nunjucks.render(tvshowTemplate, { tvshows : tvshows} );
            self.$el.html(html);
        },
        filterTvshows:function(){
            console.log($('.movie-genre-select').val());
            var url = window.location.href;
            url = url.split('&')[0];
            url+='&genre=' + $('.movie-genre-select').val();
            window.location.href = url;
        }
    });

});
