// $.ajaxSetup({
//   crossDomain: true,
//   xhrFields: {
//     withCredentials: true
//   }
// });

var Ember4 = window.Ember4 = Ember.Application.create({
    LOG_TRANSITIONS: true,
    //LOG_TRANSITIONS_INTERNAL: true,
    //LOG_VIEW_LOOKUPS: true,
    //LOG_ACTIVE_GENERATION: true
});

/* Order and include as you please. */
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/components/*');
require('scripts/views/*');
require('scripts/router');
