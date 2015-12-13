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

        initialize: function(options) {
            this.setReviewCallback = options.setReviewCallback;

            this.currentUserReview = '';
        },

        events: function() {
            return {
                'click .reviewsActions--button.createButton': 'createReview',
                'click .reviewsActions--button.editButton': 'editReview',
                'click #reviewModal .applyButton': 'submitReview'
            }
        },

        renderWithReviews: function(reviews, reactionsVoters) {
            var self = this;

            $.ajax({
                url: Common.getSecuredUrl('users', true),
                type: 'GET'
            }).done(function(users){
                var reviewer = _.find(reviews, function(element) {
                    return element.id == self._getCurrentUserId();
                });

                self.currentUserReview = '';
                var isAlreadyReview = false;
                if (reviewer) {
                    isAlreadyReview = true;
                    self.currentUserReview = reviewer.text;
                }

                var html = Nunjucks.render(template, {
                    reviews: self._reviewsInformationsFrom(reviews, users, reactionsVoters),
                    isAlreadyReview: isAlreadyReview
                });
                self.$el.html(html);
            }).fail(function(jqXHR, textStatus, errorThrown){
                console.log('Fail to get users');
            });

            return this;
        },

        createReview: function() {
            $('#reviewModal .modal--title').text('Write a New Review');
            $('#reviewModal').openModal();
            $('#reviewModal #review_text').focus();
        },

        editReview: function(event) {
            var self = this;

            $('#reviewModal .modal--title').text('Edit your Review');

            $('#reviewModal #review_text').val(self.currentUserReview);

            $('#reviewModal').openModal();
            $('#reviewModal #review_text').focus();
        },

        submitReview: function() {
            var self = this;

            var review = $('#reviewModal #review_text').val().trim();

            if (review.length > 0) {
                $('#reviewModal .input-field .error-message').hide();
                $('#reviewModal .input-field textarea').removeClass('invalid');

                $('#reviewModal').closeModal();
                self.setReviewCallback(review);
            } else {
                $('#reviewModal .input-field .error-message').text('Invalid review. Choose a smarter one.').fadeIn(300);
                $('#reviewModal .input-field textarea').addClass('invalid');
                self.shakeForErrorWithElement($('#reviewModal'));
            }
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
                        text: review.text,
                        emotion: emotion
                    }
                }
                return {
                    name: '[Nan]',
                    text: review.text,
                    emotion: emotion
                }
            });
        },

        _getCurrentUserId: function() {
            return $.cookie(Common.CURRENT_USER_ID) || '';
        }
    });

});
