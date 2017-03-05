import DS from 'ember-data';

export default DS.Model.extend({
	value: DS.attr('number'),
	anime: DS.belongsTo('anime'),
	anime_average_score: DS.attr('number'),
	user: DS.belongsTo('user')
});
