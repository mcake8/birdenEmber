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
			item.set('check', true);
		});
		console.log(this);
	},
	sortProperties: ['number'],
	sortSeries: Ember.computed.sort('anime.series', 'sortProperties'),
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
			let anime = this.get('anime');
			this.get('store').findRecord('anime',anime.id).then((anime) =>{
				anime.setProperties(arr);
				anime.save();
			});
		},
		editSeries(targetID,targetNum,targetVid) {
			this.set('selectedId', targetID);
			this.set('selectedVideo', targetVid);
			this.set('selectedNumber', targetNum);
		},
		receiveFile(file){
		
			this.set('cover', file);
	    },
	    pushVideoPreview(anime_id, series_id) {
	    	let _this = this;
	    	let target = event.target;
	    	let xhr = new XMLHttpRequest();
	    	let url = window.location.origin + '/animes/video_preview/?anime_id=' + anime_id + '&series_id=' + series_id; 
	    	xhr.open('get', url, true);
	    	xhr.send();

	    	xhr.onload = function() {
				target.innerHTML = "Active";
    			target.className += " video-preview_is-active";

    			_this.get('store').findAll('series');
	    	};

	    	target.innerHTML = "Modify..";
	    }
	}
});
