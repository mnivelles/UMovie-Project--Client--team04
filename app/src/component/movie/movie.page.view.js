define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        $ = require('jquery'),
        Nunjucks = require('nunjucks'),
        template = 'movie.page.nunj.html',
        MovieModel = require('movie.model');

    var model = new MovieModel({id: 960891136});

    return Backbone.View.extend({

        render: function () {
            var self = this;
            model.fetch().complete(function(){
                var html = Nunjucks.render(template, {
                    media: {
                        title: model.get('trackName'),
                        img: model.get('artworkUrl100'),
                        mainInformations: [
                            GetMovieReleaseDateFormatedString(model.get('releaseDate')),
                            model.get('primaryGenreName'),
                            GetMovieLengthString(model.get('trackTimeMillis')),
                            'by ' + model.get('artistName'),
                            'Rating: <span class="media--ratingLogo">' + model.get('contentAdvisoryRating') + '</span>'
                        ],
                        itunesLink: model.get('trackViewUrl'),
                        youtubeTrailerUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E',
                        synopsis: model.get('longDescription'),
                        actors: [
                            'Matthew McConaughey',
                            'Ellen Burstyn',
                            'Mackenzie Foy',
                            'John Lithgow',
                            'Timothée Chalamet',
                            'Anne Hathaway',
                            'Michael Caine',
                            'Jessica Chastain',
                            'Matt Damon',
                            'Andrew Borba'
                        ]
                    }
                });
                self.$el.html(html);
            });


            $('.media--quickActions--button.showTrailerButton', this.el).click(function () {
                self.showTrailer();
            });

            $('.mediaSection--hideShowButton', this.el).click(function() {
                self.toggleMediaSectionParentOfElement($(this));
            });

            //self.hideMediaSectionForSmallScreen();

            return this;
        }
    });

});

function GetMovieReleaseDateFormatedString(releaseDate) {
    return releaseDate.substring(0, releaseDate.indexOf('T'));
}

function GetMovieLengthString(lengthInMillis) {
    var seconds = lengthInMillis / 1000;
    var minutes = seconds / 60;
    var hours = minutes / 60;
    return Math.floor(hours).toString() + "h" + Math.floor(minutes % 60).toString();
}
