import Ember from 'ember';

export default Ember.Component.extend({  
  tagName: 'div',
  classNames: 'asset'.w(),
  file: {},
  progress: function(){
  	console.log('asdasd')
    return 'width:'+(this.get('file.progress')*100)+'%';
  }.property('file.progress'),
  isUploading: function(){
  	onsole.log('asdasd')
    return this.get('file.progress') !== 1;
  }.property('file.progress')
});