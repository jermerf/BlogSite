const Router = require('express').Router
const User = require('./model/User.js')

const router = Router()

const LOGIN_FAIL = { success: false, message: "Incorrect credentials" }
const REGISTER_FAIL = { success: false, message: "Username taken" }

router.post('/register', async (req, res) => {
  let { username, password } = req.body // pulls out req.body.username and req.body.password

  try {
    let user = new User({
      username,
      lastLogin: new Date()
    })
    user.setPassword(password) // This is a method in the schema, it hashes the password
    await user.save()

    loginSuccess(req, res, user)
  } catch (err) {
    console.log("/register_ERR", err)
    res.send(REGISTER_FAIL)
  }
})

router.post('/login', async (req, res) => {
  let { username, password } = req.body

  try {
    let user = await User.find({ username })

    if (user.authenticate(password)) {

      //Login complete
      loginSuccess(req, res, user)
    } else {
      res.send(LOGIN_FAIL)
    }
  } catch (err) {
    res.send(LOGIN_FAIL)
  }
})

router.post('/check', async (req, res) => {
  // If you have a username and uid in the session, you're logged in
  if (req.session.username && req.session.uid) {
    res.send({
      success: true,
      userid: req.session.id,
      username: req.session.username
    })
  } else {
    res.send({ success: false })
  }
})

function loginSuccess(req, res, user) {

  // Save the username and id to session, this lets you check to see who this user is
  req.session.uid = user.id
  req.session.username = user.username
  res.send({
    success: true,
    userid: user.id,
    username: user.username
  })
}

module.exports = router