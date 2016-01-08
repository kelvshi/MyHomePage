/**
 * 测试DEMO
 * @author weixin
 */
define('model/my', function(require, exports, module) {
	var app = require('helper/base');
	var undef;

	var My = app.BaseModel.extend({
		defaults: {
			id: undef,
			name: undef,
			isFocus: undef
		},
		// 关注该课程
		focus: function() {
			var self = this;
			return this.ajax({
				url: '/focus/do',
				data: {
					oid: this.get('id'),
					op: 1,
					otype: 1
				}
			}).done(function() {
				self.set('isFocus', true);
			});
		},
		// 取消关注该课程
		unfocus: function() {
			var self = this;
			return this.ajax({
				url: '/focus/do',
				data: {
					oid: this.get('id'),
					op: 2,
					otype: 1
				}
			}).done(function() {
				self.set('isFocus', false);
			});
		}
	});

	module.exports = My;
});