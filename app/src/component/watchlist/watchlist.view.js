/**
 * Created by erminewankpo on 2015-11-05.
 */

define(function (require) {

    model= require('watchlist.model');

    var template = 'watchlist.nunj.html';

    var newModel= new model();
    var movModel= Backbone.Model.extend({
        urlRoot : 'https://umovie.herokuapp.com/unsecure/watchlists/',
        parse: function(response) {

            this.id = response.id;
            //console.log(response);
            return response.movies;
        }

    });
    var movieModel= new movModel();


    var listMovies= Backbone.View.extend({
        el: $('.addMovie'),
        model:movieModel,

        render:function(){
        var html = nunjucks.render(template, {
            moviesOption: {
                id: model.get('id'),
                title: model.get('trackName')
            }
        })
        }
    });


        var watchView= Backbone.View.extend({
        el: $('.watchlist--page'),
        model: newModel,

        events:{
            "click #addTvShow": "addTvShow",
            "click #addMovie": "addMovie",
            "dblclick #addMovie": "hideBtnMovie",
            "click #btn-play": "watch",
            "click #btn-delete": "deleteItem"

        },

            initialize:function(){
              //  _.bindAll(this,render);

            },

        deleteItem:function(event){

        },

        addMovie: function(event){
          $('.add-component').show();

        },

        hideBtnMovie:function (event){
            $('.add-component').hide();
        },

        render: function() {
            var self = this;

            var html = nunjucks.render(template, {
                media: {

                    episodes: [

                        {
                            title: self.model.get('trackname'),
                            img: 'http://lorempixel.com/240/135/nature/10',
                            trackId: self.model.get('genres'),
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
            $('.mediaSection--hideShowButton', this.el).click(function() {
                self.toggleMediaSectionParentOfElement($(this));
            });


            self.hideMediaSectionForSmallScreen();

            return this;
        }
    });
    return watchView;

});
