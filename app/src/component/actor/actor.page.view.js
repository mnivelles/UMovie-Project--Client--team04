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
                    ],
                    biography: 'Matthew McConaughey is an American actor and producer. He ' +
                    'first gained notice for his breakout role in the coming-of-age comedy Dazed and Confused ' +
                    '(1993), and went on to appear in films such as the slasher Texas Chainsaw Massacre: The Next ' +
                    'Generation (1994). <br>' +
                    'McConaughey achieved much success in 2013 for portraying a cowboy diagnosed with ' +
                    'AIDS in the biographical film Dallas Buyers Club, which earned him the Academy Award for Best Actor ' +
                    'and Golden Globe Award for Best Actor, among other awards and nominations. In 2014, he also starred ' +
                    'as Rust Cohle in the acclaimed HBO crime anthology series True Detective, for which he won a ' +
                    'Critics\' Choice Award and was nominated for a Primetime Emmy Award for Outstanding Lead Actor in a ' +
                    'Drama Series.<br>' +
                    '— Wikipedia'
                }
            });
            this.$el.html(html);

            return this;
        }
    });

});
