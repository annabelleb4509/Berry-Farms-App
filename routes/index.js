var express = require('express');
var router = express.Router();
const passport = require('passport');
let nodeGeocoder = require('node-geocoder');

let options = {
  provider: 'openstreetmap'
};
 
let geoCoder = nodeGeocoder(options);

geoCoder.geocode('90 Albert St, Brunswick East VIC 3057')
  .then((res)=> {
    console.log(res);
  })
  .catch((err)=> {
    console.log(err);
  });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Berries' });
});


router.get('/auth/google', passport.authenticate(
  'google',
  {
    scope: ['profile', 'email'],
  }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/farms',
    failureRedirect: '/farms'
  }
));

router.get('/logout', function(req, res){
  req.logout(function() {
    res.redirect('/farms');
  });
});

module.exports = router;
