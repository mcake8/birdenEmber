import Ember from 'ember';

export default Ember.Component.extend({
	init() {
		this._super(...arguments);
		this.get('catSort');
	},
	store: Ember.inject.service('store'),
	catSort: Ember.computed('genre', function() {
		let genre = this.get('genre');
		let data = this.get('anims');
		if (genre !== 'все') {
			this.get('store').query('anime', {
				genre: genre
			}).then((data) => {
				data = this.get('updateValue')(data); 
			});
		};
		this.get('updateValue')(data);
	}),
	actions: {
		changeCatalog(target) {
			this.set('genre', target);
		}
	}
});
