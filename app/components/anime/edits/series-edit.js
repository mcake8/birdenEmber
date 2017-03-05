import Ember from 'ember';

export default Ember.Component.extend({
	valid2: 'none',
	store: Ember.inject.service('store'),
	actions: {
		sendData(){
			this.set('valid2', 'none');
			let episode = {
				anime: this.get('store').peekRecord('anime', this.get('anime-id')),
				number: this.get('number'),
				video: Ember.$("#series")[0].files[0]
			};			
			let series_to_base = this.get('store').createRecord('series', episode);
			series_to_base.save();			
		}
	}
});
