var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var vaccines = require('./vaccines-api.js');

app.use(bodyParser.json());
app.use('/vaccines', vaccines)

app.get('/', function (req, res) {
   res.send('Hello World');
})

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

module.exports = app
