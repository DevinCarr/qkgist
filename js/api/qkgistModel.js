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
			var key, file, fileId;

			for (key in json) {
				gist[key] = new Object();
				gist[key]['description'] = json[key]['description'];
				fileId = json[key]['id'];
				this.getContent(fileId, key);
				for (file in json[key]['files']) {
					gist[key]['filename'] = json[key]['files'][file]['filename'];
					gist[key]['content'] = "Loading...";
				}
				this.set(key, gist[key]);
			}
			this.emit('ready');
		},
		getContent: function(fileId, key) {
			var self = this;

			$.ajax({
				type: 'GET',
				url: 'https://api.github.com/gists/' + fileId,
				dataType: "json",
				success: function(json) {
					var data = '';
					for (var file in json['files']) {
						data = json['files'][file]['content'];
					}
					self.set(key.content, data)
					console.log(self.get(key).content)
					self.emit('gotContent');
				}
			});
		}
	})
});