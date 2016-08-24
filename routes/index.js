var express = require('express');
var router = express.Router();
var request = require('request');
var http = require('http');
var passport = require('passport');
var id  = 'e0046986'
var key = '19a325da07c1db5ab26a44d816031d33'



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Food Journal', message: req.flash() });
});

//SIGN UP
router.get('/signup', function(req, res, next) {
  res.render('signup', {message: req.flash() })
})

//POST /signup
router.post('/signup', function(req, res, next) {
  console.log('signup: req.body = ', req.body);
  var signUpStrategy = passport.authenticate('local-signup', {
    successRedirect : '/entries',
    failureRedirect : '/signup',
    failureFlash : true
  });

  return signUpStrategy(req, res, next);
});

//GET login
router.get('/login', function(req, res, next) {
  res.render('login.ejs', { message: req.flash() });
});

//POST /login
router.post('/login', function(req, res, next) {
  var loginProperty = passport.authenticate('local-login', {
    successRedirect : '/entries',
    failureRedirect : '/login',
    failureFlash: true
  });
  return loginProperty(req, res, next);
});

// GET /logout
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

router.get('/secret', function(req, res, next) {
  if (currentUser) {
    res.render('secret.ejs');
  }
  else {
    res.redirect('/');
  }
});

router.get('/calorietracker', function(req, res, next) {
  res.render('calorietracker.ejs', { message: req.flash() });
});

router.get('/calorieresults', function(req, res, next) {
  request
    .get('https://api.nutritionix.com/v1_1/search/cheddar%20cheese?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=' + id + '&appKey=' + key, (error, data) => {
      if(error) {
        console.log(error);
      } else {
        var food_array = JSON.parse(data.body);
        if (food_array) {
          res.render('calorieresults.ejs', { foods: food_array.hits })
          console.log(JSON.parse(data.body).nf_calories);
        } else {
          console.log("No hits")
        }
      }
    });

})


// https.get('https://api.nutritionix.com/v1_1/item?upc=49000036756&appId='
//  + id + '&appKey=' + key, (res) => {
//   // console.log('statusCode:', res.statusCode);
//   // console.log('headers:', res.headers);
//   console.log(res.body)
//
//   res.on('data', (d) => {
//     process.stdout.write(d);
//   });
//
// }).on('error', (e) => {
//   console.error(e);
// });


module.exports = router;
