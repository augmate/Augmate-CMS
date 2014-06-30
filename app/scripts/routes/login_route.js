ProjectDingo.LoginRoute = Ember.Route.extend({
  model: function(params) {
    return Ember.Object.extend({
    	name: '',
    	password: ''
    });
  }
});
