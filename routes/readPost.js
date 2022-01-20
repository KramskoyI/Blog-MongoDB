const express = require('express')
const router = express.Router()
const  { Post } = require('../models/Post')

/* GET Read Post page. */
router.get('/readPost', async (req, res, ) => {
    const id = req.query.id;
    const post = await Post.find({_id: id})
    res.render('readPost', {post})
})

module.exports = router;