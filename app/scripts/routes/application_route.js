Ember4.ApplicationRoute = Ember.Route.extend({
    init: function() {
    	this._super();
    	console.log("application route");
    },
    
    beforeModel: function() {
        var self = this;
        
        auth = this.controllerFor('login');
        if(auth.get('isLoggedIn')) {
            console.log("auth controller claims user is logged in");
        } else {
            console.log("auth controller claims user is NOT logged in");
            self.transitionTo('/login');
        }
    }
});
