var eskclimate = (function eskclimate() {
    
    var app = function() {
        
    }
    
    var climateClient = function(url)
    {
        this._url = url;
    }
    climateClient.prototype = {
        getDeviceList: function() {
            var result = $.Deferred();
            result.resolve([
                {
                    id: "1",
                    name: "kuchyna"
                },
                {
                    id: "2",
                    name: "Uster corner"
                }
            ]);
            return result.promise();
        },
        getMeasures: function(deviceId) {
            var result = $.Deferred();
            result.resolve([
                {
                    id: 1,
                    deviceId: "1",
                    temperature: 20,
                    humidity: 60.5
                },
                {
                    id: 2,
                    deviceId: "1",
                    temperature: 19.5,
                    humidity: 62
                }
            ]);
            return result.promise();
        }
    }
    
    var deviceListViewMode = function(climateClient) {
        this._climateClient = climateClient;
        this.devices = ko.observableArray();
    }
    deviceListViewMode.prototype = {
        initialize: function() {
            var t = this;
            this._climateClient.getDeviceList().done(function(devices) { t._onDeviceListLoaded(devices); });
        },
        _onDeviceListLoaded: function(devices) {
            this.devices.removeAll();
            for (var i = 0; i < devices.length; i++) {
                this.devices.push(new deviceRowViewModel(devices[i]));
            }
        }
    }
    
    var deviceRowViewModel = function(device) {
        this._device = device;
        this.id = device.id;
        this.name = ko.observable(device.name);
    }
    
    return {
        app: app
    };
})();