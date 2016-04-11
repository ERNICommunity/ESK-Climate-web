module.exports = function(azureSotrage) {
	var retryOperations = new azureSotrage.ExponentialRetryPolicyFilter();
	var tableSvc = azureSotrage.createTableService().withFilter(retryOperations);
	var entGen = azureSotrage.TableUtilities.entityGenerator;

	return {
		postDataHandler: function(req, res, next) {
			var task = {
			  PartitionKey: entGen.String('hometasks'),
			  RowKey: entGen.String('1'),
			  description: entGen.String('take out the trash'),
			  dueDate: entGen.DateTime(new Date(Date.UTC(2015, 6, 20))),
			};
			tableSvc.insertEntity('arduinoData',task, function (error, result, response) {
			  if(!error){
			    res.send('ok');
			  }
			});
		}
	};
};
