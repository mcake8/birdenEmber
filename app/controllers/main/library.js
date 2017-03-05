import Ember from 'ember';

export default Ember.Controller.extend({
	queryParams: ['genre'],
	genre: 'все',
	sortBy: ['title'],
	data: Ember.computed.sort('model.anime', 'sortBy'),
	actions: {
		updateCategoryValue(name) {
			this.set('animeItems', name);
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
