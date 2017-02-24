import Ember from 'ember';

export default Ember.Component.extend({
	classNames: 'pos-2',
	mouseEnter() {
		Ember.run.later(this, function() {
			let arr = this.get('notifications').filterBy('is_watch', false);
			arr.forEach(function(item) {
				item.set('is_watch', true);
				item.save();
			});
		}, 1300);
	},
	_setup: (function() {
		let new_notifications = this.$().find('.notify-list__item_is-watch');
		new_notifications.each(function(index, element) {
			//console.log($(element).position().top);
		});

	}).on('didInsertElement'),
	recentCount: Ember.computed('notifications.@each.is_watch', function() {
		let arr = this.get('notifications').filterBy('is_watch', false);
		return arr.length;
	}),
	list: Ember.computed('notifications', function() {
		let arr = this.get('notifications').sortBy('is_watch');
		return arr;
	})
});
