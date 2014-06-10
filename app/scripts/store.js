//Ember4.ApplicationAdapter = DS.FixtureAdapter;

Ember4.ApplicationAdapter = DS.RESTAdapter.extend({
  host: 'http://localhost:80',
  ajax: function(url, method, hash) {
    hash = hash || {}; // hash may be undefined
    hash.crossDomain = true;
    hash.xhrFields = {withCredentials: true};
    return this._super(url, method, hash);
  }
});