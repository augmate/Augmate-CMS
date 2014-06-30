ProjectDingo.AppsContentTriggerViewRoute = Ember.AuthenticatedRoute.extend({
    
    // if opening the view-page for the first time,
    //   we get to fetch the model here
    // else if coming from an index page
    //   a cached version of the model is passed and this call is skipped
    model: function(params) {
        console.log("AppsContentTriggerViewRoute::model(); fetching content from api..");

        var start = (new Date).getTime();
        
        
        var model = this.store.find('ContentTrigger', params.qrcode);
        
        
        var stop = (new Date).getTime();
        var span = stop - start;

        console.log("AppsContentTriggerViewRoute::model(); fetched content trigger: " + span + " msec");
        return model;
    },
    
    // always called after a model is assigned, regardless if it was cached
    afterModel: function(model, transition, queryParams) {
        //console.log("AppsContentTriggerViewRoute::afterModel(); got model:");
        //console.dir(model);

        window.analytics.track('View Content Trigger', {
            id: model.qrcode,
            title: model.title,
            action: 'view',
            target: 'Content Trigger'
        });
    }
});
