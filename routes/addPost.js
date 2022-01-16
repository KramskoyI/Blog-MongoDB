const { Router } = require('express')
const router = Router()

router.get('/addPost', (req, res) =>{
    res.render('addPost', { title: 'addPost' })
})


module.exports = router