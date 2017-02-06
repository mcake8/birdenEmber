import Ember from 'ember';

export default Ember.Controller.extend({
	queryParams: ['genre'],
	genre: 'все',
	actions: {
		updateCategoryValue(name) {
			this.set('animeItems', name);
		},
		showVideoPreview(video_preview) {
<<<<<<< HEAD
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
=======
			let video = event.srcElement.querySelector('video');
			video.className = "photo_is-acitve";
			video.play();		
		},
		hideVideoPreview() {
			let video = event.srcElement.querySelector('video');
			video.className = "";
			video.pause();
			video.currentTime = 0;
>>>>>>> efa2e30ab04e212ce86d6e138bd68a4c1d187082
		}
	}
});
