import Ember from 'ember';

export default Ember.Controller.extend({
	sessionAccount: Ember.inject.service('session-account'),
	actions: {
		subscribeToAnime() {
			let current_user_id = this.get('sessionAccount.account.id');
			let current_anime = this.get('model');
			this.store.findRecord('user', current_user_id).then((user_data) => {
				current_anime.get('users').pushObject(user_data);
				current_anime.save();
			});
		}
	}
});
