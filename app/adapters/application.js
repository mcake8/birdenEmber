import Ember from 'ember';
import JSONAPIAdapter from 'ember-data/adapters/json-api';
import FormDataAdapterMixin from 'ember-cli-form-data/mixins/form-data-adapter';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

const { String: { pluralize, underscore } } = Ember;

export default JSONAPIAdapter.extend(DataAdapterMixin, FormDataAdapterMixin,{
  
  authorizer: 'authorizer:custom',
  pathForType(type) {
    return pluralize(underscore(type));
  }

});