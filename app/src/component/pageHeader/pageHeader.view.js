define(function (require) {

    "use strict";

    return Backbone.View.extend({

        el: '.pageHeader',

        events: {
            'click .pageMenu--searchButton': 'toggleSearch'/*,
            'dblclick label':	'edit',
            'click .destroy':	'clear',
            'keypress .edit':	'updateOnEnter',
            'keydown .edit':	'revertOnEscape',
            'blur .edit':		'close'*/
        },

        initialize: function () {
        },

        render: function () {
            return this;
        },

        toggleSearch: function() {
            console.log('ToggleSearch');

            var activeClass = 'is-active';
            var hiddenClass = 'is-hidden';
            var searchButton = $('.pageMenu--searchButton').eq(0);
            var search = $('.search').eq(0);

            if (searchButton.hasClass(activeClass)) {
                searchButton.removeClass(activeClass);
                search.slideUp(500).addClass(hiddenClass);
            } else {
                searchButton.addClass(activeClass);
                search.slideDown(1200).removeClass(hiddenClass);
            }
        }
    });

});
