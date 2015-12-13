define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        Nunjucks = require('nunjucks'),
        Moment = require('moment'),
        template = 'actor.page.nunj.html',
        TMDb = require('TMDbSearch'),
        Actor = require('actor.model'),
        MoviesView = require('actor.movies.view'),
        SuggestionsView = require('actor.suggestions.view');

    return Backbone.View.extend({
        events: function () {
            return {
                'click .media .unorderedMoviesList .item--trailerButton ': 'showTrailerModal',
                'click #showTrailerModal .closeButton': 'closeTrailerModal',
                'click .mediaSection--hideShowButton': 'toggleMediaSection'
            }
        },

        render: function (id) {
            var self = this;
            var actor = new Actor({artistId: id});
            actor.fetch({
                success: function (result) {
                    var actor = result.toJSON();

                    TMDb.searchActor(actor.artistName, function (tmdbActor) {

                        self.display({
                            name: actor.artistName,
                            primaryGenre: actor.primaryGenreName,
                            iTunesLink: actor.artistLinkUrl,
                            biography: tmdbActor.biography,
                            img: tmdbActor.img,
                            birthday: tmdbActor.birthday,
                            placeOfBirth: tmdbActor.placeOfBirth,
                            homepage: tmdbActor.homepage
                        });
                        var moviesView = new MoviesView({el: self.$('.actor--movies')});
                        moviesView.render(id);

                        var suggestionsView = new SuggestionsView({el:self.$('.actor--suggestions')});
                        suggestionsView.initializeWithMovieName(actor.artistName);

                        self.hideMediaSectionForSmallScreen();
                    }, function() {
                        self.display({
                            name: actor.artistName,
                            primaryGenre: actor.primaryGenreName,
                            iTunesLink: actor.artistLinkUrl,
                            biography: undefined,
                            img: undefined,
                            birthday: undefined,
                            placeOfBirth: undefined,
                            homepage: undefined
                        });
                        var moviesView = new MoviesView({el: self.$('.actor--movies')});
                        moviesView.render(id);

                        var suggestionsView = new SuggestionsView({el:self.$('.actor--suggestions')});
                        suggestionsView.initializeWithMovieName(actor.artistName);

                        var message = 'All the information has not been loaded';

                        Materialize.toast(message, 4000, 'error-toast rounded');

                        self.hideMediaSectionForSmallScreen();
                    });

                    self.changePageTitleWith(actor.artistName);
                }
            });
            return this;
        },

        toggleMediaSection: function(event) {
            this.toggleMediaSectionParentOfElement($(event.currentTarget));

            this.hideMediaSectionForSmallScreen();
        },

        display: function (options) {
            var self = this;
            var html = Nunjucks.render(template, {
                media: {
                    title: options.name,
                    img: options.img,
                    mainInformations: [
                        self._formatBirth(options.birthday, options.placeOfBirth),
                        'Primary genre : ' + options.primaryGenre
                    ],
                    biography: options.biography,
                    itunesLink: options.iTunesLink,
                    homepage: options.homepage
                }
            });
            self.$el.html(html);
        },

        showTrailerModal: function (event) {
            var self = this;

            var button = $(event.currentTarget);

            var title = button.attr('data-title');

            youtubeSearch(title + ' trailer', function(videoUrl) {
                $('#showTrailerModal .modal--trailerVideo', self.el).attr('src', videoUrl);
                $('#showTrailerModal', self.el).openModal();
            });
        },

        closeTrailerModal: function () {
            $('#showTrailerModal', this.el).closeModal();
        },

        _formatBirth: function (date, place) {
            var day = Moment(date);

            var str = 'Born ';
            str += (day.isValid() && date) ? day.format('LL') + ' ' : '';
            str += place ? 'in ' + place : 'on Earth';

            return str;
        }
    });
});
