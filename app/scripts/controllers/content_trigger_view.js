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
            
            this.transitionToRoute("apps.content_trigger.index");
        },
        
        onPrint: function() {
            console.log("printing trigger qrcode");
            window.print();
        },
        
        onCancel: function() {
            console.log("canceling trigger update");
            this.transitionToRoute("apps.content_trigger.index");
        },

        onDelete: function() {
            console.log("deleting trigger");

            var model = this.get('model');
            this.get('api').request('DELETE', '/v1/mvp_1/trigger/' + model.qrcode, {});
            this.transitionToRoute("apps.content_trigger.index");
        }
    }
    
});
