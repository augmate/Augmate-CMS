ProjectDingo.ApplicationController = Ember.ObjectController.extend({
    
    notifications: [],
    
    notify: function(type, message) {
        var notification = Ember.Object.create({
            type: type,
            message: message
        });
        
        this.get('notifications').pushObject(notification);
    },
    
    // pass currentPath on to App
    updateCurrentController: function() {
        ProjectDingo.set('currentPath', this.get('currentPath'));
    }.observes('currentPath')
});

