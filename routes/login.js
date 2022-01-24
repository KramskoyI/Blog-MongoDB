const express = require('express')
const router = express.Router()
const passport = require('passport')


/* GET Log In page. */
router.get('/login', async (req, res) => {
    
    res.render('login')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
    }
))

module.exports = router;