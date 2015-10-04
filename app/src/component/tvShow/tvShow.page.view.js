define(function (require) {

    "use strict";

    var template = 'tvShow.page.nunj.html';

    return Backbone.View.extend({

        render: function() {
            var self = this;

            var html = nunjucks.render(template, {
                media: {
                    title: 'Stargate: Universe',
                    img: 'http://lorempixel.com/366/546/transport/1',
                    mainInformations: [
                        '2 october 2009 - 2011',
                        '2 seasons',
                        'Science-Fiction and Fantasy',
                        'by Robert C. Cooper, Brad Wright'
                    ],
                    youtubeTrailerUrl: 'https://www.youtube.com/embed/0HyD3aKFTkA',
                    synopsis: 'When their hidden base comes under attack, a band of civilians and military personnel ' +
                        'escape through a Stargate on an ancient ship headed into deep space. Now, these ' +
                        'survivors must figure out a way to get back to Earth, while also providing themselves ' +
                        'with the most basic of needs - food, water and air.<br>— iTunes',
                    actors: [
                        'Robert Carlyle',
                        'Louis Ferreira',
                        'Brian J. Smith',
                        'Elyse Levesque',
                        'David Blue'
                    ]
                }
            });
            this.$el.html(html);

            $('.media--quickActions--button.showTrailerButton', this.el).click(function () {
                self.showTrailer();
            });

            return this;
        }
    });

});
