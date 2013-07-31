define(['jquery', 'stapes'], function($, Stapes) {
	return Stapes.subclass({
		constructor: function(model, view) {
			this.model = model;
			this.view = view;

			this.view.on('newUser', function() {
				this.pullUser();
			}, this);
		},
		pullUser: function() {
			this.model.remove();
			this.model.apiCall();
		}
	});
});