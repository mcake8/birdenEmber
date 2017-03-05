import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return Ember.RSVP.hash({
			genres: this.store.findAll('genre'),
			anime: this.store.findAll('anime')
		});
	}
});
