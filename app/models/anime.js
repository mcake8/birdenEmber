import DS from 'ember-data';

export default DS.Model.extend({
	cover: DS.attr('file'),
	title: DS.attr('string'),
	manufacturer: DS.attr('string'),
	video_preview: DS.attr('string'),
	genres: DS.hasMany('genre'),
	type: DS.attr('string'),
	date: DS.attr('string'),
	description: DS.attr('string'),
	series: DS.hasMany('series', { async: true }),
	subscribers: DS.attr('string')
});
