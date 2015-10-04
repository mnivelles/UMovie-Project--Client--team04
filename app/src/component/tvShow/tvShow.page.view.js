define(function (require) {

    "use strict";

    var template = 'tvShow.page.nunj.html';

    return Backbone.View.extend({

        render: function () {
            var html = nunjucks.render(template, {});
            this.$el.html(html);

            //console.log(this.model.attributes);
            /*this.model.episodes.fetch({
                success: function (data) {
                    if (data.length === 0) {
                        //$('.no-reports').show();
                        console.log('no-report');
                    }
                }
            });*/

            //var listView = new EmployeeListView({collection: this.model.reports, el: $('.report-list', this.el)});
            //listView.render();
            return this;
        }
    });

});
