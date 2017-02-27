import Ember from 'ember';
import IsAdminMixin from 'birden-io/mixins/is-admin';

export default Ember.Route.extend(IsAdminMixin, {
	model(params){
		return Ember.RSVP.hash({
			genres: this.store.findAll('genre'),
			anime: this.store.findRecord('anime',params.anime_id)
		});
	}
});
