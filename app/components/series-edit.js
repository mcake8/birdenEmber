import Ember from 'ember';

export default Ember.Component.extend({
	valid2: 'none',
	store: Ember.inject.service('store'),
	changeType: Ember.computed('number', function() {
		let number = this.get('number');
		(Ember.isBlank(number)) ? this.set('seriesId', undefined) : "";
	}),
	actions: {
		sendData(){
			let seriesId = this.get('seriesId');
			this.set('valid2', 'none');
			let episode = this.getProperties('number', 'video');
			if (Ember.isBlank(episode.number) || Ember.isBlank(episode.video)) {
				return this.set('valid2', 'block');
			}
			if (Ember.isPresent(seriesId)){
				this.get('store').findRecord('series',seriesId).then((seria) =>{
					seria.setProperties(episode);
					seria.save();
					this.set('number', '');
					this.set('video', '');
				});
			} else {
				this.get('store').query('anime', {
					orderBy: 'title',
					equalTo: this.get('anime'),
				}).then((anime) => {
					episode.anime = anime.get('firstObject');				
					let record = this.get('store').createRecord('series', episode);
					record.save();
					anime.save();
					this.set('number', '');
					this.set('video', '');
				});
			}
			// this.get('store').query('series', {
			// 	orderBy: 'number',
			// 	equalTo: episode.number,
			// }).then((series) => {
			// 	let seria = series.get('firstObject');
				
			// }).catch((error) => {
				

			// });
				
				
			
		}
	}
});
