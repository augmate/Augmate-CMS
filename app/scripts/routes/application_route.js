Ember4.ApplicationRoute = Ember.Route.extend({
    init: function() {
    	this._super();
    	
        console.log("ApplicationRoute::init(); checking session auth..");

        // authenticate with API at startup
        // this also happens at login/logout
        if(this.session.isAuthenticated())
            this.api.setAccessToken(this.session.getSessionAccessToken());
    },
    
    beforeModel: function() {
        var self = this;
    },
    
    actions: {
//        error: function(error) {
//            console.log("-------------------------------------------------");
//            console.log("Ember caught error:");
//            console.warn(error);
//            console.log("-------------------------------------------------");
//        }
    }
});
