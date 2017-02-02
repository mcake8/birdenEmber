import Ember from 'ember';

export default Ember.Component.extend({
	valid: 'none',
	store: Ember.inject.service('store'),
	willRender(){
		this._super(...arguments);
		this.get('store').findAll('genre').then((data) => {
			this.set('genres', data);
		});
		this.get('anime.genres').forEach(function(item) {
			item.set('check', true)
		});
	},
	actions: {
		edit(){
			let arr = {
				title: this.get('anime.title'),
				manufacturer : this.get('anime.manufacturer'),
				cover : this.get('cover'),
				date : this.get('anime.date'),
				description : this.get('anime.description'),
				genre : '',
				type : this.get('anime.type'),
			};
			let checks = this.get('store').peekAll('genre');
			arr.genre = checks.filterBy('check', true);
			console.log(arr.cover)
			// for (let item in arr) {
			// 	if (arr[item].length === 0) {
			// 		return this.set('valid', 'block');
			// 	}
			// 	this.set('valid', 'none');
			// }
			let anime = this.get('anime');
			this.get('store').findRecord('anime',anime.id).then((anime) =>{
				anime.setProperties(arr);
				anime.save();
			});
		},
		// selectChange(target){
		// 	this.set('genre', target);
		// },
		editSeries(targetID,targetNum,targetVid) {
			this.set('selectedId', targetID);
			this.set('selectedVideo', targetVid);
			this.set('selectedNumber', targetNum);
		},
		receiveFile(file){
		
			this.set('cover', file);
	    }
	}
});
