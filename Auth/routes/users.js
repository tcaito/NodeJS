var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './uploads'});

var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register', {
    title: 'Register'
  });
});

router.post('/register', upload.single('profileimage'), function(req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  if(req.file) {
    var profileImage = req.file.filename;
  } else {
    var profileImage = 'noimage.jpg'
  }

  // Form validation
  req.checkBody('name', 'Name field is required').notEmpty();
  req.checkBody('email', 'Email field is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username field is required').notEmpty();
  req.checkBody('password', 'Password field is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  // Check errors
  var errors = req.validationErrors();

  if(errors) {
    res.render('register', {
      errors: errors,
      title: 'Register'
    });
  } else {
    var newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password,
      profileimage: profileImage
    });

    User.createUser(newUser, function(err, user){
      if(err) throw err;
      console.log(user);
    });

    req.flash('success', 'You are now registered and can log in.');
    res.location('/');
    res.redirect('/');
  }
});

router.get('/login', function(req, res, next) {
  res.render('login', {
    title: 'Login'
  });
});

module.exports = router;
