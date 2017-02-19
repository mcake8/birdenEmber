import Ember from 'ember';

export default Ember.Controller.extend({
	sessionAccount: Ember.inject.service('session-account'),
	actions: {
		subscribeToAnime() {
			let user = this.get('sessionAccount.account');
			let anime = this.get('model');
			let new_sucription = this.store.createRecord('subscription', {
				anime: anime,
				user: user
			});
			new_sucription.save().then((data) => {
				this.set('model.meta.is-subscribe', true);
			});
		}, 
		unsubscribeToAnime() {
			let user_id = this.get('sessionAccount.account.id');
			let anime_id = this.get('model.id');
			this.store.queryRecord('subscription', {
				filter: {
					user_id: user_id,
					anime_id: anime_id
				}
			}).then((data) => {
				data.destroyRecord();
				this.set('model.meta.is-subscribe', false);
			});
		}
	}
});
