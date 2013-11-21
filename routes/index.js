var DigitalOceanAPI = require('digitalocean-api');
var keys = require('../keys.json');

// Create an instance with your API credentials
var api = new DigitalOceanAPI(keys.clientId, keys.apiKey);

exports.index = function(req, res){

  api.dropletGetAll(function(error, droplets){
    res.render('index', {droplets: droplets});
  });

};

exports.start = function(req, res) {

  var serverId = req.params.serverId;

  api.dropletPowerOn(serverId, function(error, data){
    if (error) {
      res.send(500, error);
    } else {
      res.send(200);
    }
  });

};