import DS from 'ember-data';

export default DS.Model.extend({
	email: DS.attr('string'),
	password: DS.attr('string'),
	subscriptions: DS.hasMany('subscription'),
	notifications: DS.hasMany("user-notification")
});
