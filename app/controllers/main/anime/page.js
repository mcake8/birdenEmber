import Ember from 'ember';

export default Ember.Controller.extend({
	sessionAccount: Ember.inject.service('session-account'),
	actions: {
		subscribeToAnime() {
			// let user = this.get('sessionAccount.account');
			let anime = this.get('model');
			let new_sucription = this.store.createRecord('subscription', {
				anime: anime
			});
			new_sucription.save().then(() => {
				this.set('model.meta.is-subscribe', true);
			});
		}, 
		unsubscribeToAnime() {
			let anime_id = this.get('model.id');
			this.store.queryRecord('subscription', {
				filter: {
					anime_id: anime_id
				}
			}).then((data) => {
				data.destroyRecord();
				this.set('model.meta.is-subscribe', false);
			});
		}
	}
});
