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
