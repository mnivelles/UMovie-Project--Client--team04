define(function(require){
    'use strict';

    var Backbone = require('backbone'),
        Nunjucks = require('nunjucks'),
        Moment = require('moment'),
        moviesTemplate = 'actor.movies.nunj.html',
        _ = require('underscore'),
        Movies = require('actor.movies.model'),
        Promise = require('bluebird');

    var maxDisplayCount = 10;

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
                    var moviesList = [];
                    for(var i= 0; i < displayCount; i++){
                        moviesList.push(movies[i]);
                    }

                    self.getTrailers(moviesList, function() {
                        self.display(moviesList);

                        $('.mediaSection--hideShowButton', self.el).click(function() {
                            self.toggleMediaSectionParentOfElement($(this));
                        });

                        self.hideMediaSectionForSmallScreen();
                    });
                }
            });

            return this;
        },

        toggleMediaSection: function(event) {
            this.toggleMediaSectionParentOfElement($(event.currentTarget));
        },

        format : function(rawMovieList) {
            var movieList = [];
            _.each(rawMovieList.toJSON(), function(movie) {
                movieList.push(
                    {
                        id: movie.trackId,
                        title : movie.trackName,
                        poster : movie.artworkUrl100.replace('100x100','400x400'),
                        trailerLink: 'https://www.youtube.com/embed/2m9IFlz2iYo',
                        releaseDate : Moment(movie.releaseDate).format('ll')
                    }
                );
            });
            return movieList;
        },

        getYoutubeTrailer: function(movieTitle, index) {
            return new Promise(function(resolve){
                youtubeSearch(movieTitle, function(link){
                    resolve({
                        index : index,
                        link : link
                    });
                });
            });
        },

        getTrailers: function(movieList, callback) {
            var self = this;
            var promises = [];

            for(var i=0; i< movieList.length; i++){
                var promise = self.getYoutubeTrailer(movieList[i].title, i);
                promise.then(function(result){
                    movieList[result.index].trailerLink = result.link;
                });
                promises.push(promise);
            }

            Promise.all(promises).then(function(){
                callback();
            });
        },

        display : function(movies) {
            var self = this;
            var html = Nunjucks.render(moviesTemplate, { movies : movies} );
            self.$el.append(html);
        }
    });
});
