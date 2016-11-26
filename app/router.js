import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('main', { path: '/'}, function() {
  	this.route('library', { path: '/'});
  	this.route('anime', function(){
        this.route('page', { path: '/:anime_id'});
        this.route('new');
        this.route('edit', {path: '/:anime_id/edit'});
  	});
  	this.route('admin');
  });
  this.route('generator');
  this.route('main\\admin\\anime');
});

export default Router;
