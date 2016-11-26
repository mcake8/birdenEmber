import DS from 'ember-data';

export default DS.Model.extend({
	video: DS.attr('string'),
	number: DS.attr('string'),
	anime: DS.belongsTo('anime', { async: true }),
});
