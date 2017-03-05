import Ember from 'ember';

export default Ember.Component.extend({
	valid: 'none',
	store: Ember.inject.service('store'),
	cover: '',
	metaCover: '',
	init() {
		this._super(...arguments);
		this.get('store').findAll('genre').then((data) => {
			this.set('genres', data);
		});
	},
	genreIterator(genres) {
		let _this = this;
		genres.forEach(function(item) {
			_this.get('store').queryRecord('genre', {
				name: item
			}).then((data) => {
				if (data == null) {
					_this.get('store').createRecord('genre', {
						name: item
					});
					console.log('doesnt');
				}
				console.log('worked');
				data.set('check', true);
			}).catch(() => {
				console.log('rejected');
				return false;
			});
		});
	},
	actions: {
		sendData() {
			let items = this.get('store').peekAll('genre');
			let arr = ['title', 'manufacturer','date', 'description','anime_type','cover'];
			let data = this.getProperties(arr);

			data.genres = items.filterBy('check', true);
			
			// for (let item in data) {
			// 	if (data[item] === undefined) {
			// 		return this.set('valid', 'block');
			// 	}
			// 	this.set('valid', 'none');
			// }
			if (!Ember.isPresent(data.cover)) {
				data.meta = {
					cover_url: this.get('metaCover')
				};
			}
			let animeToBase = this.get('store').createRecord('anime', data);

			animeToBase.save();

			// this.set('title','');
			// this.set('manufacturer','');
			// this.set('date','');
			// this.set('description','');
			// this.set('anime_type','');
			// this.set('cover','');
			
		},
		addOnUrl() {
			let _this = this;
			let link = 'http://192.168.1.33:3000/animes/nokogiri/?url=' + this.get('url');
			Ember.$.ajax({
			   url: link,
			   crossDomain: true,
			   dataType: 'json',
			   error() {
			      Ember.$('#info').html('<p>An error has occurred</p>');
			   },
			   success(data) {
			    _this.set('title', data.title);
			    _this.set('metaCover', data.remote_cover_url);	
			    _this.set('manufacturer',data.manufacturer);
			    _this.set('type',data.animeType);
			    _this.genreIterator(data.genres);
			    _this.set('date',data.date);
			    _this.set('description',data.description);
			   },
			   type: 'GET'
			});

		},
		receiveFile(file){
			// let asset = {
			// 	image:  file,
   //      		imageName: file.name,
			// }
			// this.get('assets').pushObject(asset);
			// console.log(this.get('assets'))
			this.set('cover', file);
	    }
	    // uploadProgress: function(progress){
	    //   this.set('assets.lastObject.progress', progress);
	    // }
	}
		
});
