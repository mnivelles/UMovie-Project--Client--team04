define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        $ = require('jquery'),
        Nunjucks = require('nunjucks'),
        Moment = require('moment'),
        Common = require('/js/common.js'),
        //TMDb = require('TMDbSearch'),
        template = 'tvShow.page.nunj.html',
        ReactionsCollection = require('/js/reactions.collection.js'),
        ReactionsView = require('/js/reactions.view.js'),
        Episodes = require('tvShow.episodes.model'),
        Seasons = require('tvShow.season.model');
    require('https://apis.google.com/js/client.js?onload=googleApiClientReady');

    function getTvShowLengthString(lengthInMillis) {
        var duration = Moment.duration(lengthInMillis);
        var minutes = duration.minutes();
        var secondes = duration.seconds();
        secondes = secondes < 10 ? '0' + secondes : secondes;
        return minutes+ 'min'+secondes;
    }

    function switchEpisode(currentEpisode, currentSeason, error){
        var episodes = new Episodes([], {id: parseInt(currentSeason)});
        episodes.fetch({
            success: function (episodes) {
                var test =_.filter(episodes.toJSON(), function(episode){
                    return episode.trackNumber===currentEpisode;
                });
                if (test.length===0) {
                    Materialize.toast(error, 4000, 'red rounded');
                }
                _.map(test, function(episodeInfo){
                        return  new episodeView(
                            {
                                el: $('.modal-content'),
                                id:parseInt(episodeInfo.collectionId),
                                episodeTitle:episodeInfo.trackNumber +'.' +episodeInfo.trackName,
                                seasonTitle:episodeInfo.collectionName,
                                image:episodeInfo.artworkUrl100 .replace('100x100', '200x200'),
                                description:episodeInfo.longDescription,
                                duration:getTvShowLengthString(parseInt(episodeInfo.trackTimeMillis))});
                    });
            }
        });
        $('#ShowEpisodeModal').attr('data-currentEpisode',currentEpisode);
    }

    function showEpisodeModalContent(self){
        var episodes = new Episodes([], {id: self.id});
        episodes.fetch({
            success: function (episodes) {
                self.episodes = episodes.toJSON();
                youtubeSearch(self.seasonTitle+' '+ self.episodeTitle, function(videoUrl){
                    var html = Nunjucks.render(template, {media: {
                            title: self.seasonTitle,
                            img: self.image,
                            mainInformations: [
                                self.episodeTitle,
                                'Duration: ' +
                                self.duration],
                            synopsis: self.description,
                            youtubeTrailerUrl: videoUrl,
                            episodes: self.episodes
                        }
                    });
                    self.$el.html(html);
                    $('.media--quickActions--button.showTrailerButton', self.el).text('Preview');
                    $('.media--quickActions--button.imageButton', self.el).hide();

                    self.reactionsView = new ReactionsView({
                        el: $('.template-reactions', self.el),
                        collection: self.reactionsCollection
                    });

                    self.reactionsCollection.fetch({
                        success: function() {
                            self.reactionsView.renderWithId(self.id);
                        }
                    });
                });
            }});
    }

var episodeView =Backbone.View.extend({
    el: $('.modal-content'),
        initialize: function (options) {
            this.id=options.id;
            this.seasonTitle=options.seasonTitle;
            this.episodeTitle=options.episodeTitle;
            this.duration=options.duration;
            this.description=options.description;
            this.image=options.image;

            this.reactionsCollection = new ReactionsCollection();
            this.reactionsCollection.url = Common.REACTIONS_EMOJI_TVSHOW_URL;
            this.reactionsView = new ReactionsView();

            this.render();
        },

    render:function(){
        showEpisodeModalContent(this);
        return this;
    }
    });

    return Backbone.View.extend({

        initialize: function() {
            this.reactionsCollection = new ReactionsCollection();
            this.reactionsCollection.url = Common.REACTIONS_EMOJI_TVSHOW_URL;
            this.reactionsView = new ReactionsView();
        },

       events: function() {
            return {
                'click #episodeToWatch': 'showEpisodeModal',
                'click .media--quickActions--button.nextEpisodeBtn': 'showNextEpisode',
                'click .media--quickActions--button.previousEpisodeBtn': 'showPreviousEpisode'
            }
        },

        closeEpisodeModal:function(){
            $('#ShowEpisodeModal', this.el).closeModal();
        },

        showPreviousEpisode:function(){
            var currentSeason=$('#ShowEpisodeModal').attr('data-currentSeason');
            var currentEpisode= parseInt($('#ShowEpisodeModal').attr('data-currentEpisode'));
            var nextEpisode= currentEpisode-1;
            switchEpisode(nextEpisode, currentSeason, 'No previous episode available');
        },

        showNextEpisode:function(){
            var currentSeason=$('#ShowEpisodeModal').attr('data-currentSeason');
            var currentEpisode= parseInt($('#ShowEpisodeModal').attr('data-currentEpisode'));
            var nextEpisode= currentEpisode+1;
            switchEpisode(nextEpisode, currentSeason, 'No next episode available');
        },

        showEpisodeModal:function(event){
            var target = $(event.currentTarget);
            var title = target.text();
            var episode= target.attr('data-episodeId');
            var seasonId= target.attr('data-seasonId');
            var description= target.attr('data-description');
            var image= target.attr('data-picture');
            var duration= target.attr('data-duration');
            var season= target.attr('data-season');

            var test=new episodeView({
                el: $('.modal-content'), id:parseInt(seasonId),
                episodeTitle:title, seasonTitle:season,
                image:image .replace('100x100', '200x200'), description:description,
                duration:getTvShowLengthString(parseInt(duration))
            });

            Materialize.toast("You're watching "+ season, 1500, 'green rounded');
            Materialize.toast('Episode '+ title, 2500, 'green rounded');

            $('.lean-overlay').css({display:'none'});
            $('#ShowEpisodeModal', this.$el).openModal();
            $('#ShowEpisodeModal').attr('data-currentEpisode', episode);
            $('#ShowEpisodeModal').attr('data-currentSeason', seasonId);
        },



        getYoutubeTrailer: function() {
            var self = this;
            youtubeSearch(self.season.collectionName  + ' trailer', function(videoUrl){
                var episodes = new Episodes([], {id: self.id});
                episodes.fetch({
                    success: function (episodes) {
                        self.episodes = episodes.toJSON();
                        var html = Nunjucks.render(template, {
                            media: {
                                title: self.season.collectionName,
                                img: self.season.artworkUrl100.replace('100x100', '400x400'),
                                mainInformations: [
                                    'Released ' + Moment(self.season.releaseDate).format('LL'),
                                    self.season.primaryGenreName
                                ],
                                youtubeTrailerUrl: videoUrl,
                                synopsis: self.season.longDescription,
                                itunesUrl: self.season.collectionViewUrl,
                                episodes: self.episodes
                            },

                                episode:{
                                    title:self.episodes[0].itunesUrl
                                }

                        });

                        self.$el.html(html);
                        $('.media--quickActions--button.showTrailerButton', self.$el).click(function () {
                            self.showTrailer($(this));

                        });

                        $('.mediaSection--hideShowButton', self.$el).click(function () {
                            self.toggleMediaSectionParentOfElement($(this));
                        });

                        self.hideMediaSectionForSmallScreen();

                        self.changePageTitleWith(self.season.collectionName);

                        self.reactionsView = new ReactionsView({
                            el: $('.template-reactions', self.el),
                            collection: self.reactionsCollection
                        });

                        self.reactionsCollection.fetch({
                            success: function() {
                                self.reactionsView.renderWithId(self.id);
                            }
                        });
                    }
                });
            });
        },

        render: function (options) {
            var self = this;

            self.id = options.id;
            var seasons = new Seasons([], {id: self.id});


            seasons.fetch({
                success: function (seasons) {

                    self.season = seasons.toJSON().shift();
                    self.getYoutubeTrailer();

                }
            });

            return this;
        }
    });

});
