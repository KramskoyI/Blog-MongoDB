const { Router } = require('express')
const  { User } = require('../models/User')
const router = Router()

router.get('/register', (req, res) => {
    res.render('register', { title: 'Registration' })
})

router.post('/register', async (req, res) => {
    const user = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    })
    await user.save()
    res.redirect('/')
})


module.exports = router