import DS from 'ember-data';

export default DS.Model.extend({
	user: DS.belongsTo('user'),
	series: DS.belongsTo('series'),
	is_watch: DS.attr('boolean')
});