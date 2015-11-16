define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        _ = require('underscore'),
        Common = require('/js/common.js'),
        ReactionsModel = require('/js/reactions.model.js');

    return Backbone.Collection.extend({
        model: ReactionsModel,

        parse: function (data) {
            return data;
        },

        _update: function(reactions, callback) {
            var self = this;

            $.ajax({
                url: self.url,
                type:"PUT",
                data: JSON.stringify(reactions),
                contentType:"application/json; charset=utf-8",
                dataType:"json",
                success: function(data, textStatus, jqXHR) {
                    callback();
                }
            });
        },

        setReaction: function (newReaction, voterId, mediaId, callback) {
            var self = this;

            var reacts = this.toJSON();

            var currentMediaReactions = _.find(reacts, function (element) {
                return element.id == mediaId;
            });

            if (currentMediaReactions) {
                var currentVoter = _.find(currentMediaReactions.voters, function(element) {
                    return element.id = voterId;
                });

                if (currentVoter) {
                    if (currentVoter.reaction === newReaction) {
                        // Nothing
                    } else {
                        currentMediaReactions[currentVoter.reaction]--;
                        currentMediaReactions[newReaction]++;

                        currentVoter.reaction = newReaction;

                        self._update(reacts, callback);
                    }
                } else {
                    var voter = {
                        id: Common.VOTER_ID,
                        reaction: newReaction
                    };
                    currentMediaReactions.voters.push(voter);
                    currentMediaReactions[newReaction]++;

                    self._update(reacts, callback);
                }
            } else {
                var element = {
                    id: '' + mediaId,
                    voters: [
                        {
                            id: Common.VOTER_ID,
                            reaction: newReaction
                        }
                    ],
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
                element[newReaction]++;

                reacts.push(element);

                self._update(reacts, callback);
            }
        }
    });
});
