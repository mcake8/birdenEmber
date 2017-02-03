import DS from 'ember-data';

export default DS.Model.extend({
	video: DS.attr('file'),
	number: DS.attr('string'),
	anime: DS.belongsTo('anime', { async: true }),
	thumb: DS.attr('string'),
	cover: DS.attr('string'),
	is_video_preview: DS.attr('boolean')
});
