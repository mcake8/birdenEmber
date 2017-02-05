import Ember from 'ember';

export default Ember.Controller.extend({
	queryParams: ['genre'],
	genre: 'все',
	actions: {
		updateCategoryValue(name) {
			this.set('animeItems', name);
		},
		showVideoPreview(video_preview) {
			let video = event.srcElement.querySelector('video');
			video.className = "photo_is-acitve";
			video.play();		
		},
		hideVideoPreview() {
			let video = event.srcElement.querySelector('video');
			video.className = "";
			video.pause();
			video.currentTime = 0;
		}
	}
});
