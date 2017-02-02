import Ember from 'ember';

export default Ember.Component.extend({
	store: Ember.inject.service('store'),
	valid: Ember.inject.service('valid'),
	session: Ember.inject.service(),
	identification: '',
	password: '',
	repeatPassword: '',
	isDisabled: Ember.computed('identification', 'password', 'repeatPassword', function() {
		let password = this.get('password'),
			identification = this.get('identification'),
			repeatPassword = this.get('repeatPassword');
		if (this.get('valid').isNone(identification,password,repeatPassword)) {

			return true;
		}
		
	}),
	actions: {
		registration() {
	      	let user = {
	      		email: this.get('identification'),
	      		password: this.get('password')
	      	};
	      	let password = this.get('password'),
				identification = this.get('identification'),
				repeatPassword = this.get('repeatPassword');

	      	if (password === repeatPassword) {
		      	let createUser = this.get('store').createRecord('user', {
		      		email: identification,
		      		password: repeatPassword
		      	});
		      	console.log(user);
		      	console.log(createUser);

		      	createUser.save();
	      	} else {
	      		console.log('error')
	      	}
	      	var credentials = this.getProperties('identification', 'password'),
	        	authenticator = 'authenticator:jwt';
	      	this.get('session').authenticate(authenticator, credentials).catch((reason)=>{
		        this.set('errorMessage', reason.error || reason);
		    });
	    }
	}
});
