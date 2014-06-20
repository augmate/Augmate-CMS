Ember4.AppsContentTriggerViewController = Ember.ObjectController.extend({

    self: this,
    qrcode_data: null,
    
    actions: {
        onSubmit: function() {
            console.log("updating existing trigger");
            
            // grab current DM
            var model = this.get('model');
            
            // push update
            this.get('api').request('PUT', '/v1/mvp_1/trigger/' + model.qrcode, {
                title: model.title,
                content_text: model.content
            });

            analytics.track('Updated Content Trigger', {
                id: this.get('model').qrcode,
                title: this.get('model').title,
                action: 'update',
                target: 'Content Trigger'
            });
            
            this.transitionToRoute("apps.content_trigger.index");
        },
        
        onPrint: function() {
            console.log("printing trigger qrcode");
            analytics.track('Printed Content Trigger', {
                id: this.get('model').qrcode,
                title: this.get('model').title,
                action: 'print',
                target: 'Content Trigger'
            });
            window.print();
        },
        
        onCancel: function() {
            console.log("canceling trigger update");
            analytics.track('Cancel-Update Content Trigger', {
                id: this.get('model').qrcode,
                title: this.get('model').title,
                action: 'cancel-update',
                target: 'Content Trigger'
            });
            this.transitionToRoute("apps.content_trigger.index");
        },

        onDelete: function() {
            console.log("deleting trigger");
            var model = this.get('model');
            this.get('api').request('DELETE', '/v1/mvp_1/trigger/' + model.qrcode, {});

            analytics.track('Deleted Content Trigger', {
                id: this.get('model').qrcode,
                title: this.get('model').title,
                action: 'delete',
                target: 'Content Trigger'
            });
            this.transitionToRoute("apps.content_trigger.index");
        }
    }
    
});
