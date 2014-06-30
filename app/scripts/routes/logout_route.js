ProjectDingo.LogoutRoute = Ember.Route.extend({
    beforeModel: function (transition) {
        console.log("LogoutRoute::beforeModel(); destroying auth session..");

        this.session.onLogout();
        ProjectDingo.Firebase.unauth();
        
        //this.session.resetSession();
        //this.session.refresh();
        this.transitionTo('login');
    }
});