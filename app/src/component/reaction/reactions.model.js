define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        _ = require('underscore'),
        Common = require('/js/common.js');

    return Backbone.Model.extend({
        defaults: function() {
            return {
                id: undefined,
                voters: [],
                happy: 0,
                cry: 0,
                shoot: 0,
                devil: 0,
                cheers: 0,
                cool: 0,
                surprised: 0,
                sad: 0,
                funny: 0
            }
        },

        parse : function(data) {
            return data;
        },

        addReaction: function(userId, reaction) {
            var currentUser = _.find(this.get('voters'), function (element) {
                return element.id == userId;
            });

            if (currentUser) {
                if (reaction == currentUser.reaction) {
                    return;
                }

                this._decrementReaction(currentUser.reaction);
                this._incrementReaction(reaction);
                currentUser.reaction = reaction;
            } else {
                var tempUser = {
                    id: userId,
                    reaction: reaction
                };
                this._incrementReaction(reaction);
                this.get('voters').push(tempUser);
            }
        },

        _incrementReaction: function(reaction) {
            this.set(reaction, this.get(reaction) + 1);
        },

        _decrementReaction: function(reaction) {
            this.set(reaction, this.get(reaction) - 1);
        }
    });
});
