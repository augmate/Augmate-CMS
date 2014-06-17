//Ember4.ApplicationAdapter = DS.FixtureAdapter;

Ember4.ApplicationAdapter = DS.RESTAdapter.extend({
  host: 'https://web.api.augmate.com/v1/mvp_1/',
  ajax: function(url, method, hash) {
    hash = hash || {}; // hash may be undefined
    hash.crossDomain = true;
    hash.xhrFields = {withCredentials: true};
    return this._super(url, method, hash);
  }
});