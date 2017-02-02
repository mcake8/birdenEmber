import Ember from 'ember';

export default Ember.Service.extend({
	isNone(...a) {
		let empty = false;
		a.forEach((item) => {
			if (item.length === 0 || item === undefined) {
				empty = true;
			}
		});
		return empty;
	}
});
