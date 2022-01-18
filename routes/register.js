const { Router } = require('express')
const  { User } = require('../models/User')
const router = Router()
const bcrypt = require('bcrypt')

router.get('/register', (req, res) => {
    res.render('register', { title: 'Registration' })
})

router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = new User({
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword
        })
        user.save()
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
})


module.exports = router