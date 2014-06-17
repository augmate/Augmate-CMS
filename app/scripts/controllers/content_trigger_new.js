Ember4.AppsContentTriggerNewController = Ember.ObjectController.extend({

    actions: {
        onSubmit: function() {
            console.log("submitting new trigger");
            this.transitionToRoute("apps.content_trigger.index");
        },
        
        onPrint: function() {
            console.log("printing trigger qrcode");
        },
        
        onCancel: function() {
            console.log("canceling trigger creation");
            this.transitionToRoute("apps.content_trigger.index");
        }
    }
    
});

