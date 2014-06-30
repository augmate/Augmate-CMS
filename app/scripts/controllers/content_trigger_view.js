ProjectDingo.AppsContentTriggerViewController = Ember.ObjectController.extend({

    self: this,
    
    actions: {
        onSubmit: function() {

            this.get('model').save();

            analytics.track('Updated Content Trigger', {
                id: this.get('model').qrcode,
                title: this.get('model').title,
                action: 'update',
                target: 'Content Trigger'
            });
            
            this.transitionToRoute("apps.content_trigger.index");
        },
        
        onPrint: function() {
            analytics.track('Printed Content Trigger', {
                id: this.get('model').qrcode,
                title: this.get('model').title,
                action: 'print',
                target: 'Content Trigger'
            });
            window.print();
        },
        
        onCancel: function() {
            analytics.track('Cancel-Update Content Trigger', {
                id: this.get('model').qrcode,
                title: this.get('model').title,
                action: 'cancel-update',
                target: 'Content Trigger'
            });
            this.transitionToRoute("apps.content_trigger.index");
        },

        onDelete: function() {
            console.log("AppsContentTriggerViewController::onDelete(); deleting content trigger");
            
            var model = this.get('model');
            model.deleteRecord();
            model.save();
            
            this.transitionToRoute("apps.content_trigger.index");
        }
    }
    
});
