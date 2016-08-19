var express = require('express');
var router = express.Router();
var Entry = require('../models/entry');

function MakeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

function authenticate(req, res, next) {
  if(!req.isAuthenticated()) {
    req.flash('error', 'Please signup or login.');
    res.redirect('/');
  }
  else {
    next();
  }
}

//INDEX
router.get('/', authenticate, function(req, res, next) {
  var entries = global.currentUser.entries;
  res.render('entries/index', { entries: entries, message: req.flash() });
});

//NEW
router.get('/new', authenticate, function(req, res, next) {
  var entry = {
    date: "",
    food: "",
    meal: ""
  };
  res.render('entries/new', {entry, entry, message: req.flash() })
})

//CREATE
router.post('/', authenticate, function(req, res, next) {
  var entry = new Entry ({
    date: req.body.date,
    meal: req.body.meal,
    food: req.body.food
  })
  currentUser.entries.push(entry);
  currentUser.save()
  .then(function() {
    res.redirect('/entries');
  }, function(err) {
    return next(err);
  });
});

//SHOW
router.get('/:id', authenticate, function(req, res, next) {
  var entry = currentUser.entries.id(req.params.id);
  if (!entry) return next(makeError(res, 'Document not found', 404));
  res.render('entries/show', { entry: entry, message: req.flash() } );
});

// EDIT
router.get('/:id/edit', authenticate, function(req, res, next) {
  var entry = currentUser.entries.id(req.params.id);
  if (!entry) return next(makeError(res, 'Document not found', 404));
  res.render('entries/edit', { entry: entry, message: req.flash() } );
});

// UPDATE
router.put('/:id', authenticate, function(req, res, next) {
  var entry = currentUser.entries.id(req.params.id);
  if (!entry) return next(makeError(res, 'Document not found', 404));
  else {
    entry.date = req.body.date;
    entry.meal = req.body.meal;
    entry.food = req.body.food;
    currentUser.save()
    .then(function(saved) {
      res.redirect('/entries');
    }, function(err) {
      return next(err);
    });
  }
});

// DESTROY
router.delete('/:id', authenticate, function(req, res, next) {
  var entry = currentUser.entries.id(req.params.id);
  if (!entry) return next(makeError(res, 'Document not found', 404));
  var index = currentUser.entries.indexOf(entry);
  currentUser.entries.splice(index, 1);
  currentUser.save()
  .then(function(saved) {
    res.redirect('/entries');
  }, function(err) {
    return next(err);
  });
});


module.exports = router;
