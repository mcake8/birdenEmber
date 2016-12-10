import Ember from 'ember';

export default Ember.Component.extend({
	valid: 'none',
	store: Ember.inject.service('store'),
	init() {
		this._super(...arguments);
		this.get('store').findAll('genre').then((data) => {
			this.set('genres', data);
		});
	},
	actions: {
		sendData() {
			let items = this.get('store').peekAll('genre');
			let arr = ['title', 'manufacturer','date', 'description','type'];
			let data = this.getProperties(arr);
			
			data.genres = items.filterBy('check', true);

			for (let item in data) {
				if (data[item] === undefined) {
					return this.set('valid', 'block');
				}
				this.set('valid', 'none');
			}

			let animeToBase = this.get('store').createRecord('anime', data);

			data.genres.forEach((item) => {
				let s = this.get('store').peekRecord('genre', item.get('id'));
				s.get('animes').addObject(animeToBase);
				s.save();
			});

			animeToBase.save();
		}
	}
		
});
