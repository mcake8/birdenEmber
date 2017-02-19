import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
	attrs: {
		meta: { serialize: false }
	}
});
