const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const ObjectId = mongoose.Types.ObjectId

function hash(password) {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

// Docs here https://mongoosejs.com/docs/schematypes.html
const UserSchema = new mongoose.Schema({
  username: { type: String, index: true, unique: true },
  password: String,
  lastLogin: Date
})


// This adds an 'authenticate' function to "User"s
UserSchema.methods.authenticate = function (password) {
  return bcrypt.compareSync(password, this.password)
}


// This adds an 'authenticate' function to "User"s
UserSchema.methods.setPassword = function (password) {
  this.password = hash(password)
}

const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel