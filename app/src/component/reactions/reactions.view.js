define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        $ = require('jquery'),
        slick = require('slick'),
        Nunjucks = require('nunjucks'),
        Common = require('/js/common.js'),
        ReactionsModel = require('/js/reactions.model.js'),
        ReviewsView = require('/js/reviews.view.js'),
        reviewsElement = '.template-reviews',
        template = 'reactions.nunj.html';

    var xsmallSizeClass = 'xsmall',
        smallSizeClass = 'small',
        mediumSizeClass = 'medium',
        largeSizeClass = 'large',
        xlargeSizeClass = 'xlarge';

    var emotions = ['happy', 'cry', 'shoot', 'devil', 'cheers',
        'cool', 'surprised', 'sad', 'funny'];

    var activeClass = 'is-active';

    return Backbone.View.extend({

        initialize: function() {
            this.mediaId = undefined;

            this.reviewsView = new ReviewsView({
                el: $(reviewsElement)
            });
        },

        events: function() {
            return {
                'click .reactions .reaction': 'chooseReaction'
            }
        },

        render: function () {
            var html = Nunjucks.render(template, {
                reactions: this.collection
            });
            this.$el.html(html);

            return this;
        },

        renderWithId: function(id) {
            var self = this;

            this.mediaId = id;

            var reactions = _.find(this.collection.toJSON(), function(element) {
                return element.id == id;
            });

            if (!reactions) {
                reactions = new ReactionsModel().toJSON();
            }

            var reviews = [
                {
                    id: '563d646d9b95510300ec5aac',
                    review: 'Donec ullamcorper nulla non metus auctor fringilla. Aenean lacinia bibendum nulla sed consectetur. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Aenean lacinia bibendum nulla sed consectetur. Maecenas faucibus mollis interdum. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nulla vitae elit libero, a pharetra augue. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Cras mattis consectetur purus sit amet fermentum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
                },{
                    id: '566626adfb78d703008dd92f',
                    review: 'Sugoi'
                }
            ];

            var html = Nunjucks.render(template, {
                reactions: self._percentagesFrom(reactions),
                reviewsNumber: reviews.length//reactions.reviews.length
            });
            this.$el.html(html);

            this.reviewsView.renderWithReviews(reviews, reactions.voters);//reactions.reviews);

            var voter = _.find(reactions.voters, function(element) {
                return element.id == self._getCurrentUserId();
            });

            if (voter) {
                var button = $('.reactions .reaction[data-content=' + voter.reaction + ']');
                this._activateButton(button);
            }
        },

        chooseReaction: function(event) {
            var self = this;

            var button = $(event.currentTarget);
            self._activateButton(button);

            self.collection.fetch({
                success: function(currentReactions) {
                    currentReactions.setReaction(button.attr('data-content'), self._getCurrentUserId(), self.mediaId, function() {
                        self.collection.fetch({
                            success: function() {
                                self.renderWithId(self.mediaId);
                            }
                        });
                    });
                }
            });
        },

        _activateButton: function(button) {
            $('.reactions .reaction').removeClass(activeClass);
            button.addClass(activeClass);
        },

        _percentagesFrom: function(reactions) {
            var total = 0;
            var result = [];

            for (var emo in emotions) {
                total += reactions[emotions[emo]];
            }

            for (var em in emotions) {
                var element = {};

                if (total < 1) {
                    element.percentage = 0;
                } else {
                    element.percentage = Math.round(reactions[emotions[em]] * 100 / total);
                }
                element.percentageSize = this._percentageSizeFrom(element.percentage);
                result[emotions[em]] = element;
            }

            return result;
        },

        _percentageSizeFrom: function(percentage) {
            if (percentage < 5) {
                return xsmallSizeClass;
            } else if (percentage < 15) {
                return smallSizeClass;
            } else if (percentage < 27) {
                return mediumSizeClass;
            } else if (percentage < 41) {
                return largeSizeClass;
            } else {
                return xlargeSizeClass;
            }
        },

        _getCurrentUserId: function() {
            return $.cookie(Common.CURRENT_USER_ID) || '';
        }
    });

});
