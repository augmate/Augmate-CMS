// $.ajaxSetup({
//   crossDomain: true,
//   xhrFields: {
//     withCredentials: true
//   }
// });

var Ember4 = window.Ember4 = Ember.Application.create();

/* Order and include as you please. */
require('scripts/controllers/*');
require('scripts/store');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/components/*');
require('scripts/views/*');
require('scripts/router');
