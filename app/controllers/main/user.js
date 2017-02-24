import Ember from 'ember';

export default Ember.Controller.extend({
	sessionAccount: Ember.inject.service('session-account'),
	actions: {
		unsubscribe(subscribe_id) {
			let record = this.store.peekRecord('subscription', subscribe_id);
			record.destroyRecord();
		}
	}
});
