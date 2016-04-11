module.exports = function(azureStorage) {
	var retryOperations = new azureStorage.ExponentialRetryPolicyFilter();
	var tableSvc = azureStorage.createTableService().withFilter(retryOperations);
	var query = new azureStorage.TableQuery().where('PartitionKey eq ?', 'measurements');

	return {
		getRootHandler: function(req, res, next) {
			tableSvc.queryEntities('arduinoData', query, null, function(error, result, response) {
			  if (error) {
			    return next(error);
			  }
				res.render('index.html', { entries: result.entries });
			});
		}
	};
};
