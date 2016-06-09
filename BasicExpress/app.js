var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

const hostname = '127.0.0.1';
const port = 1337;

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.render('index', {'title': 'Index'});
});

app.get('/about', function(req, res){
  res.render('about', {'title': 'About'});
});

app.get('/services', function(req, res){
  res.render('services', {'title': 'Services'});
});

app.get('/contact', function(req, res){
  res.render('contact', {'title': 'Contact Us'});
});

app.post('/contact/send', function(req, res){
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'tcaito31@gmail.com',
      pass: 'gfnznatrzdvvxtth'
    }
  });

  var mailOptions = {
    from: 'Tommy Caito <tcaito31@gmail.com>',
    to: 'tcaito@umich.edu',
    subject: 'Website Submission',
    text: 'You have a submission with the following details... \nName: ' + req.body.name + '\nEmail: ' + req.body.email + '\nMessage: ' + req.body.message,
    html: '<p>You have a submission with the following details...</p><ul><li>Name: ' + req.body.name + '</li><li>Email: ' + req.body.email + '</li><li>Message: ' + req.body.message + '</li></ul>'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
      res.redirect('/');
    } else{
      console.log('Message Sent: ' + info.response);
      res.redirect('/');
    }
  })
});

app.listen(port);
console.log('Server is running on ' + hostname + ':' + port);
