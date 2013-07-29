require.config({
	paths: {
		jquery: 'lib/jquery.min',
		mustache: 'lib/mustache',
		stapes: 'lib/stapes.min'
	}
});

define(['api/qkgistModel', 'api/qkgistView', 'api/qkgistController'], function(qModel, qView, qControl) {
	var model = new qModel("DevinCarr"),
		view = new qView(model);

	new qControl(model, view);
	view.show();
});