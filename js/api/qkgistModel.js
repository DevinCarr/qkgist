define(['jquery', 'stapes'], function($, Stapes) {
	var gist = new Object();
	return Stapes.subclass({
		constructor: function(user) {
			this.set('userName', user, false);
			this.set('userLink', 'https://gist.github.com/' + user, false);
		},
		addItem: function(item) {
			this.push(item);
		},
		removeItem: function(itemToRemove) {
			this.remove(function(item) {
				return item === itemToRemove;
			});
		},
		apiCall: function() {
			var self = this;
			$.ajax({
				type: 'GET',
				url: 'https://api.github.com/users/' + self.get('userName') + '/gists',
				dataType: 'json',
				success: function(json) {
					self.setModelData(json);
				},
				error: function(e) {
					console.log(e)
				}
			});
		},
		setModelData: function(json) {
			var key, file, fileName;

			for (key in json) {
				gist[key] = new Object();
				gist[key]['description'] = json[key]['description'];
				for (file in json[key]['files']) {
					gist[key]['filename'] = json[key]['files'][file]['filename'];
					gist[key]['content'] = "Loading...";
					fileName = json[key]['files'][file]['raw_url'];
					this.getContent(fileName, key);
				}
				this.push(gist[key]);
			}
			this.emit('ready');
		},
		getContent: function(fileUrl, key) {
			var self, text, file;
			self = this;

			$.ajax({
				type: 'GET',
				url: fileUrl,
				dataType: "jsonp text",
				success: function(data) {
					self.set(gist[key]['content'], text)
					self.emit('gotContent');
				}
			});
		}
	})
});