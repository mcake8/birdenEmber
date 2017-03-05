import Ember from 'ember';

export default Ember.Component.extend({
	valid: Ember.inject.service('valid'),
	session: Ember.inject.service(),
	identification: '',
	password: '',
	isDisabled: Ember.computed('identification', 'password', function() {
		let password = this.get('password'),
			identification = this.get('identification');
		if (this.get('valid').isNone([identification,password])) {

			return true;
		} 
	}),
	actions: {
		authenticate() {
	      	var credentials = this.getProperties('identification', 'password'),
	        	authenticator = 'authenticator:jwt';
	      	this.get('session').authenticate(authenticator, credentials).catch((reason)=>{
		        this.set('errorMessage', reason.error || reason);
		    });
	    }
	}
});
