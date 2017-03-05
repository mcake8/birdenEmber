import Ember from 'ember';

export default Ember.Controller.extend({
	queryParams: ['genre'],
	genre: 'все',
	sortBy: ['title'],
	data: Ember.computed.sort('model.anime', 'sortBy'),
	actions: {
		changeCatalog(target) {
			this.set('genre', target);
			if (target !== 'все') {
				this.get('store').query('anime', {
					genre: target
				}).then((data) => {
					this.set('model.anime', data); 
				});
			} else{
				let anime = this.store.findAll('anime');
				this.set('model.anime', anime);
			}
		},
		showVideoPreview() {
			let video = event.target.querySelector('video');
			if (video) {
				video.className = "photo_is-acitve";
				video.play();
			}
		},
		hideVideoPreview() {
			let video = event.target.querySelector('video');
			if (video) {
				video.className = "";
				video.pause();
				video.currentTime = 0;
			}
		}
	}
});
