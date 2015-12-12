define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        _ = require('underscore'),
        $ = require('jquery'),
        slick = require('slick'),
        Common = require('/js/common.js'),
        Nunjucks = require('nunjucks'),
        template = 'reviews.nunj.html';

    var emotions = {
        'happy': 'icon-emo-happy',
        'cry': 'icon-emo-cry',
        'shoot': 'icon-emo-shoot',
        'devil': 'icon-emo-devil',
        'cheers': 'icon-emo-cheers',
        'cool': 'icon-emo-cool',
        'surprised': 'icon-emo-surprised',
        'sad': 'icon-emo-sad',
        'funny': 'icon-emo-funny'
    };

    return Backbone.View.extend({

        initialize: function() {
        },

        events: function() {
            return {
            }
        },

        renderWithReviews: function(reviews, reactionsVoters) {
            var self = this;
            $.ajax({
                url: Common.getSecuredUrl('users', true),
                type: 'GET'
            }).done(function(users){
                var html = Nunjucks.render(template, {
                    reviews: self._reviewsInformationsFrom(reviews, users, reactionsVoters)
                });
                self.$el.html(html);
            }).fail(function(jqXHR, textStatus, errorThrown){
                console.log('Fail to get users');
            });

            return this;
        },

        _reviewsInformationsFrom: function(reviews, users, reactionsVoters) {
            return _.map(reviews, function(review) {
                var currentUser = _.find(users, function (user) {
                    return user.id == review.id;
                });
                var voter = _.find(reactionsVoters, function(user) {
                    return user.id == review.id;
                });
                var emotion = null;
                if (voter) {
                    emotion = emotions[voter.reaction];
                }
                if (currentUser) {
                    return {
                        name: currentUser.name || '[Nanashi]',
                        text: review.review,
                        emotion: emotion
                    }
                }
                return {
                    name: '[Nan]',
                    text: review.review,
                    emotion: emotion
                }
            });
        }
    });

});
