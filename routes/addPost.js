const { Router } = require('express')
const router = Router()
const  { Post } = require('../models/Post')

router.get('/addPost', (req, res) =>{
    res.render('addPost', { title: 'addPost' })
})

router.post('/addPost', async (req, res) => {

    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
        idAutor: req.user.id
    })
    await post.save()
    res.redirect('/')
    
})

module.exports = router