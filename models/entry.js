var mongoose = require('mongoose');

var EntrySchema = new mongoose.Schema({
  date: { type: String, required: true },
  meal: { type: String, required: true },
  food: { type: String, required: true }
})

module.exports = mongoose.model('Entry', EntrySchema);
