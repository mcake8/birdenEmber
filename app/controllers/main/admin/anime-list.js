import Ember from 'ember';

export default Ember.Controller.extend({
	queryParams: ['category'],
	category: 'все',

	actions: {
		updateCategoryValue(name) {
			this.set('animeItems', name);
		},
		delete(deleteId, sec){
			sec.target.closest('tr').style.display = 'none';
			this.store.findRecord('anime', deleteId).then((anime) =>{
				anime.deleteRecord();
				anime.save();
			});			
		}
	}
});
