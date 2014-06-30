ProjectDingo.LoginController = Ember.ObjectController.extend({

    targetTransition: null,
    defaultTransitionAfterLogin: 'apps',

    loginErrors: [],
    
    notify: function(type, message) {
        this.loginErrors.pushObject(Ember.Object.create({
            type: type,
            message: message
        }));
    },

    
    init: function () {
        this._super();
        
        console.log('subscribing login controller..');
        //Ember.FirebaseAuth.subscribe(this.loginResult.bind(this));
    },
    
    loginResult: function(error, user) {
        console.log("LoginController::loginResult()");
        
        if(error)
            console.dir(error);
        
        if(user) {
            console.dir(user);
            
            this.session.onLogin(user);
            
            // got an authenticated user
            // set API access token
            //this.api.setAccessToken(this.session.getSessionAccessToken());
            
            var requestedTransition = this.get('targetTransition');
            
            // transition to default route, or a requested route
            if(requestedTransition != null) {
                this.set('targetTransition', null);
                console.log("redirecting to attempted transition: " + requestedTransition)
                requestedTransition.retry();
            } else
            {
                console.log("no redirect requested, transitioning to default route");
                this.transitionToRoute(this.defaultTransitionAfterLogin);
            }
        }
    },

    actions: {
        
        loginUser: function() {
            var form = this.getProperties('username', 'password');

            // subscribe to result
            //ProjectDingo.FirebaseAuth.subscribe(this.loginResult);

            // subscribe & kick-off login request
            new FirebaseSimpleLogin(ProjectDingo.Firebase, this.loginResult.bind(this))
            .login('password', {
                email: form.username,
                password: form.password,
                rememberMe: true
            });
        },
        
        loginUserOld: function () {
            var data = this.getProperties('username', 'password');
            console.dir(data);

            var encoded = btoa(data.username + ":" + data.password);
            console.log("encoded: " + encoded);

            var requestedTransition = this.get('targetTransition');
            var self = this;

            $.ajax({
                type: 'POST',
                url: 'https://auth.api.augmate.com/token',
                beforeSend: function (req) {
                    req.setRequestHeader('Authorization', 'Basic ' + encoded);
                },
                data: { grant_type: 'client_credentials' },
                dataType: 'json'
            }).then(
                function onAuthSuccess(result) {
                    console.log("authed and got result:");
                    console.dir(result);
                    
                    // create new session
                    self.session.createSession(result.access_token);
                    self.session.refresh();
                    
                    // auth API
                    self.api.setAccessToken(self.session.getSessionAccessToken());
                    
                    // transition
                    if(requestedTransition != null) {
                        self.set('targetTransition', null);
                        console.log("redirecting to attempted transition: " + requestedTransition)
                        requestedTransition.retry();
                    } else
                    {
                        console.log("no redirect requested, transitioning to default route");
                        self.transitionToRoute(self.defaultTransitionAfterLogin);
                    }
                },
                function onAuthFailure(result) {
                    console.log("auth failed");
                }
            );
        }
    }
});

