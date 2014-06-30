var FirebaseApiUrl = 'https://scorching-fire-6278.firebaseio.com';
//var DedicatedHostedApiUrl = 'https://web.api.augmate.net/v1/mvp_1';

ProjectDingo.Firebase = new Firebase(FirebaseApiUrl);

ProjectDingo.ApplicationAdapter = DS.FirebaseAdapter.extend({
    firebase: ProjectDingo.Firebase
});

//ProjectDingo.ApplicationAdapter = DS.RESTAdapter.extend({
//    host: DedicatedHostedApiUrl,
//    corsWithCredentials: true
//});

//ProjectDingo.ApplicationAdapter = DS.RESTAdapter.extend({
//    firebase: ProjectDingo.Firebase
//});

//ProjectDingo.FirebaseAuth = Ember.Object.create({
//    
//    loginService: null,
//    callbacks: [],
//    subscribe: function(callback) {
//        this.callbacks.pushObject(callback);
//    },
//    
//    firebaseLoginCallback: function(error, user) {
//        console.log("FirebaseAuth::firebaseLoginCallback(); publishing Firebase Auth Callback");
//        this.callbacks.forEach(function(callback) { callback({ error: error, user: user }); });
//    },
//    
//    setup: function(app, callback) {
//        this.subscribe(callback);
//        console.info("FirebaseAuth::setup(); loginService = " + firebase);
//        
//        this.loginService = new FirebaseSimpleLogin(firebase, this.firebaseLoginCallback.bind(this));
//    }
//});

ProjectDingo.ApplicationSerializer = DS.FirebaseSerializer.extend();
