define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        $ = require('jquery'),
        slick = require('slick'),
        Nunjucks = require('nunjucks'),
        template = 'reactions.nunj.html';

    var xsmallSizeClass = 'xsmall',
        smallSizeClass = 'small',
        mediumSizeClass = 'medium',
        largeSizeClass = 'large',
        xlargeSizeClass = 'xlarge';

    return Backbone.View.extend({

        initialize: function() {

        },

        render: function () {
            var html = Nunjucks.render(template, {
                reactions: this.collection
            });
            this.$el.html(html);

            return this;
        },

        renderWithId: function(id) {
            var reactions = _.find(this.collection.toJSON(), function(element) {
                return element.id == id;
            });

            if (!reactions) {
                reactions = {
                    happy: 0,
                    cry: 0,
                    shoot: 0,
                    devil: 0,
                    cheers: 0,
                    cool: 0,
                    surprised: 0,
                    sad: 0,
                    funny: 0
                };
            }

            var html = Nunjucks.render(template, {
                reactions: this._percentagesFrom(reactions)
            });
            this.$el.html(html);
        },

        _percentagesFrom: function(reactions) {
            var emos = ['happy', 'cry', 'shoot', 'devil', 'cheers',
            'cool', 'surprised', 'sad', 'funny'];
            var total = 0;
            var result = [];

            for (var emo in emos) {
                total += reactions[emos[emo]];
            }

            for (var em in emos) {
                var element = {};

                if (total < 1) {
                    element.percentage = 0;
                } else {
                    element.percentage = Math.round(reactions[emos[em]] * 100 / total);
                }
                element.percentageSize = this._percentageSizeFrom(element.percentage);
                result[emos[em]] = element;
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
        }

    });

});
