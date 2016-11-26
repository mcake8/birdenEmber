import Ember from 'ember';

export default Ember.Component.extend({
	valid: 'none',
	store: Ember.inject.service('store'),
	init() {
		this._super(...arguments);
		this.get('store').findAll('genres').then((data) => {
			this.set('genres', data);
		});
	},
	actions: {
		sendData() {
			let arr = ['title', 'manufacturer', 'cover', 'date', 'description', 'genre','type'];
			let data = this.getProperties(arr);

			console.log(data);
			for (let item in data) {
				if (data[item] === undefined) {
					return this.set('valid', 'block');
				}
				this.set('valid', 'none');
			}

			this.get('store').query('genres', {
				orderBy: 'name',
				equalTo: data.genre,
			}).then((genre) => {
				data.genre = genre.get('firstObject');
				let animeToBase = this.get('store').createRecord('anime', data);
				let series = this.get('store').createRecord('series', {
					anime: animeToBase,
					number: this.get('serNum'),
					video: ''
				});
				animeToBase.save();
				genre.save();
				series.save();

				[genre, animeToBase, series].map((item) => item.save);
			});
		},
		selectChange(target){
			this.set('genre', target);
		}
	}
		
});
