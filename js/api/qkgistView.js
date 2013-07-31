define(['jquery', 'stapes', 'mustache', 'text!template/template.html'], function($, Stapes, Mustache, templateHTML) {
	return Stapes.subclass({
		constructor: function(model) {
			this.model = model,

			this.model.on({
	    		'ready': function() {
	    			this.setPanel();
	    		},
	    		'gotContent': function() {
	    			this.setContent();
	    		}
	    	}, this);
		},
		show: function() {
			this.buildModule();
			this.model.apiCall();
		},
		buildModule: function() {
			var template = $(templateHTML).filter('#template-module').html();
			var output = Mustache.render(template, {
				userName: this.model.getUserDetails().userName,
				userLink: this.model.getUserDetails().userLink
			});
			$('#qkgist').html(output);
		},
		setPanel: function() {
			var gists = this.model.getAllAsArray();
			for (var i = 0; i < this.model.size(); i++) {
				$('#qkgistsContainer').append('<div id="gistpanel' + i + '"></div>');
				var template = $(templateHTML).filter('#template-qkgist').html();
				var output = Mustache.render(template, {
					description: gists[i].description,
					filename: gists[i].filename,
					content: gists[i].content
				});
				$('#gistpanel' + i).html(output);
			}
		},
		setContent: function() {
			var gists = this.model.getAllAsArray();
			for (var i = 0; i < this.model.size(); i++) {
				var loc = '#gistpanel' + i
				$(loc).find('#content').html(gists[i].content);
			}
		}
	});
});