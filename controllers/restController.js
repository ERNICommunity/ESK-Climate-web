module.exports = function(azureStorage) {
	var retryOperations = new azureStorage.ExponentialRetryPolicyFilter();
	var tableSvc = azureStorage.createTableService().withFilter(retryOperations);
	var entGen = azureStorage.TableUtilities.entityGenerator;
	var uuid = require('node-uuid');

	return {
		postDataHandler: function(req, res, next) {
			var data = {
				PartitionKey: entGen.String('measurements'),
  			RowKey: entGen.String(uuid.v1()), //entGen.Guid
			  sensorId: entGen.String(req.body.sensorId),
			  temperature: entGen.Double(req.body.temperature),
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
