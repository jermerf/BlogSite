const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const auth = require('./modules/auth')

const MONGO_URL = "mongodb://localhost:27017/myApp"

mongoose.connect(MONGO_URL, {
  connectTimeoutMS: 1000,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => {
  if (err)
    console.log("Couldn't connect to mongodb", err)
})

var app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
  secret: "kdfg-ndlfkg343lfk_3533-tw4",
  resave: false,
  saveUninitialized: true,
  store: new FileStore({
    path: "./sessions"
  })
}))

/* Ajax requests would be to routes like
    /auth/register
    /auth/login
    /auth/check           
*/
app.use('/auth', auth)

app.use(express.static('public'))


app.listen(8080)