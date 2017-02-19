import DS from 'ember-data';

export default DS.Model.extend({
	anime: DS.belongsTo('anime'),
	user: DS.belongsTo('user')
});
