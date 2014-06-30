ProjectDingo.AppsContentTriggerNewController = Ember.ObjectController.extend({

    actions: {
        onSubmit: function() {
            console.log("submitting new trigger");

            var start = (new Date).getTime();
            
            var content_trigger = this.store.createRecord('ContentTrigger', {
                title: this.get('model.title'),
                content: this.get('model.content')
            }).save();
            
            

            var stop = (new Date).getTime();
            console.log("AppsContentTriggerNewController::onSubmit(); creating content trigger took: " + (stop - start) + " msec");
            
            this.transitionToRoute("apps.content_trigger.view", content_trigger);
        },
        
        onCancel: function() {
            console.log("canceling trigger creation");
            this.transitionToRoute("apps.content_trigger.index");
        }
    }
    
});

