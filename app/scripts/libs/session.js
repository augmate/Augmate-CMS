Ember.Session = Ember.Object.create({
    
    save: function(key, value) {
      localStorage.setItem(key, value);  
    },
    
    load: function(key) {
        return localStorage.getItem(key) || {};
    },
    
    createSession: function(access_token) {
        this.save('access_token', access_token);
    },
    
    // force logout
    resetSession: function() {
        localStorage.removeItem('access_token');
    },
    
    getSessionAccessToken: function() {
        return this.load('access_token');
    },
    
    isAuthenticated: function() {
        return localStorage.getItem('access_token') != null;
    },
    
    setup: function(app, options) {
        
        options = options || {};

        app.register('session:current', this, { instantiate: false, singleton: true });
        
        Ember.A(['model', 'controller', 'view', 'route', 'component']).forEach(function(component){
            Ember4.inject(component, 'session', 'session:current');
        });
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
        
        console.log("API Request: " + type + " " + url);
        
        return $.ajax({
            type: type,
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
            Ember4.inject(component, 'api', 'api:data');
        });
    }
});