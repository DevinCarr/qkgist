define(['jquery', 'stapes'], function($, Stapes) {
	return Stapes.subclass({
		constructor: function(model, view) {
			this.model = model;
			this.view = view;
		}
	});
});