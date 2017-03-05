import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
	normalizeFindRecordResponse(store, primaryModelClass, payload) {
		let old = this._super(...arguments);

	    if(typeof(payload.meta) !== 'object'){
	      payload.meta = {};
	    }

	    old.data.attributes.meta = payload.meta;
		return old;
	}
});
