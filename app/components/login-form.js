import Ember from 'ember';

export default Ember.Component.extend({
	logVal: '',
	passVal: '',
	isDisabled: Ember.computed('logVal', 'passVal', function() {
		let passVal = this.get('passVal'),
			logVal = this.get('logVal');

		if (logVal.length <= 0 && passVal.length <= 0) {
			return true;
		} 
	}),
	actions: {
		validator(){
			
		}
	}
});
