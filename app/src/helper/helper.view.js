define(function (require) {

    'use strict';

    var Backbone = require('backbone');

    _.extend(Backbone.View.prototype, {
        showElementWithId: function (id) {
            var isHiddenClass = 'hide'; // Provient de Materialize
            var element = document.getElementById(id);
            element.classList.remove(isHiddenClass);
        },

        showTrailer: function () {
            this.showElementWithId('mediaTrailer');
        },
        showPreview: function () {
            this.showElementWithId('modalPreview');
        },


        toggleSection: function (element) {
            var isHiddenClass = 'is-hidden';
            if (element.hasClass(isHiddenClass)) {
                element.removeClass(isHiddenClass);
            } else {
                element.addClass(isHiddenClass);
            }
        },

        toggleMediaSectionParentOfElement: function(element) {
            var section = element.parents('.mediaSection');
            this.toggleSection(section);
        },

        hideMediaSectionForSmallScreen: function() {
            var hideMaxWidth = 900;
            var isHiddenClass = 'is-hidden';

            if (window.innerWidth < hideMaxWidth) {
                $('.mediaSection').addClass(isHiddenClass);
            }
        },

        changePageTitleWith: function(title) {
            if (!title) {
                document.title = 'ULaval Movie Ima by 300 UMI';
            } else {
                document.title = title + ' | ULaval Movie Ima by 300 UMI';
            }
        },

        shakeForErrorWithElement: function(element) {
            element.addClass('is-animation-shake');
            setTimeout(function() {
                element.removeClass('is-animation-shake');
            }, 1000);
        }
    });
});
