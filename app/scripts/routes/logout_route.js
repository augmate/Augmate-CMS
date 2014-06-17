Ember4.LogoutRoute = Ember.Route.extend({
    beforeModel: function (transition) {
        console.log("destroying auth session");
        this.session.resetSession();
        this.transitionTo('login');
    }
});