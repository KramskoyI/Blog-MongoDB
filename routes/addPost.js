const express = require('express')
const router = express()
const  { Post } = require('../models/Post')
const jsonParser = express.json()
const multer = require('multer')
const imagesBase = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images') 
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
  });
const upload = multer({storage: imagesBase})
router.use(multer({storage:imagesBase}).single('filedata'))

router.get('/addPost', (req, res) =>{
    res.render('addPost', { title: 'addPost' })
})

router.post('/addPost', jsonParser, (req, res) => {
    let filedata  = req.file ? req.file.filename : null

    const tags = req.body.tag
    const arrTags = tags.split(',')

    const post = new Post({
        tit: req.body.title,
        description: req.body.description,
        tag: arrTags,
        idAutor: req.user.id,
        image: filedata
    })
    
    if (post.title === ''|| post.description === '') {
        res.render('addPost', { errorAdd : 'You did not write Title or Description!!!'})
    } else {
        post.save()
        res.redirect('/')
    }
})

module.exports = router