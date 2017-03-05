import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel() {
		console.log(this);
	},
	model(params){
		return this.store.findRecord('anime', params.anime_id);
	}
});
