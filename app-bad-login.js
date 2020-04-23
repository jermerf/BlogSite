const express = require('express')
const bodyParser = require('body-parser')
const session = require('./modules/session')

var app = express()
app.use(bodyParser.urlencoded({extended:true}))

session(app)

var users = []

app.post('/user/register', (req, res) => {
  var {username, password} = req.body
  //Register, usually in a database
  users.push({ username, password})
  res.send("registration complete")
})

app.post('/user/login', (req, res) => {
  var {username, password} = req.body
  var currentUser = users.find(user => user.username === username)
  var failMessage = "Incorrect credentials"
  if(currentUser) {
    if(currentUser.password === password){
      //Login complete
      res.send("Login completed successfully")
    } else {
      res.send(failMessage)
    }
  }else{
    res.send(failMessage)
  }
})

app.use(express.static('public'))

app.listen(8080)