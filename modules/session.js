const session = require('express-session')


module.exports = app => {
  app.use(session({
    secret: "kdfg-ndlfkg343lfk_3533-tw4",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
}