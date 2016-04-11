module.exports = function(azureSotrage) {
	var retryOperations = new azureSotrage.ExponentialRetryPolicyFilter();
	var tableSvc = azureSotrage.createTableService().withFilter(retryOperations);
	var entGen = azureSotrage.TableUtilities.entityGenerator;
	var uuid = require('node-uuid');

	return {
		postDataHandler: function(req, res, next) {
			console.dir(req.body);
			var data = {
				PartitionKey: entGen.String('measurements'),
  			RowKey: entGen.String(uuid.v1()), //entGen.Guid
				timestamp : entGen.DateTime(new Date()),
			  sensorId: entGen.String(req.body.sensorId),
			  temparature: entGen.Double(req.body.temperature),
			  humidity: entGen.Double(req.body.humidity)
			};
			tableSvc.insertEntity('arduinoData', data, function (error, result, response) {
			  if(error){
			    return next(error);
			  }
				res.sendStatus(201); //created
			});
		}
	};
};
