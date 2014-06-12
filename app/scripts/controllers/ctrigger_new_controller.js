Ember4.CtriggerNewController = Ember.ObjectController.extend({

    actions: {
        onSubmit: function() {
            console.log("submitting new trigger");
        },
        
        onPrint: function() {
            console.log("printing trigger qrcode");
        },
        
        onCancel: function() {
            console.log("canceling trigger creation");
        }
    }
    
});

