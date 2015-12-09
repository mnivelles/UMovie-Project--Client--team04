define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        $ = require('jquery'),
        Nunjucks = require('nunjucks'),
        Moment = require('moment'),
        Common = require('/js/common.js'),
        //TMDb = require('TMDbSearch'),
        template = 'tvShow.page.nunj.html',
        templateSearch = 'searchResult.nunj.html',
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

    function switchEpisode(changeEpisode){
        var modal = $('#ShowEpisodeModal');
        var currentSeason = modal.attr('data-currentSeason');
        var currentEpisode = parseInt(modal.attr('data-currentEpisode'));
        if(currentEpisode < 1) currentEpisode = 1;
        var nextEpisode, error;
        nextEpisode = (changeEpisode==='previous') ? currentEpisode - 1 : currentEpisode + 1;
        error = 'The episode ' + nextEpisode + ' is not available';
        loadEpisode (nextEpisode, currentSeason,error);
    }

    function loadEpisode(currentEpisode, currentSeason, error){
        var episodes = new Episodes([], {id: parseInt(currentSeason)});
        episodes.fetch({
            success: function (episodes) {
                var episodesInfo = _.filter(episodes.toJSON(), function(episode){
                    return episode.trackNumber === currentEpisode;
                });
                if (episodesInfo.length === 0) Materialize.toast(error, 1000, 'red rounded');
                _.map(episodesInfo, function(episodeInfo){
                        return  new episodeView(
                            {
                                el: $('.modal-content'), id:parseInt(episodeInfo.collectionId),
                                episodeTitle:episodeInfo.trackNumber +'.' +episodeInfo.trackName,
                                seasonTitle:episodeInfo.collectionName,
                                image:episodeInfo.artworkUrl100 .replace('100x100', '400x400'),
                                description:episodeInfo.longDescription,
                                duration:getTvShowLengthString(parseInt(episodeInfo.trackTimeMillis))});
                    });
            }
        });
        $('#ShowEpisodeModal').attr('data-currentEpisode',currentEpisode);
    }

    function initializeReactionCollection(self){
        self.reactionsCollection = new ReactionsCollection();
        self.reactionsCollection.url = Common.REACTIONS_EMOJI_TVSHOW_URL;
        self.reactionsView = new ReactionsView();
    }

    function showReactionIcon(self){
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



    function showEpisodeModalContent(self){
        var episodes = new Episodes([], {id: self.id});
        episodes.fetch({
            success: function (episodes) {
                youtubeSearch(self.seasonTitle + ' ' + self.episodeTitle, function(videoUrl){
                    var html = Nunjucks.render(template, {media: {
                        img: self.image,
                        title: self.seasonTitle,
                        mainInformations: [
                            self.episodeTitle,
                            'Duration: ' + self.duration],
                        synopsis: self.description,
                        youtubeTrailerUrl: videoUrl,
                        episodes: episodes.toJSON()
                    }
                    });
                    self.$el.html(html);
                    initializeModaContent(self);
                });
            }});
    }


    function initializeModaContent(self){
        $('.media--quickActions--button.showTrailerButton', self.el).click(function () {
            self.showTrailer($(self));
        }); //--not working

        $('.media--quickActions--button.showTrailerButton', self.el).text('Preview');
        $('.media--quickActions--button.imageButton', self.el).hide();
        Materialize.toast("You're watching " + self.seasonTitle, 1500, 'green rounded');
        Materialize.toast('Episode ' + self.episodeTitle, 2000, 'green rounded');
        showReactionIcon(self);
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
            initializeReactionCollection(this);
            this.render();
        },

    render:function(){
        showEpisodeModalContent(this);
        return this;}
    });

    return Backbone.View.extend({

        initialize: function() {
            initializeReactionCollection(this);
        },

       events: function() {
            return {
                'click #episodeToWatch': 'showEpisodeModal',
                'click .media--quickActions--button.nextEpisodeBtn': 'showNextEpisode',
                'click .media--quickActions--button.previousEpisodeBtn': 'showPreviousEpisode',
                'click .media--quickActions--button.searchBtn': 'searchEpisode',
                'click .media--quickActions--button.closeResultSearchBtn': 'closeResult'
            }
        },

        showPreviousEpisode:function(){
            switchEpisode('previous');
        },

        showNextEpisode:function(){
            switchEpisode('next');
        },

        closeResult:function(){
            $('#result').hide();
            $('.media--quickActions--button.closeResultSearchBtn').hide();
        },

        searchEpisode:function(){
           var search= $('#searchEpisode').val();
            if(search=="") Materialize.toast(' Search field empty!', 1000, 'red rounded');
            else {
                var self = this;
                var episodes = new Episodes([], {id: self.id});
                episodes.fetch({
                    success: function (episodes) {
                        self.episodes = episodes.toJSON();
                        var html = Nunjucks.render(templateSearch, {
                            media: {
                                episodes: _.filter(self.episodes, function (episode) {
                                    return _.contains(episode.trackName.toUpperCase(), search.toUpperCase()) || episode.trackNumber === parseInt(search);
                                })
                            }
                        });
                        $('#result').show();
                        self.$('#result').html(html);
                        $('.media--quickActions--button.closeResultSearchBtn').show();
                    }
                });
            }
        },


        showEpisodeModal:function(event){
            var modal = $('#ShowEpisodeModal');
            var target = $(event.currentTarget);
            var title = target.text();
            var episode = target.attr('data-episodeId');
            var seasonId = target.attr('data-seasonId');
            var description = target.attr('data-description');
            var image = target.attr('data-picture');
            var duration = target.attr('data-duration');
            var season = target.attr('data-season');

            var watchEpisode = new episodeView({
                el: $('.modal-content'), id:parseInt(seasonId),
                episodeTitle: title, seasonTitle:season,
                image: image .replace('100x100', '400x400'), description:description,
                duration: getTvShowLengthString(parseInt(duration))
            });

            $('.lean-overlay').css({display:'none'});
            $('#ShowEpisodeModal', this.$el).openModal();
            modal.animate({ scrollTop: 0 }, 'slow');
            modal.attr('data-currentEpisode', episode);
            modal.attr('data-currentSeason', seasonId);
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
                        $('.media--quickActions--button.closeResultSearchBtn').hide();
                        $('.media--quickActions--button.showTrailerButton', self.$el).click(function () {
                            self.showTrailer($(this));

                        });

                        $('.mediaSection--hideShowButton', self.$el).click(function () {
                            self.toggleMediaSectionParentOfElement($(this));
                        });

                        self.hideMediaSectionForSmallScreen();
                        $('.input-field.tv-show',self.el).removeClass('hide');

                        self.changePageTitleWith(self.season.collectionName);
                        showReactionIcon(self);

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
