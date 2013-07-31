define(['jquery', 'stapes'], function($, Stapes) {
	var gist = new Object();
	var userDetails = new Object();
	return Stapes.subclass({
		constructor: function(user) {
			userDetails['userName'] = user;
			userDetails['userLink'] = 'https://gist.github.com/' + user;
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
				url: 'https://api.github.com/users/' + userDetails.userName + '/gists',
				dataType: 'json',
				success: function(json) {
					self.setModelData(json);
				},
				error: function(e) {
					console.log(e)
				}
			});
		},
		getUserDetails: function() {
			return userDetails;
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
				this.set('name' + key, gist[key]);
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
					var a = self.get(('name' + key))
					a.content = data;
					self.emit('gotContent');
				}
			});
		}
	})
});