import Ember from 'ember';

const $ = Ember.$;

function player(){
	let dragZone = $('.select_zone'),
		video = document.querySelector('#video'),
		progressBar = $('.line'),
		progressRound = $('#round'),
		timer,
		nextTimer,
		way,
		videoDuration,
		persentWay,
		play = $('.play'),
		player = $('.player'),
		volumeHandler = $('#volume'),
		volume = 80,
		volumeLast = 80,
		mute = $('.mute'),
		durationText = $('#duration'),
		currentTimeText = $('#curentTime'),
		vl1 = $('.vl_circle'),
		vl2 = $('.vl_progress'),
		prevBt = $('.prev_bt'),
		nextBt = $('.next_bt'),
		previewElm = $('.preview-element');
		

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
		player.removeClass('wait_next');
		player.removeClass('load_player');
		player.toggleClass('paused');
		if (!player.hasClass("paused")) {
			video.pause();
			clearInterval(timer);
		} else {
			progressBarMove();
			video.play();
		}
	}
	
	function showProgress(){
		let currentTime = event.target.currentTime;
		currentTimeText.text(timeFormat(currentTime));
		if (currentTime === videoDuration) {
			video.currentTime = 0;
			refreshBar();
			nextSeria();
			player.removeClass('paused');
		}
	}
	function nextSeria(){
		let current = $('.current_vid'),
			next = current.index() + 1,
			cover = previewElm.eq(next).attr('coverImg');
		$('.next_wrap').css('background-image', 'url(../' + cover + ')' );
		if (current.index() !== previewElm.length - 1) {
			player.addClass('wait_next');
			let sec = 10;
			$('#remain').html(sec);
			nextTimer = setInterval(function(){
				sec -= 1;
			 	$('#remain').html(sec);
			 	if (sec === 0) {
			 		clearInterval(nextTimer);
			 		player.removeClass('wait_next');
			 		changeSeria(next);
			 	}
			}, 1000);
		}
		
	}
	function progressBarMove(){
		let fps = 1000.0 / 24.0,
			waylength = parseFloat(dragZone[0].clientWidth),
			step = waylength / (videoDuration * 24),
			onePercent = step / waylength;
		console.log(videoDuration)
		way = parseFloat(video.currentTime) * 24 * step;
		persentWay = way / (waylength/100)/100;
		timer = setInterval(function(){
			if (step > 0) {
				way += step;
				persentWay = persentWay + onePercent;
				progressBar.css('transform', 'scaleX(' + persentWay + ')');
				progressRound.css('transform', 'translateX(' + way + 'px)');
				if (way >= waylength || persentWay >= 100){
					clearInterval(timer);
				}
			}
		},fps);
	}
	function refreshBar(){
		$('.line').css('transform', 'scaleX(0)');
		$('#round').css('transform', 'translateX(0px)');
		clearInterval(timer);
		way = 0;
		persentWay = 0;
	}

	function fullScreen(){
		player.toggleClass('fullScreen');
		if (player.hasClass('fullScreen')) {
			if (player[0].requestFullscreen) {
			  player[0].requestFullscreen();
			} else if (player[0].mozRequestFullScreen) {
			  player[0].mozRequestFullScreen();
			} else if (player[0].webkitRequestFullscreen) {
			  player[0].webkitRequestFullscreen();
			}
		} else {
			if (document.cancelFullScreen) {
		      document.cancelFullScreen();
		    } else if (document.mozCancelFullScreen) {
		      document.mozCancelFullScreen();
		    } else if (document.webkitCancelFullScreen) {
		      document.webkitCancelFullScreen();
		    }
		}
	}
	$(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e){
		if (!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullscreenElement)) {
			player.removeClass('fullScreen');
			console.log('exitF')
		}
	});
	$('#fs_bt').click(function(){
		fullScreen();
	});
	play.click(function(){
		togglePause();
		console.log('click')
	});
	$('#video').click(function(){
		togglePause();
		console.log('click')
	});
	$('#firstPlay').click(function(){
		togglePause();
	});
	$('#nextPlay').click(function(){
		clearInterval(nextTimer);
		player.removeClass('wait_next');
		changeSeria($('.current_vid').index() + 1);
	});
	$('#cancel').click(function(){
		clearInterval(nextTimer);
		player.removeClass('wait_next');
	});
	var timeDrag = false;
	dragZone.on('mousedown', function(e) {
		timeDrag = true;
		updatebar(e.pageX);
		clearInterval(timer);
		video.pause();
	});
	$(document).on('mouseup', function(e) {
		if(timeDrag) {
			timeDrag = false;
			updatebar(e.pageX);
			if (player.hasClass("paused")) {
				progressBarMove();
				video.play();
			}
		}
	});
	$(document).on('mousemove', function(e) {
		if(timeDrag) {
			updatebar(e.pageX);
		}
		if (player.hasClass('fullScreen')) {
			$('.player').addClass('row_up');
			Ember.run.debounce(this, removePlClass , 2000);
		};
	});

	function removePlClass (){
		$('.player').removeClass('row_up');
	}

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
	function changeSeria(target){
		
		let vid = $('#video');
		prevBt.removeClass('hidden');
		nextBt.removeClass('hidden');
		let current = previewElm.eq(target),
			img = current.attr('coverImg'),
			player_block = document.querySelector(".anime-background-image");
		player_block.style.backgroundImage = `url(../${img})`;
		video.src = current.attr("data");
		previewElm.removeClass('current_vid');
		current.addClass('current_vid');

		let ind = current.index();
		if (ind === 0) {
			$('.prev_bt').addClass('hidden');
		}
		if (ind === $('.preview-element').length - 1) {
			$('.next_bt').addClass('hidden');
		}
		vid.off('loadedmetadata')
		vid.on('loadedmetadata', function() {
			refreshBar();
			if (!player.hasClass('load_player')) {
				progressBarMove();
				video.play();
				$('.player').addClass('paused');
			}
		});
		if (player.hasClass('wait_next')) {
			player.removeClass('wait_next');
			clearInterval(nextTimer);
		}
	}
	prevBt.click(function(){
		changeSeria($('.current_vid').index() - 1);
	});
	nextBt.click(function(){
		changeSeria($('.current_vid').index() + 1);
	});
	previewElm.click(function(){
		changeSeria($(this).index());
	});
	
	
	
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
		player();
		let sidePreviews = $('.preview-element');
		sidePreviews.each(function(){
			if($(this).attr('data') === $('#video').attr('src')){
				$(this).addClass('current_vid');
				let ind = $(this).index();
				if (ind === 0) {
					$('.prev_bt').addClass('hidden');
				}
				if (ind === sidePreviews.length - 1) {
					$('.next_bt').addClass('hidden');
				}
			}
		});

	},
	// actions: {
	// 	selectSeries(img, t){
	// 		$('.prev_bt').removeClass('hidden');
	// 		$('.next_bt').removeClass('hidden');
	// 		let trg = t.target,
	// 			video = $("#video");
	// 		if (trg.className != "preview-element current_vid") {
	// 			let player_block = document.querySelector(".anime-background-image");
	// 			player_block.style.backgroundImage = `url(../${img})`;
	// 			let videoSrc = trg.getAttribute("data");
	// 			video[0].src =  videoSrc;
	// 			$('.preview-element').removeClass('current_vid');
	// 			trg.className = "preview-element current_vid";
	// 			let ind = $('.current_vid').index();
	// 			if (ind === 0) {
	// 				$('.prev_bt').addClass('hidden');
	// 			}
	// 			if (ind === $('.preview-element').length - 1) {
	// 				$('.next_bt').addClass('hidden');
	// 			}
	// 		}
	// 		video.off('loadedmetadata')
	// 		video.on('loadedmetadata', function() {
	// 			refreshBar();
	// 			progressBarMove();
	// 			video[0].play();
	// 			$('.player').addClass('paused');
	// 		});
	// 	},
		// prevNext(e){
		// 	$('.prev_bt').removeClass('hidden');
		// 	$('.next_bt').removeClass('hidden');
		// 	let video = $("#video");
		// 	let targetIndex,
		// 		sidePreviews = $('.preview-element'),
		// 		player_block = document.querySelector(".anime-background-image");
		// 	if (e.target.className === 'prev_bt') {
		// 		targetIndex = $('.current_vid').index() - 1;
		// 		if (targetIndex === 0) {
		// 			$('.prev_bt').addClass('hidden');
		// 		}
		// 	} else {
		// 		targetIndex = $('.current_vid').index() + 1;
		// 		if (targetIndex === sidePreviews.length - 1) {
		// 			$('.next_bt').addClass('hidden');
		// 		}
		// 	}
		// 	let targetElm = sidePreviews.eq(targetIndex),
		// 		videoSrc = targetElm.attr("data"),
		// 		img = targetElm.attr("coverImg");

		// 	player_block.style.backgroundImage = `url(../${img})`;
		// 	video[0].src = videoSrc;
		// 	sidePreviews.removeClass('current_vid');
		// 	targetElm.addClass('current_vid');
		// 	video.off('loadedmetadata')
		// 	video.on('loadedmetadata', function() {
		// 		refreshBar();
		// 		progressBarMove();
		// 		video[0].play();
		// 		$('.player').addClass('paused');
		// 	});
			
		// }
	// }
	
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
