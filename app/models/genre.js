import DS from 'ember-data';

export default DS.Model.extend({
	animes: DS.hasMany('anime'),
	name: DS.attr('string'),
	check: false
});
