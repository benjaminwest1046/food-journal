var express = require('express');
var router = express.Router();
var Entry = require('../models/entry');

function MakeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

router.get('/', function(req, res, next) {
  Entry.find({})
  .then(function(entries) {
    res.render('entries/index', {entries: entries });
  }, function(err) {
    return next(err);
  });
});

module.exports = router;
