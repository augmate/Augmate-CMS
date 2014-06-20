Ember4.AppsContentTriggerViewRoute = Ember.AuthenticatedRoute.extend({
    
    // if opening the view-page for the first time,
    //   we get to fetch the model here
    // else if coming from an index page
    //   a cached version of the model is passed and this call is skipped
    model: function(params) {
        console.log("AppsContentTriggerViewRoute::model(); fetching content from api..");
        
        var model = Ember4.Trigger.create({});
        var self = this;

        this.api.setAccessToken(this.session.getSessionAccessToken());
        this.api.request('GET', 'v1/mvp_1/trigger/' + params.qrcode, {}).then(
            function onSuccess(data, status, xhr){

                model.setProperties({
                    qrcode: data.object._id,
                    title: data.object.title,
                    content: data.object.content_id.text
                });
                
            },
            function onFailure(xhr, status, err) {
                console.log("trigger-view fail:");
                console.dir(err);
            }
        );
        
//        // fetch data, generate model and qr-code
//        $.getJSON('content_trigger.json').then(function(data){
//            
//            model.setProperties({
//                qrcode: data.object._id,
//                title: data.object.title,
//                content: data.object.content_id.content_type
//            });
//            
//            console.log("updating controller with: " + data.object._id);
//            self.get('controller').set('qrcode_data', data.object._id);
//        });

        return model;
    },
    
    // always called after a model is assigned, regardless if it was cached
    afterModel: function(model, transition, queryParams) {
        console.log("AppsContentTriggerViewRoute::afterModel(); got model:");
        console.dir(model);

        analytics.track('View Content Trigger', {
            id: model.qrcode,
            title: model.title,
            action: 'view',
            target: 'Content Trigger'
        });
    }
});
