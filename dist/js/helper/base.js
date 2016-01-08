/**
 * 基础框架，所有类都必须继承自这里的基础模型
 * @author weixin
 */
define('helper/base', function(require, exports, module) {
	var app = exports;
	var singleton = function() {
		if(!this.__instache) {
			this.__instache = new this();
		}
		return this.__instache;
	};

	/**
	 * 添加支持.super函数来调用父层函数
	 */
	var extend = function(protoProps, staticProps) {
		var args = _.toArray(arguments);
		var fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
		// backbone deal with constructor unlike other prototype function
		if(_.has(protoProps, 'constructor')) {
			if(fnTest.test(protoProps.constructor)) {
				var constructor = protoProps.constructor;
				protoProps.constructor = function() {
					var tmp = this._super;
					this._super = _super.constructor;
					var ret = constructor.apply(this, arguments);
					this._super = tmp;
					return ret;
				};
			}
		}


		var child = Backbone.Model.extend.apply(this, args);
		var prototype = child.prototype;
		var _super = child.__super__;

		for (var name in protoProps) {
			// Check if we're overwriting an existing function
			prototype[name] = typeof protoProps[name] == "function" &&
				typeof _super[name] == "function" && fnTest.test(protoProps[name]) ?
				(function(name, fn) {
					return function() {
						var tmp = this._super;

						// Add a new ._super() method that is the same method
						// but on the super-class
						this._super = _super[name];

						// The method only need to be bound temporarily, so we
						// remove it when we're done executing
						var ret = fn.apply(this, arguments);
						this._super = tmp;

						return ret;
					};
				})(name, protoProps[name]) : protoProps[name];
		}

		return child;
	};
	
	app.ajax = function() {
		return Backbone.ajax.apply(this, arguments);
	};

	app.BaseView = Backbone.View.extend({
		ajax: app.ajax
	}, {
		singleton: singleton,
		extend: extend
	});

	app.BaseModel = Backbone.Model.extend({
		ajax: app.ajax
	}, {
		singleton: singleton,
		extend: extend
	});

	app.BaseCollection = Backbone.Collection.extend({
		ajax: app.ajax
	}, {
		singleton: singleton,
		extend: extend
	});

	app.Router = Backbone.Router.extend({
		alias: {},
		routes: {
			':module/:controller/:action/*params': 'moduleRouter',
			':module/:controller/:action': 'moduleRouter',
			':controller/:action/*params': 'router',
			':controller/:action': 'router',
			':controller': 'router',
			'': 'router',
		},
		router: function(controller, action, params) {
			var path = [controller, action].join('/');
			var actionPath = path;
			var rawPath = [path, params].join('/');
			params = this.parseParams(params);
			path = path.toLowerCase();
			actionPath = actionPath.toLowerCase();
			
			if(this.alias[path]) {
				if(_.isObject(this.alias[path])) {
					actionPath = this.alias[path].action;
					if(this.alias[path].params) {
						_.extend(params, this.alias[path].params);
					}
				} else {
					actionPath = this.alias[path];
				}
				if(actionPath !== '/') {
					require.async('page/'+actionPath, function(Action) {
						if(!Action) return;
						var action = new Action({}, params);
						action.params = params;
					});
				}
			}
		},
		moduleRouter: function(m, controller, action, params) {
			this.router([m, controller].join('/'), action, params);
		},
		parseParams: function(rawParams) {
			if(!rawParams) {
				return {};
			}
			// normalize
			rawParams.replace(/\/+/g, '\/');
			// split by /
			rawParams = rawParams.split('/');
			rawSearch = [];
			rawParams = _.filter(rawParams, function(value) {
				if(/\=/.test(value)) {
					rawSearch = rawSearch.concat(value.split('&'));
				} else {
					return value;
				}
			});

			var keys = _.reject(rawParams, function(value, key){ return key % 2 == 1; });
			var values = _.reject(rawParams, function(value, key){ return key % 2 == 0; });

			var params = _.object(keys, values);

			_.each(rawSearch, function(search) {
				if(!search) return;
				var key = search.split('=')[0];
				var value = search.split('=')[1];
				if(key) {
					params[key] = value;
				}
			});
			return params;
		},
		alisLowerCase: function() {
			var alias = {};
			_.each(this.alias, function(value, key) {
				alias[key.toLowerCase()] = value;
			});

			this.alias = alias;
		},
		initialize: function() {
			this.alisLowerCase();
		}
	});
});