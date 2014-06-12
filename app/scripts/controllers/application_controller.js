Ember4.ApplicationController = Ember.ObjectController.extend({

    sessionToken: null,
    isLoggedIn: Ember.computed.notEmpty('sessionToken'),
    
    init: function() {
        this.set('sessionToken', "yey");
    }
});

