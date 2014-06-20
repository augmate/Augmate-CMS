Ember4.AppsContentTriggerNewRoute = Ember.AuthenticatedRoute.extend({
    model: function(params) {
        return Ember.Object.extend({
            
        });
    },
    
    afterModel: function(model, transition, queryParams) {
        analytics.track('Creating Content Trigger', {
            action: 'creating',
            target: 'Content Trigger'
        });
    }
});

