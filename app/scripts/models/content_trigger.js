ProjectDingo.ContentTrigger = DS.Model.extend({
    title: DS.attr('string'),
    content: DS.attr('string'),

    qrcode: function() {
        return this.get('id');
    }.property()
});
