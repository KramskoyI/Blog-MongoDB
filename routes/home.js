if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
const express = require('express')
const router = express()
const bcrypt = require('bcrypt')
const passport =require('passport')
const initializePassport = require('../passport-config')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const  { User } = require('../models/User')
let users

initializePassport(
    passport, 
    email => users.find(user => user.email === email ),
    id => users.find(user => user.id === id),
)

router.use(express.urlencoded({extended: false}))
router.use(flash())
router.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
router.use(passport.initialize())
router.use(passport.session())
router.use(methodOverride('_method'))

router.get('/', async (req, res) => {
    users = await User.find({})
    
    if (req.isAuthenticated()) {
        res.render('index', { user: req.user.name})
    } else {
        res.render('index')
    }
})

router.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/')
})

module.exports = router