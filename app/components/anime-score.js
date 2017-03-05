import Ember from 'ember';
const $ = Ember.$;
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
		$('.percentage-background').css('height', 100 - percent + '%');
		$('#rate').html(rateNum);
	};
}
function prepData(arr){
	let scoreData = {
		anime: arr[0],
		value: +$('#rate').html(),
		user: arr[1]
	};
	let score = this.get('store').createRecord('score',scoreData);
	score.save();
}
export default Ember.Component.extend({
	didInsertElement() {
		scoreMaker();
	},
	store: Ember.inject.service('store'),
	sessionAccount: Ember.inject.service(),
	actions:{
		sendScore(){
			let anime = this.get('anime'),
				user = this.get('sessionAccount.account'),
				arr = [anime, user];

			Ember.run.throttle(this, prepData, arr, 5000);
		}
	}
});
