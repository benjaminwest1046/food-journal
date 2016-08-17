var express = require('express');
var router = express.Router();
var Entry = require('../models/entry');

function MakeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

//INDEX
router.get('/', function(req, res, next) {
  Entry.find({})
  .then(function(entries) {
    res.render('entries/index', {entries: entries });
  }, function(err) {
    return next(err);
  });
});

//NEW
router.get('/new', function(req, res, next) {
  var entry = {
    date: "",
    food: "",
    meal: ""
  };
  res.render('entries/new', {entry, entry})
})

//CREATE
router.post('/', function(req, res, next) {
  var entry = new Entry ({
    date: req.body.date,
    meal: req.body.meal,
    food: req.body.food
  })
  entry.save()
  .then(function(saved) {
    res.redirect('/entries');
  }, function(err) {
    return next(err);
  });
});

//SHOW
router.get('/:id', function(req, res, next) {
  Entry.findById(req.params.id)
  .then(function(entry) {
    if (!entry) return next(MakeError(res, 'Document not found', 404));
    res.render('entries/show', {entry: entry});
  }, function(err) {
    return next(err);
  });
});

//EDIT
router.get('/:id/edit', function(req, res, next) {
  Entry.findById(req.params.id)
  .then(function(entry) {
    if (!entry) return next(makeError(res, "Document not found", 404));
    res.render('entries/edit', {entry: entry});
  }, function(err) {
    return next(err);
  });
});

//UPDATE
router.put('/:id', function(req, res, next) {
  Entry.findById(req.params.id)
  .then(function(entry) {
    if (!entry) return next(MakeError(res, "Document not found", 404));
    entry.date = req.body.date;
    entry.meal = req.body.meal;
    entry.food = req.body.food;
    return entry.save()
  })
  .then(function(saved) {
    res.redirect('/entries');
  }, function(err) {
    return next(err);
  });
});

//DESTROY
router.delete('/:id', function(req, res, next) {
  Entry.findByIdAndRemove(req.params.id)
  .then(function() {
    res.redirect('/entries');
  }, function(err) {
    return next(err);
  });
});
module.exports = router;
