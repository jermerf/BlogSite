const express = require('express')
const bodyParser = require('body-parser')
const session = require('./modules/session')
const auth = require('./modules/auth')

var app = express()
app.use(bodyParser.urlencoded({extended:true}))

session(app)

app.use('/auth', auth)

app.use(express.static('public'))


app.listen(8080)