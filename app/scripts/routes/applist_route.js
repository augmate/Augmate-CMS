Ember4.AppListRoute = Ember.Route.extend({
  model: function(params) {
    return Ember.Object.extend({
    	apps: [
            { name: "Content Trigger" },
            { name: "Alerts (Coming Soon)" },
            { name: "Reference Library (Coming Soon)" },
        ]
    });
  }
});

