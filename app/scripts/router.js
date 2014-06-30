ProjectDingo.Router.map(function () {
	this.route('login');
    this.route('logout');
    this.route('index', { path: '/' });
    this.route('apps');
    this.route('apps.content_trigger.index', { path: '/ctrigger' });
    this.route('apps.content_trigger.new', { path: '/ctrigger/new' });
    this.route('apps.content_trigger.view', { path: '/ctrigger/:qrcode' });
    this.route('contact_us', {path: '/contact'});
});

ProjectDingo.Router.reopen({
    location: 'auto'
});