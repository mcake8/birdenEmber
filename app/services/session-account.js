import Ember from 'ember';
const { inject: { service }, RSVP } = Ember;

export default Ember.Service.extend({
	session: service('session'),
	store: service(),
	loadCurrentUser() {
		return new RSVP.Promise((resolve, reject) => {
			const token = this.get('session.data.authenticated.token');
			if (!Ember.isEmpty(token)) {
				return this.get('store').findRecord('user', 'current').then((user) => {
					this.set('account', user);
					document.cookie = "username=" + user.id;
					resolve();
				}, reject);
			} else {
				resolve();
			}
		});
	}
});