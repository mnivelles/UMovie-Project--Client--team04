define(function (require) {

    "use strict";

    var template = 'actor.page.nunj.html';

    return Backbone.View.extend({

        render: function () {
            var self = this;

            var html = nunjucks.render(template, {
                media: {
                    title: 'Matthew McConaughey',
                    img: '/image/matthewM.jpg',
                    mainInformations: [
                        'Born November 4, 1969 in Uvalde, Texas, USA',
                        'Genres: Matthew McConaughey as played in a variety of movies genres ranging from comedy to drama.'
                    ]
                }
            });
            this.$el.html(html);

            return this;
        }
    });

});
