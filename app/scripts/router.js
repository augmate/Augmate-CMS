Ember4.Router.map(function () {
	this.route('login');
    this.route('applist');
    this.route('content_trigger.index', {path: '/ctrigger'});
    this.route('content_trigger.new', {path: '/ctrigger/new'});
    this.route('content_trigger.view', {path: '/ctrigger/view'});
    this.route('contact_us', {path: '/contact'});
});
