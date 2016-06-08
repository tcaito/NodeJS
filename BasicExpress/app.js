var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

const hostname = '127.0.0.1';
const port = 1337;

var app = express();

// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

app.listen(port);
console.log('Server is running on ' + hostname + ':' + port);
