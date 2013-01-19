
/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes'),
	http = require('http'),
	path = require('path'),
	engine = require('ejs-locals');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 5000);
  app.engine('ejs', engine);
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/views');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

if (process.env.DEBUG) {
	app.configure('development', function(){
	  app.use(express.errorHandler());
	});
}

app.get('/', routes.index);
app.get(/-detail$/, routes.detail);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
