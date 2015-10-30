define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        $ = require('jquery'),
        Nunjucks = require('nunjucks'),
        template = 'movie.page.nunj.html',
        MovieModel = require('movie.model');

    return Backbone.View.extend({

        initializeWithId: function(id) {
            this.model = new MovieModel({id: id});
            this.listenTo(this.model, 'change', this.render);
            this.model.fetch();
        },

        render: function () {
            var self = this;
            var html = Nunjucks.render(template, {
                media: {
                    title: self.model.get('trackName'),
                    img: self.model.get('artworkUrl100').replace("100x100", "400x400"),
                    mainInformations: [
                        GetMovieReleaseDateFormatedString(self.model.get('releaseDate')),
                        self.model.get('primaryGenreName'),
                        GetMovieLengthString(self.model.get('trackTimeMillis')),
                        'by ' + self.model.get('artistName'),
                        'Rating: <span class="media--ratingLogo">' + self.model.get('contentAdvisoryRating') + '</span>'
                    ],
                    itunesLink: self.model.get('trackViewUrl'),
                    youtubeTrailerUrl: self.model.get('previewUrl'),
                    synopsis: self.model.get('longDescription')
                    }
                });
                self.$el.html(html);

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
