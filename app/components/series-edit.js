import Ember from 'ember';

export default Ember.Component.extend({
	valid2: 'none',
	store: Ember.inject.service('store'),
	changeType: Ember.computed('number', function() {
		let number = this.get('number');
		// (Ember.isBlank(number)) ? this.set('seriesId', undefined) : null;
		if(Ember.isBlank(number)) {this.set('seriesId', undefined)}
		// 	this.set('seriesId', undefined);
		// } else {
		// 	return null;
		// }
	}),
	actions: {
		sendData(){
			// let seriesId = this.get('seriesId');
			this.set('valid2', 'none');
			// let episode = this.getProperties('number', 'video');
			let episode = {
				anime: this.get('store').peekRecord('anime', this.get('anime-id')),
				number: this.get('number'),
				video: Ember.$("#series")[0].files[0]
			}
			// if (Ember.isPresent(seriesId)){
			// 	this.get('store').findRecord('series',seriesId).then((seria) =>{
			// 		seria.setProperties(episode);
			// 		seria.save();
			// 		this.set('number', '');
			// 		this.set('video', '');
			// 	});
			// } else {
				
			// }
			
			let series_to_base = this.get('store').createRecord('series', episode);
			series_to_base.save();



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
