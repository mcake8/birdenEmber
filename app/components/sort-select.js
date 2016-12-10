import Ember from 'ember';

export default Ember.Component.extend({
	store: Ember.inject.service('store'),
	catSort: Ember.computed('category', function() {
		let category = this.get('category');
		let data = this.get('anims');
		if (category !== 'все') {
			this.get('store').query('genre', {
				orderBy: 'name',
				equalTo: category
			}).then((data) => {
				data.get('firstObject.animes').then((anime) => {
					data = this.get('updateValue')(anime);
				})
			});
		};
		this.get('updateValue')(data);
	}),
	actions: {
		changeCatalog(target) {
			this.set('category', target);
		}
	}
});
