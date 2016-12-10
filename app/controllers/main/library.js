import Ember from 'ember';

export default Ember.Controller.extend({
	queryParams: ['category'],
	category: 'все',
	actions: {
		updateCategoryValue(name) {
			this.set('animeItems', name);
		}
	}
});
