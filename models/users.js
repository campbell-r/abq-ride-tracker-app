const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true,
    minlength: 6
  },
  date: {
    type: Date,
    default: Date.now
  }
});
UserSchema.pre('save', function(next){
  const user = this;
  bcrypt.hash(user.password, 10, function(error, hash){
    if(error){
      return next(error);
    }
    user.password = hash;
    next();
  });
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
