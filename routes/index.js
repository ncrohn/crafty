var AWS = require('aws-sdk');
var keys = require('../keys.json');

var ec2 = new AWS.EC2(keys);

function getValue(hashes, key) {
  for(var i=0;i<hashes.length;i++) {
    if(hashes[i].Key === key) {
      return hashes[i].Value;
    }
  }

  return null;
}

exports.index = function(req, res){

  ec2.describeInstances({
      Filters: [{
        Name: 'tag-key',
        Values: ['group']
      },{
        Name: 'tag-value',
        Values: ['minecraft']
      }]
    }, function(error, data){
      if (error) { return res.send(500, error); }

      var instances = [];
      for(var i=0;i<data.Reservations.length;i++) {
        var reservation = data.Reservations[i];

        for(var j=0;j<reservation.Instances.length;j++) {
          var inst = reservation.Instances[j];

          var instance = {
            id: inst.InstanceId,
            name: getValue(inst.Tags, 'Name'),
            ip_address: inst.PublicIpAddress,
            status: inst.State.Name
          };

          instances.push(instance);
        }
      }

      return res.render('index', {instances: instances});
    });

};

exports.start = function(req, res) {

  var serverId = req.params.serverId;

  ec2.startInstances({
    InstanceIds: [serverId]
  }, function(error, data){
    if (error) {
      res.send(500, error);
    } else {
      res.send(200);
    }
  });

};