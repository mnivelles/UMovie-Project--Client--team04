define(function (require) {

    'use strict';


    var Backbone = require('backbone'),
        $ = require('jquery'),
        Nunjucks = require('nunjucks'),
        Moment = require('moment'),
        moviesTemplate = 'movieResult.page.nunj.html',
        _ = require('underscore'),
        Movies = require('search.movies.model');


    return Backbone.View.extend({

        events: function() {
            return {
                'click .mediaSection--hideShowButton': 'toggleMediaSection',
                'change .movie-genre-select':'filterMovies'
            }
        },

        render: function (options){
            var self = this;
            self.searchString = options.searchString;
            var movies = new Movies(self.searchString);
            movies.fetch({
                success : function(result) {
                    var movies = self.format(result);
                    var displayCount = movies.length;
                    var moviesList = [];
                    for(var i= 0; i < displayCount; i++){
                        moviesList.push(movies[i]);
                    }
                    self.display(moviesList);

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

        display : function(movies) {
            var self = this;
            var html = Nunjucks.render(moviesTemplate, { movies : movies} );
            self.$el.html(html);
        },
        filterMovies:function(){
            console.log($('.movie-genre-select').val());
            var url = window.location.href;
            url = url.split('&')[0];
            url+='&genre=' + $('.movie-genre-select').val();
            window.location.href = url;
        }
    });

});
