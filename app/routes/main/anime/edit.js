import Ember from 'ember';

export default Ember.Route.extend({
	model(params){
		return Ember.RSVP.hash({
			genres: this.store.findAll('genres'),
			anime: this.store.findRecord('anime',params.anime_id)
		})
	}
});
