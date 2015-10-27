define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        $ = require('jquery'),
        Nunjucks = require('nunjucks'),
        template = 'movie.page.nunj.html';

    return Backbone.View.extend({

        render: function () {
            var self = this;

            var html = Nunjucks.render(template, {
                media: {
                    title: 'Interstellar',
                    img: '/image/interstellar.jpg',
                    mainInformations: [
                        '7 november 2014',
                        'Adventure, Drama and Science-Fiction',
                        '2h49',
                        'by Christopher Nolan',
                        'Rating: <span class="media--ratingLogo">PG-13</span>'
                    ],
                    youtubeTrailerUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E',
                    synopsis: 'From director Christopher Nolan (Inception, The Dark Knight trilogy) ' +
                        'comes the story of a team of pioneers undertaking the most important mission in human ' +
                        'history. Academy Award®-winner Matthew McConaughey (Dallas Buyer’s Club) stars as ' +
                        'ex-pilot-turned-farmer Cooper, who must leave his family and a foundering Earth behind ' +
                        'to lead an expedition traveling beyond this galaxy to discover whether mankind has a future ' +
                        'among the stars. Academy Award®-winner Anne Hathaway (Les Misérables) and Academy ' +
                        'Award®-nominee Jessica Chastain (Zero Dark Thirty) also star in this landmark film.<br>' +
                        '— iTunes',
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
            this.$el.html(html);

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
