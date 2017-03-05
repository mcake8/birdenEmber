import DS from 'ember-data';

export default DS.Model.extend({
	value: DS.attr('number'),
	anime: DS.belongsTo('anime'),
	user: DS.belongsTo('user')
});
