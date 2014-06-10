Ember4.LoginController = Ember.ObjectController.extend({
	loginUser: function() {
		var data = this.getProperties('username', 'password');

		console.dir(data);

		var encoded = btoa(data.username + ":" + data.password);
		console.log("encoded: " + encoded);

		// $.post('http://auth.api.augmate.net/token', data, function(result) {
		// 	console.dir(result);
		// });

		//return;

		$.ajax({
			type: 'POST',
			//crossDomain: true,
			url: 'http://localhost/api/token',
			//url: 'http://auth.api.augmate.net/token',
			beforeSend: function(req) {
				req.setRequestHeader('Authorization', 'Basic ' + encoded);
				req.setRequestHeader('Content-Type', 'application/json');
			},
			data: JSON.stringify({ grant_type: 'client_credentials' }),
			dataType: 'json',
			success: function(result) {
				console.log("got result:");
				console.dir(result);
				//router.transitionTo('index');
			}
		});
	}
});

