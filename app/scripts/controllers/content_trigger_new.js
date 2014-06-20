Ember4.AppsContentTriggerNewController = Ember.ObjectController.extend({

    actions: {
        onSubmit: function() {
            console.log("submitting new trigger");
            var self = this;

            // grab current DM
            var model = this.get('model');

            // push update
            this.get('api').request('PUT', '/v1/mvp_1/trigger/create', {
                title: model.title,
                content_text: model.content
            }).then(function onSuccess(data){
                console.log("created trigger:");
                console.dir(data);

                analytics.track('Created Content Trigger', {
                    id: model.qrcode,
                    title: model.title,
                    action: 'created',
                    target: 'Content Trigger'
                });
                
                var newId = data.object._id;
                self.transitionToRoute("apps.content_trigger.view", newId);
            });
            
            this.transitionToRoute("apps.content_trigger.index");
        },
        
        onCancel: function() {
            console.log("canceling trigger creation");
            this.transitionToRoute("apps.content_trigger.index");
        }
    }
    
});

