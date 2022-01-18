const express = require('express')
const router = express()
const  { Post } = require('../models/Post')
const jsonParser = express.json();

router.get('/addPost', (req, res) =>{
    res.render('addPost', { title: 'addPost' })
})

router.post('/addPost', jsonParser, (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
        idAutor: req.user.id
    })
    
    if (post.title === ''|| post.description === '') {
        res.render('addPost', { errorAdd : 'You did not write Title or Description!!!'})
    } else {
        post.save()
        res.redirect('/')
    }
})

module.exports = router