import DS from 'ember-data';

export default DS.Model.extend({
	subscribe: DS.attr('arr'),
	name: DS.attr('string'),
	pass: DS.attr('string')
});
