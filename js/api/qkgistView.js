define(['jquery', 'stapes', 'mustache', 'text!template/template.html'], function($, Stapes, Mustache, templateHTML) {
	return Stapes.subclass({
		constructor: function(model) {
			this.model = model,

			this.model.on({
	    		'change': function() {
	    			this.buildModule();
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
				userName: this.model.get('userName'),
				userLink: this.model.get('userLink')
			});
			$('#qkgist').html(output);
			this.model.removeItem('userName');
			this.model.removeItem('userLink');

		},
		setContent: function() {
			for (var i = 0; i < this.model.getAllAsArray().length; i++) {
				$('#qkgistsContainer').append('<div id="panel' + i + '"></div>')
				var template = $(templateHTML).filter('#template-qkgist').html();
				var output = Mustache.render(template, {
					description: this.model.get(i['description']),
					filename: this.model.get(i['filename']),
					content: this.model.get(i['content'])
				});
				console.log(i)
				$('#panel' + i).html(output);
			}
		}
	});
});