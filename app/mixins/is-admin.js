import Ember from 'ember';

export default Ember.Mixin.create({
	sessionAccount: Ember.inject.service(),
	beforeModel(){
		if (this.get('sessionAccount.account.is_admin')) {
			return this._super(...arguments);
		}
		return this.transitionTo('login');
	}
});
