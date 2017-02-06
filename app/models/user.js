import DS from 'ember-data';

export default DS.Model.extend({
	email: DS.attr('string'),
	password: DS.attr('string'),
<<<<<<< HEAD
	userGroup: DS.attr('string')
=======
	anime: DS.hasMany('anime')
>>>>>>> efa2e30ab04e212ce86d6e138bd68a4c1d187082
});
