import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		users: this.store.findAll('user'),	
	}
});
