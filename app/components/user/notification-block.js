import Ember from 'ember';

export default Ember.Component.extend({
	classNames: 'pos-2',
	sortBy: ['is_watch'],
	mouseEnter() {
		Ember.run.later(this, function() {
			let arr = this.get('notifications').filterBy('is_watch', false);
			arr.forEach(function(item) {
				item.set('is_watch', true);
				item.save();
			});
		}, 1300);
	},
	recentCount: Ember.computed('notifications.@each.is_watch', function() {
		let arr = this.get('notifications').filterBy('is_watch', false);
		return arr.length;
	}),
	list: Ember.computed.sort('notifications', 'sortBy')
});
