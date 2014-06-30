ProjectDingo.AppsContentTriggerIndexRoute = Ember.AuthenticatedRoute.extend({
    model: function(params)  {
        console.log("AppsContentTriggerIndexRoute::model(); fetching model from store..");
        var models = this.store.findAll('ContentTrigger');
        console.dir(models);
        
        return models;
    }
});
