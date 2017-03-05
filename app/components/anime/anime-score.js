import Ember from 'ember';
const $ = Ember.$;
let that;
function scoreMaker() {
	let rateMove,
		rateZone = $('.rating-vol');
	rateZone.mousedown(function(e){
		rateMove = true;
		updateScore(e.pageY);
	});
	rateZone.mouseup(function(){
		rateMove = false;
	});
	rateZone.mousemove(function(e){
		if (rateMove) {
			updateScore(e.pageY);
		}
	});
	rateZone.mouseleave(function(e){
		if (rateMove) {
			updateScore(e.pageY);
			rateMove = false;
		}
	});
	let updateScore = function(y) {
		let position = y - rateZone.offset().top,
			percent = 100 * position / rateZone.height();
		if(percent > 100) {
			percent = 100;
		}
		if(percent < 0) {
			percent = 0;
		}
		let rateNum = parseInt(100 - percent) / 10;
		$('.rate_name').html('Ваша оценка');
		$('.percentage-background').css('height', 100 - percent + '%');
		$('.rate').html(rateNum);
	};
}
function prepData(arr){
	let scoreData = {
		anime: arr[0],
		value: +$('.rate').html(),
		user: arr[1]
	};
	let score = that.get('store').createRecord('score',scoreData);
	score.save().then((data) => {
		this.set('anime.average_score', data.get('anime_average_score'));
	});
}
export default Ember.Component.extend({
	didInsertElement() {
		scoreMaker();
	},
	store: Ember.inject.service('store'),
	sessionAccount: Ember.inject.service(),
	actions:{
		sendScore(){
			that = this;
			let anime = this.get('anime'),
				user = this.get('sessionAccount.account'),
				arr = [anime, user];

			Ember.run.debounce(this, prepData, arr, 1000);
		}
	}
});
