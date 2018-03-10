var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var pull_request = require('./pullrequest.js');
var config = require('config');
var cors = require('cors');
var Log = require('log');
var logStream = fs.createWriteStream(config.get('log.file.path'));
const log = new Log(config.get('log.level'),
  {
    write: function (msg) {
      if (config.has('log') &&
        config.get('log.enable')) {
        if (config.has('log.file') &&
          config.get('log.file.enable')) {
          logStream.write(msg);
        }
      }
    }
  });


app.use(bodyParser.json());
app.use(function timelog(req, res, next){
  log.debug('incoming request Time: ', Date.now())
  next()
});

app.post('/*', function(req, res){
  log.info("A post request is comming.");
  pull_request.process(req.body);
  res.sendStatus(204);
});

app.post('*/ping', function(req, res){
  log.info("Ping Request Received");
  log.debug("req", req);
  log.debug("req body is:", req.body);

  res.sendStatus(204)
});


app.listen(80, ()=>{
  global.log = log ;
  global.log.info('The Server Started Successfully!')
});
