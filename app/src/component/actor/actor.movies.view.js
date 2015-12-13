define(function(require){
    'use strict';

    var Backbone = require('backbone'),
        Nunjucks = require('nunjucks'),
        Moment = require('moment'),
        moviesTemplate = 'actor.movies.nunj.html',
        _ = require('underscore'),
        Movies = require('actor.movies.model');

    var maxDisplayCount = 12;

    return Backbone.View.extend({
        events: function() {
            return {
                'click .mediaSection--hideShowButton': 'toggleMediaSection'
            }
        },

        render: function (id){
            var self = this;
            var movies = new Movies(id);
            movies.fetch({
                success : function(result) {
                    var movies = self.format(result);
                    var displayCount = movies.length > maxDisplayCount ? maxDisplayCount : movies.length;

                    self.display(_.slice(movies, 0, displayCount));
                }
            });

            return this;
        },

        toggleMediaSection: function(event) {
            this.toggleMediaSectionParentOfElement($(event.currentTarget));

            this.hideMediaSectionForSmallScreen();
        },

        format : function(rawMovieList) {
            var movieList = [];
            _.each(rawMovieList.toJSON(), function(movie) {
                movieList.push(
                    {
                        id: movie.trackId,
                        title : movie.trackName,
                        poster : movie.artworkUrl100.replace('100x100','400x400'),
                        releaseDate : Moment(movie.releaseDate).format('ll')
                    }
                );
            });
            return movieList;
        },

        display : function(movies) {
            var self = this;
            var html = Nunjucks.render(moviesTemplate, { movies : movies} );
            self.$el.append(html);
        }
    });
});
