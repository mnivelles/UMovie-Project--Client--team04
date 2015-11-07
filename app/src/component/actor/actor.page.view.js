define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        $ = require('jquery'),
        Nunjucks = require('nunjucks'),
        template = 'actor.page.nunj.html',
        _ = require('underscore'),
        Actor = require('actor.model'),
        Movies = require('actor.movies.model'),
        imageSearch = require('TMDbImageSearch');
    require('https://apis.google.com/js/client.js?onload=googleApiClientReady');

    return Backbone.View.extend({

        render: function (id) {
            var self = this;
            var actor = new Actor({artistId:id});
            actor.fetch({
                success: function(result){
                    var actor = result.toJSON();
                    imageSearch(actor.artistName, function(imageUrl){
                        var movies = new Movies(id);
                        movies.fetch({
                            success : function(movies){
                                self.display(
                                    {
                                        name : actor.artistName,
                                        primaryGenre : actor.primaryGenreName,
                                        iTunesLink : actor.artistLinkUrl,
                                        imageUrl : imageUrl,
                                        movies : self.format(movies)
                                    }
                                );
                                $('.mediaSection--hideShowButton', self.el).click(function() {
                                    self.toggleMediaSectionParentOfElement($(this));
                                });
                            }
                        });
                    });
                }
            });
            return this;
        },

        format : function(rawMovieList) {
            var movieList = [];
            _.each(rawMovieList.toJSON(), function(movie) {
                movieList.push(
                    {
                        title : movie.trackName,
                        artWork : movie.artworkUrl100.replace('100x100','400x400'),
                        trailer : 'https://www.youtube.com/embed/2m9IFlz2iYo',
                        releaseDate : movie.releaseDate.substring(0, 10)
                    }
                );
            });
            return movieList;
        },

        display: function(options){
            var self = this;
            var html = Nunjucks.render(template, {
                media: {
                    title: options.name,
                    img: options.imageUrl,
                    mainInformations: [
                        'Primary genre :' + options.primaryGenre
                    ],
                    itunesLink: options.iTunesLink,
                    movies : options.movies
                }
            });
            self.$el.html(html);
        }
    });
});
