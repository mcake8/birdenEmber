import Ember from 'ember';

export default Ember.Controller.extend({
	queryParams: ['genre'],
	genre: 'все',
	actions: {
		updateCategoryValue(name) {
			this.set('animeItems', name);
		}
	}
});
