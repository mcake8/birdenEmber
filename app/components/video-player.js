import Ember from 'ember';

function player(){
	const $ = Ember.$;
	let video = document.querySelector('#video'),
		play = $('.play'),
		volumeHandler = $('#volume'),
		volume = 80,
		volumeLast = 80,
		mute = $('.mute'),
		dragZone = $('.select_zone'),
		progressBar = $('.line'),
		progressRound = $('#round'),
		durationText = $('#duration'),
		videoDuration,
		currentTimeText = $('#curentTime'),
		vl1 = $('.vl_circle'),
		timer,
		vl2 = $('.vl_progress');
		

	video.addEventListener('loadedmetadata', function() {
		videoDuration = parseFloat(video.duration);
		durationText.html(timeFormat(videoDuration));
		video.volume = volume / 100;
		vl1.css('bottom', volume + '%');
		vl2.css('height', volume + '%');
	});	
	video.addEventListener('timeupdate', showProgress);
	volumeHandler.on('mousemove', function(){
		volume = volumeHandler.val();
		video.volume = volume / 100;
		vl1.css('bottom', volume + '%');
		vl2.css('height', volume + '%');
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
		if (volume > 0 && !mute.hasClass('silence')) {
			volumeLast = volume;
		}
	});
	mute.click(function(){
		if (!$(this).hasClass('silence')) {
			video.volume = 0;
			volumeHandler.val(0);
			vl1.css('bottom', 0 + '%');
			vl2.css('height', 0 + '%');
			$(this).addClass("silence");
		} else {
			volumeHandler.val(volumeLast);
			video.volume = volumeLast / 100;
			vl1.css('bottom', volumeLast + '%');
			vl2.css('height', volumeLast + '%');
			$(this).removeClass("silence");
		}
	});
	function togglePause(){
		play.toggleClass('paused');
		if (!play.hasClass("paused")) {
			video.pause();
			clearInterval(timer);
		} else {
			let fps = 1000.0 / 24.0,
				waylenght = parseFloat(dragZone[0].clientWidth),
				step = waylenght / (videoDuration * 24),
				onePercent = step / waylenght,
				way = parseFloat(video.currentTime) * 24 * step,
				persentWay = way / (waylenght/100)/100;
			timer = setInterval(function(){
				if (step > 0) {
					way += step;
					persentWay = persentWay + onePercent;
					progressBar.css('transform', 'scaleX(' + persentWay + ')');
					progressRound.css('transform', 'translateX(' + way + 'px)');
					if (way >= waylenght || persentWay >= 100){
						clearInterval(timer);
					}
				}
			},fps);
			video.play();
		}
	}
	function showProgress(){
		let currentTime = event.target.currentTime;
		console.log(currentTime)
		currentTimeText.text(timeFormat(currentTime));
		
	}
	

	play.click(function(){
		togglePause();
	});
	var timeDrag = false;
	dragZone.on('mousedown', function(e) {
		timeDrag = true;
		updatebar(e.pageX);
		clearInterval(timer);
		togglePause();
	});
	$(document).on('mouseup', function(e) {
		if(timeDrag) {
			timeDrag = false;
			updatebar(e.pageX);
			togglePause();
		}
	});
	$(document).on('mousemove', function(e) {
		if(timeDrag) {
			updatebar(e.pageX);
		}
	});
	var updatebar = function(x) {
		var position = x - dragZone.offset().left;
		var percent = 100 * position / dragZone.width();
		if(percent > 100) {
			percent = 100;
		}
		if(percent < 0) {
			percent = 0;
		}
		progressBar.css('transform', 'scaleX(' + percent/100 + ')');
		let percentToPX = dragZone[0].clientWidth / 100;
		progressRound.css('transform', 'translateX(' + (percent * percentToPX) + 'px)');
		video.currentTime = videoDuration * percent / 100;
	};
	function timeFormat (sec){
		let s = sec % 60;
		let m = (sec - s) / 60;
		return ("0" + parseInt(m)).slice(-2) + ':' + ("0" + parseInt(s)).slice(-2);
	}
}

export default Ember.Component.extend({
	// didInsertElement() {
	// 	// this._super(...arguments);
	// 	// let player = document.querySelector('#video');
	// 	// let play = document.querySelector('.play');
	// 	// player.addEventListener('timeupdate', this.get('progress'));
	// 	// play.addEventListener('click', this.get('togglePause'));
	// 	// let that = this;
		
	// 	// Ember.$(document).on('mousemove', function(e){
	// 	// 	if(that.get('mouseDown')){
	// 	// 		that.get('updateBar')(e);
	// 	// 	}
	// 	// });
	// 	// Ember.$(document).on('mouseup', function(){
	// 	// 	that.set('mouseDown', false);
	// 	// });
	// },
	didInsertElement() {
		player('asd');
	},
	actions: {
		selectSeries(img, t){
			let player_block = document.querySelector(".anime-background-image");
			player_block.style.backgroundImage = `url(../${img})`;
			let videoSrc = t.target.getAttribute("data");
			document.querySelector("#video").src =  videoSrc;
		},
	}
	
	// volume: 85,
	// memory: 85,
	// mouseDown: false,
	// volumeHasChange: Ember.observer('volume', function() {
	// 	let volume = this.get('volume');
	// 	let video = document.querySelector('#video');
	// 	video.volume = volume/100;
	// 	Ember.$('.vl_circle').css('bottom', volume + '%');
	// 	Ember.$('.vl_progress').css('height', volume + '%');
	// 	let volumeIcon = document.querySelector('.volume');
	// 	if (volume > 50) {
	// 		volumeIcon.className = 'volume full';
	// 	}
	// 	if (volume < 50) {
	// 		volumeIcon.className = 'volume half';
	// 	}
	// 	if (volume < 1) {
	// 		volumeIcon.className = 'volume zero';
	// 	}
	// 	if (volume > 0) {
	// 		this.set('memory', volume);
	// 	}
	// }),
	// updateBar(e) {
	// 	console.log('updet')
	// 	let maskPersent = document.querySelector(".click_mask").clientWidth / 100
	// 	let point = e.offsetX / maskPersent;
	// 	let video = document.querySelector('#video');
	// 	let line =  document.querySelector('.line');
	// 	let round = document.querySelector('.round');
	// 	line.style.transform = 'scaleX(' + point/100 + ')';
	// 	round.style.transform = 'translateX(' + e.offsetX + 'px)';
	// 	let time = video.duration / 100 * point;
	// 	video.currentTime = time;
	// },
	// progress(e){ 
	// 	let line = document.querySelector('.line');
	// 	let curentPos = e.target.currentTime;
	// 	let maxduration = e.target.duration;
	// 	let percent = curentPos / maxduration;
	// 	line.style.transform = 'scaleX(' + percent + ')';
	// 	let percentToPX = document.querySelector(".progress_wrap").clientWidth / 100;
	// 	Ember.$('#round').css('transform', 'translateX(' + (percent * percentToPX * 100) + 'px)')
	// 	let curentSec = curentPos % 60;
	// 	let curentMin = (curentPos - curentSec) / 60;
	// 	let curent = ("0" + parseInt(curentMin)).slice(-2) + ':' + ("0" + parseInt(curentSec)).slice(-2);
	// 	Ember.$('#curentTime').html(curent)
		
	// },
	// togglePause() {
	// 	let play = document.querySelector('#play');
	// 	let video = document.querySelector('#video');
	// 	let line = document.querySelector('.controls_row');
	// 	if (play.className == "play paused") {
	// 		video.pause();
	// 		play.className = "play";
	// 		line.className = "controls_row nodelay";
	// 	} else {
	// 		video.play();
	// 		play.className = "play paused";
	// 		line.className = "controls_row";
	// 	}
	// 	console.log('called')
	// 	let durationSec = video.duration % 60;
	// 	let durationMin = (video.duration - durationSec) / 60;
	// 	let duration = ("0" + parseInt(durationMin)).slice(-2) + ':' + ("0" + parseInt(durationSec)).slice(-2);
	// 	Ember.$('#duration').html(duration)
	// },
	// actions: {

		
	// 	detect(){
	// 		console.log('detect')
	// 		this.set('mouseDown', true);
	// 		this.get('togglePause')();

	// 	},
	// 	undetect(){
	// 		this.set('mouseDown', false);
	// 		this.get('togglePause')();
	// 	},
		
	// 	toggleMute(){
	// 		let muter = document.querySelector('.mute');
	// 		let volume = this.get('volume');
	// 		let memory = this.get('memory');
	// 		if (muter.className == "mute unmuted") {
	// 			this.set('volume', 0);
	// 			muter.className = "mute muted";
	// 		} else {
	// 			this.set('volume', memory);
	// 			muter.className = "mute unmuted";;
	// 		}
	// 	},
	// 	setTime(e){
	// 		let point = e.offsetX / (document.querySelector(".click_mask").clientWidth / 100);
			
	// 		let video = document.querySelector('#video');
	// 		let time = video.duration / 100 * point;
	// 		video.currentTime = time;
	// 		// video.set('currentTime', time);
	// 	}
	// }
});
