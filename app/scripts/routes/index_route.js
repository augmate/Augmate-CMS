ProjectDingo.IndexRoute = Ember.AuthenticatedRoute.extend({
    beforeModel: function() {
        this.transitionTo('apps');
    }
});

