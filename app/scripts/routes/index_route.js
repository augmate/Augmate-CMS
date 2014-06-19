Ember4.IndexRoute = Ember.AuthenticatedRoute.extend({
    beforeModel: function() {
        this.transitionTo('apps');
    }
});

