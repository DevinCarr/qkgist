require.config({
	paths: {
		jquery: 'lib/jquery.min',
		mustache: 'lib/mustache',
		stapes: 'lib/stapes.min',
		bootstrap: 'lib/bootstrap.min'
	},
	shim: {
		'bootstrap':{
			deps: ['jquery']
		}
	}
});

define(['jquery', 'bootstrap', 'api/qkgistModel', 'api/qkgistView', 'api/qkgistController'], function($, Bootstrap, qModel, qView, qControl) {
	var model = new qModel("DevinCarr"),
		view = new qView(model);

	new qControl(model, view);
	view.show();
});