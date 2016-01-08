/**
 * 全局入口
 * @author kelvshi
 */
define('app', function(require, exports, module) {
	// 扩展base对象作为全局app
	var app = window.app = require('helper/base');
	var myModel = require("model/my");
	var MainView = app.BaseView.extend({
		el:document.body,
		events:{
			"click h1": function(e){
				console.log(e);
			},
		},
		initialize:function(options, param){
			this.model = new myModel();
			console.log(param);
		}
	});
	app.mainView = new MainView();
	module.exports = app;
})