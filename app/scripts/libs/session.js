/**
 * User Session helper for Ember
 * Integrated with Firebase's User Management
 * Provides oauth access_token for Firebase API access
 */
Ember.Session = Ember.Object.create({

    /**
     * public facing property that everyone should listen to
     * it's updated when user is logged in or logged out
     */
    haveAuthenticatedSession: false,

    /**
     * Wraps browser-storage save()
     * @param key
     * @param value
     */
    save: function(key, value) {
      localStorage.setItem(key, value);  
    },

    /**
     * Wraps browser-storage load()
     * @param key
     * @returns {*|null} null if key not set
     */
    load: function(key) {
        return localStorage.getItem(key) || {};
    },

    /**
     * if user is logged in, this returns the oauth key, else NULL
     * @returns {string|null} oauth token user can use for the API
     */
    getSessionAccessToken: function() {
        return this.load('access_token');
    },

    /**
     * Helper that tells you if user is authenticated
     * @returns {boolean} true if authed
     */
    isAuthenticated: function() {
        return localStorage.getItem('access_token') != null;
    },

    /**
     * DEFUNC - this shouldn't be necessary
     * checks if user is authenticated, updates publicly listened to signal
     */
    refresh: function() {
        if(this.isAuthenticated()) {
            this.set('haveAuthenticatedSession', true);
        } else {
            this.set('haveAuthenticatedSession', false);
        }
    },

    /**
     * Called upon auth to create user session. Signal all listeners of logon event.
     * @param user an object from Firebase with user's oauth key, id, email, etc
     */
    onLogin: function(user) {
        console.log('Session::onLogin(); Firebase confirmed user session.');

        this.save('access_token', user.firebaseAuthToken);
        this.save('user', user);

        analytics.identify(user.id, {
            email   : user.email
        });

        analytics.track('Logged In', {});
        
        // raise signal logon
        this.set('haveAuthenticatedSession', true);
    },

    /**
     * Destroy user session. Signal all listeners of logoff event.
     */
    onLogout: function() {
        console.log('Session::onLogout();');

        localStorage.removeItem('access_token');
        analytics.track('Logged Out', {});
        analytics.identify();

        // raise signal of logoff
        this.set('haveAuthenticatedSession', false);
    },

    /**
     * Firebase callback that gets fired after:
     *   - current browser's localStorage/cookies are evaluated and a valid user-auth is found
     *   - user attempts login
     *   - user logs out
     * @param result may contain an error and/or user object
     */
    firebaseAuthCallback: function(result) {
        console.dir(result);

        if(result.error)
        {   // have an error, reset current login state
            console.log('Session::firebaseAuthCallback(); error: ' + result.error.code + ' : ' + result.error.message);
            
            if(result.error.code == 'INVALID_PASSWORD' || result.error.code == 'INVALID_USER') {
                console.dir(ProjectDingo.get('controller:current'));
            }
            
            this.onLogout();
        }
        else if(result.user)
        {   // user is authed
            console.log('Session::firebaseAuthCallback(); email: ' + result.user.email + ' firebaseAuthToken: ' + result.user.firebaseAuthToken);
            this.onLogin(result.user);
        }
        else {
            // no error, no user session, trash any existing session
            this.onLogout();
        }

        // broadcast auth callback to anyone listening
        this.authCallbacks.forEach(function(callback) { callback(result); });
    },

    /**
     * Register this Session Singleton with Ember's current Application
     * @param app
     * @param options
     */
    setup: function(app, options) {
        options = options || {};
        
        app.register('session:current', this, { instantiate: false, singleton: true });
        
        ['model', 'controller', 'view', 'route', 'component'].forEach(function(component){
            ProjectDingo.inject(component, 'session', 'session:current');
        });
        
        // refreshing login state lets us use cached local session data to show the proper app state
        // right away without waiting for a web request to return
        this.refresh();
    },

    authCallbacks: [],
    subscribeToAuth: function(callback) {
        this.authCallbacks.pushObject(callback);
    },

    firebaseLoginCallback: function(error, user) {
        console.log("FirebaseAuth::firebaseLoginCallback(); publishing Firebase Auth Callback");
        this.authCallbacks.forEach(function(callback) { callback({ error: error, user: user }); });
    }
});

Ember.AugmateAPI = Ember.Object.create({
    
    setAccessToken: function(access_token) {
        this.set('access_token', access_token);
    },

    /**
     * start an ajax request and return to caller for chaining
     * @param type 'POST', 'GET', etc
     * @param path relative path in api
     * @param data json object
     * @returns {*}
     */
    request: function(type, path, data) {
        
        var access_token = this.get('access_token');
        var url = 'https://web.api.augmate.com/' + path;
        
        console.log("AugmateAPI::request(); API Request: " + type + " " + url);
        
        return $.ajax({
            type: type,
            cache: false,
            url: url,
            beforeSend: function (req) {
                req.setRequestHeader('Authorization', 'Bearer ' + access_token);
            },
            data: data,
            dataType: 'json'
        });
    },

    setup: function(app, options) {
        options = options || {};
        app.register('api:data', this, { instantiate: false, singleton: true });

        Ember.A(['model', 'controller', 'view', 'route', 'component']).forEach(function(component){
            app.inject(component, 'api', 'api:data');
        });
    }
});