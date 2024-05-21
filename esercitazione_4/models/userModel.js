const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String
})

userSchema.pre("save", function(next) {
  const user = this;
  bcrypt.hash(user.password, 10).then(hashedPassword => {
    user.password = hashedPassword;
    next();
  })
})

module.exports = mongoose.model('User', userSchema)