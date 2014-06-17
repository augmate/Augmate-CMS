var Ember4 = window.Ember4 = Ember.Application.create({
    LOG_TRANSITIONS: true,
    //LOG_TRANSITIONS_INTERNAL: true,
    //LOG_VIEW_LOOKUPS: true,
    //LOG_ACTIVE_GENERATION: true
});

Ember4.ApplicationAdapter = DS.RESTAdapter.extend({
    namespace: 'v1/mvp_1',
    host: 'https://data.api.augmate.net'
});

Ember4.ApplicationStore = DS.Store.extend({
    adapter: Ember4.ApplicationAdapter
});

require('scripts/libs/*');

// init libs
Ember.Session.setup(Ember4, {});
Ember.AugmateAPI.setup(Ember4);

// the rest
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/components/*');
require('scripts/views/*');
require('scripts/router');
