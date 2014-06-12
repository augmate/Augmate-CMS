Ember4.ContentTriggerViewController = Ember.ObjectController.extend({

    self: this,
    
    actions: {
        onSubmit: function() {
            console.log("updating existing trigger");
            this.transitionToRoute("content_trigger.index");
        },
        
        onPrint: function() {
            console.log("printing trigger qrcode");
        },
        
        onCancel: function() {
            console.log("canceling trigger update");
            this.transitionToRoute("content_trigger.index");
        }
    }
    
});

