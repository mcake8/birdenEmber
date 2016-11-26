import DS from 'ember-data';

export default DS.Model.extend({
	anime: DS.hasMany('anime', { async: true }),
	name: DS.attr('string'),
});
