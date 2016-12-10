import Ember from 'ember';
import faker from 'faker';

export default Ember.Route.extend({
	actions: {
		randomser(){
			let genres = ['этти', 'сёнэн', 'сэнтай','меха','спокон','отаку','хентай','мистика'];
			for (var i = 50; i >= 0; i--) {
				let num = Math.floor(Math.random() * 8);
				this.store.query('genre', {
					orderBy: 'name',
					equalTo: genres[num]
				}).then((data) => {
					let gen = data.get('firstObject');

					let obj = {
						cover: faker.image.image(),
						genre:  gen,
						manufacturer: faker.address.country(),
						title: faker.name.title(),
						type: 'tv',
						date: faker.date.past(),
						description: faker.lorem.text(),
						series:  [],
						subscribers: ''
					};
					data.save();

					let rec = this.store.createRecord('anime', obj);
					rec.save();
				});
			}
		},
		randomGebre(){
			let genres = ['этти', 'сёнэн', 'сэнтай','меха','спокон','отаку','хентай','мистика'];
			for (var i = 8; i >= 0; i--) {
				let obj = {
					name: genres[i]
				};
				let data = this.store.createRecord('genre', obj);
				data.save();
			}
		}

	}

});
