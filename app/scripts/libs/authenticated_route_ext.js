Ember.AuthenticatedRoute = Ember.Route.extend({
    beforeModel: function(transition) {
        console.log("AuthenticatedRoute::beforeModel(); checking for valid session");
        
        if(this.session.isAuthenticated())
            // don't interrupt transition
            console.log('AuthenticatedRoute::beforeModel(); user has a valid session and is authenticated!');
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