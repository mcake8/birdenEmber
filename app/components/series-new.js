import Ember from 'ember';

export default Ember.Component.extend({
	valid: 'none',
	valid2: 'none',
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
				if (arr[item].length == 0) {
					return this.set('valid', 'block');
				}
				this.set('valid', 'none');
			};
			let anime = this.get('anime');
			console.log(anime)
			this.get('store').findRecord('anime',anime.id).then((anime) =>{
				anime.setProperties(arr);
				anime.save();
			});
				
		},
		selectChange(target){
			this.set('genre', target);
		},
		sendData(){
			this.set('valid2', 'none');
			let episode = {
				number: this.get('number'),
				video: this.get('video'),
				anime: '',
			};
			if (episode.number == undefined || episode.video.length == undefined) {
				this.set('valid2', 'block');
			}
			else{
				this.get('store').query('anime', {
					orderBy: 'title',
					equalTo: this.get('anime.title'),
				}).then((anime) => {
					episode.anime = anime.get('firstObject');				
					let record = this.get('store').createRecord('series', episode);
					record.save();
					anime.save();
					this.set('number', '');
					this.set('video', '');
				});
			}
		}
	}
});
