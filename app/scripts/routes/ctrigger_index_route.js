Ember4.AppsContentTriggerIndexRoute = Ember.AuthenticatedRoute.extend({

    model: function(params) {
        var models = Ember.A();

        var start = (new Date).getTime();
        
        this.api.request('GET', 'v1/mvp_1/trigger/list', {}).then(
            function onSuccess(data, status, xhr){
                
                data.list.forEach(function(item) {
                    var model = Ember4.Trigger.create({});

                    model.setProperties({
                        qrcode: item._id,
                        title: item.title,
                        content: item.content_id.text
                    });

                    models.pushObject(model);
                });

                var stop = (new Date).getTime();
                var span = stop - start;
                
                console.log("AppsContentTriggerIndexRoute::model(); fetched content trigger list: " + span + " msec");
                console.dir(models);

                analytics.track('List Content Triggers', {
                    action: 'list',
                    target: 'Content Trigger'
                });
            },
            function onFailure(xhr, status, err) {
                console.log("trigger-list fail:");
                console.dir(err);
            }
        );

        return models;
    }
});
