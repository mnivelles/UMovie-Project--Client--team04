define(function (require) {

    "use strict";

    var template = 'tvShow.page.nunj.html';

    return Backbone.View.extend({

        render: function() {
            var self = this;

            var html = nunjucks.render(template, {
                media: {
                    title: 'Stargate: Universe, Season 1',
                    img: 'http://lorempixel.com/366/546/transport/1',
                    mainInformations: [
                        '2 october 2009 - 11 june 2010',
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
                    ],
                    episodes: [
                        {
                            title: 'Air, Pt. 1',
                            img: 'http://lorempixel.com/240/135/nature/10',
                            trackId: '1',
                            rating: 'PG'
                        },{
                            title: 'Air, Pt. 2',
                            img: 'http://lorempixel.com/240/135/nature/9',
                            trackId: '2',
                            rating: 'PG'
                        },{
                            title: 'Air, Pt. 3',
                            img: 'http://lorempixel.com/240/135/nature/8',
                            trackId: '3',
                            rating: 'PG'
                        },{
                            title: 'Darkness',
                            img: 'http://lorempixel.com/240/135/nature/7',
                            trackId: '4',
                            rating: 'PG'
                        },{
                            title: 'Light',
                            img: 'http://lorempixel.com/240/135/nature/6',
                            trackId: '5',
                            rating: 'PG'
                        },{
                            title: 'Water',
                            img: 'http://lorempixel.com/240/135/nature/5',
                            trackId: '6',
                            rating: 'PG'
                        },{
                            title: 'Earth',
                            img: 'http://lorempixel.com/240/135/nature/4',
                            trackId: '7',
                            rating: 'PG'
                        },{
                            title: 'Time',
                            img: 'http://lorempixel.com/240/135/nature/3',
                            trackId: '8',
                            rating: 'PG'
                        },{
                            title: 'Life',
                            img: 'http://lorempixel.com/240/135/nature/2',
                            trackId: '9',
                            rating: 'PG'
                        },{
                            title: 'Justice',
                            img: 'http://lorempixel.com/240/135/nature/1',
                            trackId: '10',
                            rating: 'PG'
                        },{
                            title: 'Space',
                            img: 'http://lorempixel.com/240/135/nightlife/10',
                            trackId: '11',
                            rating: 'PG'
                        },{
                            title: 'Divided',
                            img: 'http://lorempixel.com/240/135/nightlife/9',
                            trackId: '12',
                            rating: 'PG'
                        },{
                            title: 'Faith',
                            img: 'http://lorempixel.com/240/135/nightlife/8',
                            trackId: '13',
                            rating: 'PG'
                        },{
                            title: 'Human',
                            img: 'http://lorempixel.com/240/135/nightlife/7',
                            trackId: '14',
                            rating: 'PG'
                        },{
                            title: 'Lost',
                            img: 'http://lorempixel.com/240/135/nightlife/6',
                            trackId: '15',
                            rating: 'PG'
                        },{
                            title: 'Sabotage',
                            img: 'http://lorempixel.com/240/135/nightlife/5',
                            trackId: '16',
                            rating: 'PG'
                        },{
                            title: 'Pain',
                            img: 'http://lorempixel.com/240/135/nightlife/4',
                            trackId: '17',
                            rating: 'PG'
                        },{
                            title: 'Subversion',
                            img: 'http://lorempixel.com/240/135/nightlife/3',
                            trackId: '18',
                            rating: 'PG'
                        },{
                            title: 'Incursion, Pt. 1',
                            img: 'http://lorempixel.com/240/135/nightlife/2',
                            trackId: '19',
                            rating: 'PG'
                        },{
                            title: 'Incursion, Pt. 2',
                            img: 'http://lorempixel.com/240/135/nightlife/1',
                            trackId: '20',
                            rating: 'PG'
                        }
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
            self.hideMediaSectionForSmallScreen();

            return this;
        }
    });

});
