// voir http://coenraets.org/blog/2013/06/building-modular-web-applications-with-backbone-js-and-requirejs-sample-app/

require.config({

    baseUrl: '/js/',

    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'backbone'
        },
        nunjucks: {
            exports: 'nunjucks'
        }
    },

    paths: {
        backbone: 'lib/backbone',
        jquery: 'lib/jquery',
        materialize: 'lib/materialize',
        nunjucks: 'lib/nunjucks-slim',
        slick: 'lib/slick',
        underscore: 'lib/lodash' // superset of underscore with more updates
    }
});

require(['jquery', 'underscore', 'backbone', 'router'], function ($, _, Backbone, Router) {
    var router = new Router();

    router.on('route', function() {
        $(document).scrollTop(0);
    });

    Backbone.history.start({
        pushState: true,
        root: '/'
    });

    // Correction : évite l'utilisation de #/new (etc)
    // de http://artsy.github.io/blog/2012/06/25/replacing-hashbang-routes-with-pushstate/
    $(document).on('click', 'a[href^=\'/\']', function (event) {
        var href, passThrough, url;
        href = $(event.currentTarget).attr('href');
        passThrough = href.indexOf('sign_out') >= 0;
        if (!passThrough && !event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
            event.preventDefault();
            url = href.replace(/^\//, '').replace('\#\!\/', '');
            router.navigate(url, {
                trigger: true
            });
            return false;
        }
    });

    _.extend(Backbone.View.prototype, {
        showElementWithId: function (id) {
            var isHiddenClass = 'hide'; // Provient de Materialize
            var element = document.getElementById(id);
            element.classList.remove(isHiddenClass);
        },

        showTrailer: function () {
            this.showElementWithId('mediaTrailer');
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
        }
    });
});

