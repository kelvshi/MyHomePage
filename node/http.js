var connect = require('connect');
var serveStatic = require('serve-static');
var app = connect();
app.use(function(req, res){
	console.log(req);
});
app.listen(3000);