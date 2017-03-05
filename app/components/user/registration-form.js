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
	authenticate() {
      	let credentials = this.getProperties('identification', 'password'),
        	authenticator = 'authenticator:jwt';
      	this.get('session').authenticate(authenticator, credentials);
	},
	actions: {
		registration() {
	      	let password = this.get('password'),
				identification = this.get('identification'),
				repeatPassword = this.get('repeatPassword');
	      	if (password === repeatPassword) {
	      		this.set('errorMessage', false);
		      	let createUser = this.get('store').createRecord('user', {
		      		email: identification,
		      		password: repeatPassword
		      	});
		      	createUser.save().then(() => {
					this.authenticate();
		      	});
	      	} else {
	      		this.set('errorMessage', true);
	      	}
	    }
	}
});
