define(function (require) {

    'use strict';

    var Backbone = require('backbone'),
        ReactionsModel = require('/js/reactions.model.js');

    return Backbone.Collection.extend({
        model: ReactionsModel,

        parse: function (data) {
            return data;
        },

        setReaction: function (newReaction, voterId, mediaId, callback) {
            var self = this;

            var currentReactionsModel = this.find(function (model) {
                return model.get('id') == mediaId;
            });

            if (currentReactionsModel) {
                currentReactionsModel.addReaction(voterId, newReaction);
            } else {
                var newReactionsModel = new ReactionsModel({id: mediaId + ''});
                newReactionsModel.addReaction(voterId, newReaction);

                this.add(newReactionsModel);
            }
            self._update(callback);
        },

        setReview: function (newReview, voterId, mediaId, callback) {
            var self = this;

            var currentReactionsModel = this.find(function (model) {
                return model.get('id') == mediaId;
            });

            if (currentReactionsModel) {
                currentReactionsModel.addReview(voterId, newReview);
            } else {
                var newReactionsModel = new ReactionsModel({id: mediaId + ''});
                newReactionsModel.addReview(voterId, newReview);

                this.add(newReactionsModel);
            }
            self._update(callback);
        },

        _update: function(callback) {
            var self = this;

            $.ajax({
                url: self.url,
                type:"PUT",
                data: JSON.stringify(this.toJSON()),
                contentType:"application/json; charset=utf-8",
                dataType:"json",
                success: function(data, textStatus, jqXHR) {
                    callback();
                }
            });
        }
    });
});
