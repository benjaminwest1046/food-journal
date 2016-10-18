var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Entry = require('./entry');

var UserSchema = new mongoose.Schema({
  firstName: {type: String, required: true },
  lastName: { type: String, required: true },
  firstLogin: { type: Boolean, required: true },
  local: {
    email: String,
    password: String
  },
  entries : [Entry.schema]
});

UserSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

UserSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);
