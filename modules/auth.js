const Router = require('express').Router
const bcrypt = require('bcrypt')
const dbPromise = require('./mongo')

var router = Router()
var db = null

dbPromise.then(database => {
  db = database
})

function hash(password) {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

router.post('/register', (req, res) => {
  var {username, password} = req.body

  var hashPass = hash(password)
  console.log("HASH: " + hashPass)

  //Register, usually in a database
  var responseData = {
    success: false
  }

  res.session.username = username
  loginSuccess(username)
  res.send(responseData)
})

router.post('/login', (req, res) => {
  var {username, password} = req.body
  var currentUser = users.find(user => user.username === username)
  var failMessage = "Incorrect credentials"
  if(currentUser) {
    if(currentUser.password === password){
      //Login complete
      res.session.username = username
      loginSuccess(username)
      res.send("Login completed successfully")
    } else {
      res.send(failMessage)
    }
  }else{
    res.send(failMessage)
  }
})

function loginSuccess(username){

}

module.exports = router