var port = process.env.PORT || 1234;
var express = require('express');
var hbs = require('hbs');
var azureStorage = require('azure-storage');

var app = express();
app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.static('static'));

var bodyParser = require('body-parser');
app.use(bodyParser.json());

var uiContr = require('./controllers/uiController');
app.get('/', uiContr.getRootHandler);

var restContr = require('./controllers/restController')(azureStorage);
app.post('/rest/data', restContr.postDataHandler);

var tableSvc = azureStorage.createTableService();
tableSvc.createTableIfNotExists('arduinoData', function(error, result, response){
	if(error){
		console.error('Server initialization failed', err);
		process.exit(1);
	}
	else {
		console.log('Table ' + (result.created ? 'created' : 'exists'))
		app.listen(port, function(err) {
			if (err) {
				console.error('Server initialization failed', err);
				process.exit(1);
			}
			else {
				console.log('Server listening');
			}
		});
	}
});
