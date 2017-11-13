var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var pull_request = require('./pullrequest.js')

app.use(bodyParser.json());
app.use(function timelog(req, res, next){
  console.log('Time: ', Date.now())
  next()
})

app.all('*', function(req, res, next){
  
  next()
}) 
app.post('/*', function(req, res){
  pull_request.process(req.body)
  res.sendStatus(204)
})



app.listen(80, ()=>{
  console.log('The Server Started Successfully!')
});
