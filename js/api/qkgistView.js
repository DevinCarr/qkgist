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
		},
		setContent: function() {
			console.log(this.model.getAllAsArray())
			// for (var key in this.model.getAllAsArray()) {
			// 	var template = $(templateHTML).filter('#template-module').html();
			// 	var output = Mustache.render(template, content);
			// 	$('#qkgistsContainer').html(output);
			// }
		}
	});
});