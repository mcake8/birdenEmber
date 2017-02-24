import Ember from 'ember';


export default Ember.Component.extend({
	didRender() {
		this._super(...arguments);
		let player = document.querySelector('#video');
		let play = document.querySelector('.play');
		player.addEventListener('timeupdate', this.get('progress'));
		play.addEventListener('click', this.get('togglePause'));

		let first_anime = this.get('anime.series.firstObject.video.url');
		this.set('video_url', first_anime);
		console.log(this.$()[0]);
	},
	volume: 85,
	memory: 85,
	downer: false,
	volumeHasChange: Ember.observer('volume', function() {
		let volume = this.get('volume');
		let video = document.querySelector('#video');
		video.volume = volume/100;
		Ember.$('.vl_circle').css('bottom', volume + '%');
		Ember.$('.vl_progress').css('height', volume + '%');
		let volumeIcon = document.querySelector('.volume');
		if (volume > 50) {
			volumeIcon.className = 'volume full';
		}
		if (volume < 50) {
			volumeIcon.className = 'volume half';
		}
		if (volume < 1) {
			volumeIcon.className = 'volume zero';
		}
		if (volume > 0) {
			this.set('memory', volume);
		}
	}),
	progress(e){ 
		let line = document.querySelector('.line');
		let percent = (e.target.currentTime / (e.target.duration / 100)) / 100;
		line.style.transform = 'scaleX(' + percent + ')';
		let timer = e.target.currentTime
		let percentToPX = document.querySelector(".progress_wrap").clientWidth / 100;
		Ember.$('#round').css('transform', 'translateX(' + (percent * percentToPX * 100) + 'px)')
		let curentSec = timer % 60;
		let curentMin = (timer - curentSec) / 60;
		let curent = ("0" + parseInt(curentMin)).slice(-2) + ':' + ("0" + parseInt(curentSec)).slice(-2);
		Ember.$('#curentTime').html(curent)
		
	},
	togglePause(e) {
		let play = e.target.closest('.play');
		let video = document.querySelector('#video');
		if (play.className == "play paused") {
			video.pause();
			play.className = "play";
		} else {
			video.play();
			play.className = "play paused";
		}
		
		let durationSec = video.duration % 60;
		let durationMin = (video.duration - durationSec) / 60;
		let duration = ("0" + parseInt(durationMin)).slice(-2) + ':' + ("0" + parseInt(durationSec)).slice(-2);
		Ember.$('#duration').html(duration)
	},
	actions: {
		range(e) {
			console.log(this.get('downer'))
			if (this.get('downer')) {
				let point = e.offsetX / (document.querySelector(".click_mask").clientWidth / 100);
				let video = document.querySelector('#video');
				let time = video.duration / 100 * point;
				video.currentTime = time;
			}
		},
		detect(){
			this.set('downer', true);
		},
		undetect(){
			this.set('downer', false);
		},
		selectSeries(img, t){
			let player_block = document.querySelector(".anime-background-image");
			player_block.style.backgroundImage = `url(../${img})`;
			this.set('video_url', t.target.getAttribute("data"));
			// console.log(this.get('video_url'))
		},
		toggleMute(){
			let muter = document.querySelector('.mute');
			let volume = this.get('volume');
			let memory = this.get('memory');
			if (muter.className == "mute unmuted") {
				this.set('volume', 0);
				muter.className = "mute muted";
			} else {
				this.set('volume', memory);
				muter.className = "mute unmuted";;
			}
		},
		setTime(e){
			let point = e.offsetX / (document.querySelector(".click_mask").clientWidth / 100);
			console.log(e.offsetX)
			let video = document.querySelector('#video');
			let time = video.duration / 100 * point;
			video.currentTime = time;
			// video.set('currentTime', time);
		}
	}
});
