Ember.AuthenticatedRoute = Ember.Route.extend({
    beforeModel: function(transition) {
        console.log("checking for session token..");
        
        if(this.session.isAuthenticated())
            // don't interrupt transition
            console.log('user is authenticated');
        else
            // user isn't authenticated, redirect to login
            this.redirectToLogin(transition);
    },
    redirectToLogin: function(transition) {
        var loginController = this.controllerFor('login');
        loginController.set('targetTransition', transition);
        this.transitionTo('login');
    }
})