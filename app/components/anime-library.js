import Ember from 'ember';

export default Ember.Component.extend({
	queryParams: ['category'],
	store: Ember.inject.service('store'),
	willRender(){
		this._super(...arguments);
		Ember.$('.top-catalog-options select').val(this.get('category'));
	},
	catalogFilter: Ember.computed('category', function(){
		let category = this.get('category');
		this.store.query('genres', {
			orderBy: 'name',
			equalTo: category
		}).then((data) => {
			let animeSort = data.get('firstObject.anime');
			this.set('model.anime', animeSort);
		});
	}),
	actions: {
		changeCatalog(target) {
			this.set('category', target);
		}
	}
});
