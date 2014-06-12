Ember4.LoginController = Ember.ObjectController.extend({

    sessionToken: null,
    isLoggedIn: Ember.computed.notEmpty('sessionToken'),
    
    init: function() {
        this.set('sessionToken', "yey");
    },
    
    actions: {
        loginUser: function () {
            var data = this.getProperties('username', 'password');
            console.dir(data);

            var encoded = btoa(data.username + ":" + data.password);
            console.log("encoded: " + encoded);

            var that = this;

            var authRequest = $.ajax({
                type: 'POST',
                url: 'https://auth.api.augmate.com/token',
                beforeSend: function (req) {
                    req.setRequestHeader('Authorization', 'Basic ' + encoded);
                },
                data: { grant_type: 'client_credentials' },
                dataType: 'json'
            });
            
            authRequest.then(function (result) {
                    console.log("then:");
                    console.dir(result);
                    that.transitionToRoute('applist');
            });
        }
    }
});

