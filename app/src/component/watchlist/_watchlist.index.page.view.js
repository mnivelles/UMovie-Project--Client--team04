/**
 * Created by erminewankpo on 2015-10-29.
 */
define(function (require) {

    'use strict';

    var template = 'watchlist.index.page.nunj.html',

   model= require('watchlist.model'),
    collection= require('watchlist.collection');

    var newModel= new model();
    var watchLists= new collection();



    var watchListItemView= Backbone.View.extend({
        tagName: 'ul',


       initialize:function(){

       },
        render:function(){
           var self=this;

            watchLists.fetch({
                success:function(result) {
                    result.each(function (model) {
                        console.log(model.get('name'));
                        var html = nunjucks.render(template, {
                            watch:{
                            title: model.get('name'),
                            id: model.get('id')
                        }
                        });

                        $('.btnNav').html('');
                        self.$el.prepend(html);
                    });
                }
            });
        }

    });

var watchListViews= Backbone.View.extend({
    el:$('.watchListContent'),
    model:newModel,
    collection:collection,

    events: {
        "click #create": "buttonCreateHandler",
        "click #btn-watch": "getModel",
        "click #btn-delete": "deleteWatchlist",
        "dblclick #create": "hideButtonCreateHandler",
        "dblclick #getList": "hideGetList",
        "click #getList": "showWatchLists",
        "click #submit": "addWatchlist"

    },

getModel:function(event){
  var id= $(event.currentTarget).data('id');
    console.log('id:'+' '+id);
    router.navigate('showWatchList', {trigger: true});
},
    buttonCreateHandler: function (event) {
        $(".new--watchlist").show();
        console.log('Hello World');
        console.log('create');
        watchLists.fetch({
            success:function(result) {
                console.log('Im the view');
            }
        });
    },

    hideButtonCreateHandler: function(event){
        $(".new--watchlist").hide();
    },


    addWatchlist: function (event) {
        var nameInput=$('#watchlist-name');
        var ownerInput=$('#user-contact');
        var modelDetails = {
            name:nameInput.val(),
            owner: ownerInput.val()
        };
        nameInput.val('');
        ownerInput .val('');

        newModel.save(modelDetails, {
            success: function (model) {
                var updateCheck= $(".updateTrigger");
                updateCheck.html(model.get('name') + " "+ 'was successfully added!');
                updateCheck.fadeIn(1000).fadeOut(2000);
            }

        });
        $(".new--watchlist").hide();
    },

    showWatchLists:function(event){
        $(".getWatchList").show();
        var app= new watchListItemView({el: ".getWatchList"});

        $(".getWatchList").html(app.render());

    },


    hideGetList:function(event){
        $(".getWatchList").hide();
    },


    deleteWatchlist: function (event) {

        var watchListId = $(event.currentTarget).data('id');
        console.log(watchListId);
        var item= watchLists.get(watchListId);
        var name= item.get('name');
        console.log(name);
        item.destroy({
            success: function(result){
                console.log(result);
                console.log(name+ ' '+ 'was successfully deleted');
            }
        });
        watchLists.remove(watchListId);

    },


    initialize:function(){
        this.listenTo(watchLists, 'change', this.render);
        this.listenTo(watchLists, 'destroy', this.render);
    },

    render: function() {

        var html = nunjucks.render(template, {
            media: {
                title: 'Your watchlist...your pleasure',
                img: '/image/watchlist-pict.png',
                mainInformations: [
                    '- Use your watchlist to track movies and TV shows that interest you.',
                    '- Share your favorites watchlist with your friends.',
                    '- Watch what you want, where you want and whenever you want, on your smartphones,tablets or computers.'
                ]
            }
        });

       this.$el.html(html);
        return this;

    }

});

  //return listView;
   //return watchListItemView;
   return watchListViews;


}) ;




