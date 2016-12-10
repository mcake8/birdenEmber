import Ember from 'ember';

export default Ember.Component.extend({
	valid: 'none',
	store: Ember.inject.service('store'),
	willRender(){
		this._super(...arguments);
		Ember.$('select').val(this.get('anime.genre.name'));
	},
	actions: {
		edit(){
			let arr = {
				title: this.get('anime.title'),
				manufacturer : this.get('anime.manufacturer'),
				cover : this.get('anime.cover'),
				date : this.get('anime.date'),
				description : this.get('anime.description'),
				genre : this.get('anime.genre'),
				type : this.get('anime.type'),
			};
			
			for (let item in arr) {
				if (arr[item].length === 0) {
					return this.set('valid', 'block');
				}
				this.set('valid', 'none');
			}
			let anime = this.get('anime');
			this.get('store').findRecord('anime',anime.id).then((anime) =>{
				anime.setProperties(arr);
				anime.save();
			});
		},
		selectChange(target){
			this.set('genre', target);
		},
		editSeries(targetID,targetNum,targetVid) {
			this.set('selectedId', targetID);
			this.set('selectedVideo', targetVid);
			this.set('selectedNumber', targetNum);
		}
	}
});
