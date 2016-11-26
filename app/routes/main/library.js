import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return Ember.RSVP.hash({
			genres: this.store.findAll('genres'),
			anime: this.store.findAll('anime').then((data) => {
				return data.filterBy('title').reverse();
			})
		})
		
	}
});
