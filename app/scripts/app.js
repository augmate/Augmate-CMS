var ProjectDingo = window.ProjectDingo = Ember.Application.create({
    LOG_TRANSITIONS: true,
    //LOG_TRANSITIONS_INTERNAL: true,
    //LOG_VIEW_LOOKUPS: true,
    //LOG_ACTIVE_GENERATION: true
    
    currentPath: '',
    
    ready: function() {
        console.log("ProjectDingo::ready(); setting up Auth and API..");
        Ember.Session.setup(ProjectDingo, {});
        
        //Ember.AugmateAPI.setup(ProjectDingo);
        //Ember.Session.refresh();
        
//        ProjectDingo.deferReadiness();
//
//        // if user is already authenticated, we can auth the loginService-api right here and now using cached data
//        // without touching loginService-auth process
//        if(Ember.Session.isAuthenticated()) {
//            var access_token = Ember.Session.getSessionAccessToken();
//            console.log("Attempting auth using key: " + access_token);
//            ProjectDingo.Firebase.auth(access_token, function(error, result) {
//                console.log("Firebase::auth(); callback returned:");
//                console.dir(error);
//                console.dir(result);
//            }, function() {
//                console.log("Firebase::auth(); callback canceled!");
//            });
//
//            ProjectDingo.advanceReadiness();
//        } else {
//            // kickoff loginService's auth (this will hit their server and create a cached auth-key in browser)
//            Ember.FirebaseAuth.setup(ProjectDingo, Ember.Session.firebaseAuthCallback.bind(Ember.Session));
//        }
    }
});

require('scripts/libs/*');
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/components/*');
require('scripts/views/*');
require('scripts/router');
