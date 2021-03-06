import Ember from 'ember';

export default Ember.Component.extend({  
  tagName: 'div',
  classNames: 'uploader dropzone'.w(),
  classNameBindings: 'isDragging isDisabled:is-disabled'.w(),
  attributeBindings: 'data-uploader'.w(),
  'data-uploader': 'true',
  isDisabled: false,
  didInsertElement: function(){
    var _this = this;

    this.$().on('uploadProgress', function(evt){
      if(evt.progress === 1){
        _this.set('isDisabled', false);
      }
      _this.sendAction('uploadProgress', evt.progress);
    });
  },

  dragOver: function(event){
    event.preventDefault();
  },

  dragEnter: function(event){
    event.preventDefault();
    this.set('isDragging', true);
  },

  dragLeave: function(event){
    event.preventDefault();
    this.set('isDragging', false);
  },

  drop: function(event){
    var file;

    if(!this.get('isDisabled')){
      event.preventDefault();
      this.set('isDragging', false);

      // only 1 file for now
      file = event.dataTransfer.files[0];
      this.set('isDisabled', true);
      this.sendAction('fileInputChanged', file);
    } else{
      console.error('you can only upload on file at the time');
    }
  },
  actions: {
  	buttonChange(){
	  	let file = Ember.$("#fileCover")[0].files[0];
	  	console.log(file)
	    this.sendAction('fileInputChanged', file);
	}
  }
  
});