Ember4.ApplicationController = Ember.ObjectController.extend({

    sessionToken: null,
    isLoggedIn: Ember.computed.notEmpty('sessionToken'),
    
    currentTab: null,
    
    init: function() {
        this.set('sessionToken', "yey");
    }
});

