import Ember from 'ember';

const $ = Ember.$;
let animeId,
	that;
function localRecord() {
	let video = document.querySelector('#video');
	let animeData = {
		lastTime: video.currentTime,
		seriaId: $('.current_vid').index(),
		duration: video.duration,
		volume: video.volume
	}
	let animeKey = 'anime' + animeId;
	localStorage.setItem(animeKey, JSON.stringify(animeData));
};

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
		lastTime,
		miniVid = $('.show_preview video')[0],
		previewBlock = $('.show_preview');
	
	var locallData = JSON.parse(localStorage.getItem('anime' + animeId))
	if (locallData !== null) {
		changeSeria(locallData.seriaId);
		lastTime = locallData.lastTime;
		if (lastTime > 0 && lastTime < locallData.duration) {
			player.addClass('continue');
		}
	}
	window.onbeforeunload = function(){
		localRecord();
	};
	video.addEventListener('loadedmetadata', function() {
		prep();
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
	function prep(){
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
		let gen = that.get('anime.genres.firstObject.name');
		that.get('store').query('anime', {
			recommended: gen
		}).then((data) => {
			that.set('recommendedAnim', data);
		});
	}
	function togglePause(){
		player.removeClass('wait_next wait_next-last load_player');
		player.toggleClass('paused');
		if (!player.hasClass("paused")) {
			video.pause();
			clearInterval(timer);
		} else {
			progressBarMove();
			video.play();
		}
		localRecord();
	}
	
	function showProgress(){
		let currentTime = event.target.currentTime;
		currentTimeText.text(timeFormat(currentTime));
		if (currentTime >= videoDuration) {
			video.currentTime = 0;
			refreshBar();
			nextSeria();
			player.removeClass('paused');
		}
	}
	
	function nextSeria(){
		let current = $('.current_vid'),
			next = current.index() + 1,
			previewElm = $('.preview-element'),
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
		} else {
			player.addClass('wait_next wait_next-last');
		}
		
	}
	function progressBarMove(){
		let fps = 24;
		let interval = 1000.0 / fps,
			waylength = parseFloat(dragZone[0].clientWidth),
			step = waylength / (videoDuration * fps),
			onePercent = step / waylength;
		way = parseFloat(video.currentTime) * fps * step;
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
		},interval);
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
		}
	});
	$('#fs_bt').click(function(){
		fullScreen();
	});
	play.click(function(){
		togglePause();
	});
	$('#video').click(function(){
		togglePause();
	});
	$('#video').dblclick(function(){
		fullScreen();
	});
	$('#firstPlay').click(function(){
		togglePause();
	});
	$('#nextPlay').click(function(){
		clearInterval(nextTimer);
		player.removeClass('wait_next wait_next-last');
		changeSeria($('.current_vid').index() + 1);
	});
	$('#cancel').click(function(){
		clearInterval(nextTimer);
		player.removeClass('wait_next wait_next-last');
	});
	$('#yes').click(function(){
		video.currentTime = lastTime;
		player.removeClass('continue');
		togglePause();
	});
	$('#no').click(function(){
		player.removeClass('continue')
	});
	$('.recommended').on('click', '.recommended_anime', function(){
		player.removeClass('wait_next wait_next-last').addClass('load_player');
		clearInterval(nextTimer);
		refreshBar();
	});
	
	var timeDrag = false;
	dragZone.on('mousedown', function(e) {
		timeDrag = true;
		updatebar(e.pageX, video, progressRound, progressBar );
		clearInterval(timer);
		video.pause();
	});
	dragZone.on('mousemove', function(e) {
		previewBlock.addClass('showVid');
		updatebar(e.pageX, miniVid, previewBlock);
	});
	dragZone.on('mouseleave', function(){
		previewBlock.removeClass('showVid');
	});
	$(document).on('mouseup', function(e) {
		if(timeDrag) {
			timeDrag = false;
			updatebar(e.pageX, video, progressRound, progressBar );
			if (player.hasClass("paused")) {
				progressBarMove();
				video.play();
			}
		}
	});
	$(document).on('mousemove', function(e) {
		if(timeDrag) {
			updatebar(e.pageX, video, progressRound, progressBar );
		}
		if (player.hasClass('fullScreen')) {
			player.addClass('row_up');
			Ember.run.debounce(this, removePlClass , 2000);
		};
	});
	function removePlClass (){
		player.removeClass('row_up');
	}
	var updatebar = function(x, vid, elmTrans, elmScale) {
		let dragWidth = dragZone.width(),
			position = x - dragZone.offset().left,
			percent = 100 * position / dragWidth;
		if(percent > 100) {
			percent = 100;
		}
		if(percent < 0) {
			percent = 0;
		}
		if (Ember.isPresent(elmScale)) {
			elmScale.css('transform', 'scaleX(' + percent/100 + ')');
		}
		vid.currentTime = videoDuration * percent / 100;
		let percentToPX = percent * dragZone[0].clientWidth / 100;
		if (elmTrans.hasClass('show_preview')) {
			let piece = $('.piece');
			let edge = elmTrans.outerWidth()/2;
			piece.css({
				'left': '67px',
				'right': 'auto'
			});
			if (percentToPX < edge) {
				piece.css('left', percentToPX - 7 + 'px');
				percentToPX = edge;
			}
			if (percentToPX > (dragWidth - edge) ) {
				piece.css({
					'left': 'auto',
					'right': dragWidth - percentToPX - 7 + 'px'
				});
				percentToPX = (dragWidth - edge);
			}
		}
		elmTrans.css('transform', 'translateX(' +  percentToPX + 'px)');
		
		
	};
	function changeSeria(target){
		player.removeClass('continue')
		let vid = $('#video'),
			previewElm = $('.preview-element');
		prevBt.removeClass('hidden');
		nextBt.removeClass('hidden');
		let current = previewElm.eq(target),
			img = current.attr('coverImg'),
			player_block = document.querySelector(".anime-background-image");
		player_block.style.backgroundImage = `url(../${img})`;
		video.src = current.attr("data");
		miniVid.src = current.attr("data");
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
				player.addClass('paused');
			}
			
		});
		if (player.hasClass('wait_next')) {
			player.removeClass('wait_next wait_next-last');
			clearInterval(nextTimer);
		}
		localRecord();
	}
	prevBt.click(function(){
		changeSeria($('.current_vid').index() - 1);
	});
	nextBt.click(function(){
		changeSeria($('.current_vid').index() + 1);
	});
	$('.right-preview').on('click', '.preview-element', function(){
		changeSeria($(this).index());
	});
	
	function timeFormat (sec){
		let s = sec % 60;
		let m = (sec - s) / 60;
		return ("0" + parseInt(m)).slice(-2) + ':' + ("0" + parseInt(s)).slice(-2);
	}
}

export default Ember.Component.extend({
	store: Ember.inject.service('store'),
	router: Ember.inject.service('router'),
	recommendedAnim: '',
	disabledView: Ember.computed('anime', function() {
		console.log('change')
		Ember.run.scheduleOnce('afterRender', this, function(){
			let videoWrap = $('.video-player');
			console.log('schedulechange')
			videoWrap.removeClass('disabledView');
			if ($('.preview-element').length < 1) {
				videoWrap.addClass('disabledView');
			}
		});
	}),
	didInsertElement() {
		animeId = this.get('anime.id');
		player();
		that = this;
	},
	willDestroyElement() {
		console.log('destroy')
  		this._super(...arguments);
  		localRecord();
  	}
});
