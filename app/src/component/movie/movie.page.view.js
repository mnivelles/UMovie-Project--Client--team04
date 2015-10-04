define(function (require) {

    "use strict";

    var template = 'movie.page.nunj.html';

    return Backbone.View.extend({

        render: function () {
            var self = this;

            var html = nunjucks.render(template, {
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
                    youtubeTrailerUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E'
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
