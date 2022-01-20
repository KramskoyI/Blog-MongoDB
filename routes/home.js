if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  
const express = require('express')
const router = express()
const passport =require('passport')
const initializePassport = require('../passport-config')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const jsonParser = express.json()
const  { User } = require('../models/User')
const  { Post } = require('../models/Post')
let users
let posts

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

router.get('/', jsonParser, async (req, res) => {
  users =  await User.find({})
  // posts = await Post.find({})
  posts = await Post.find({}).populate('idAutor')

  const tag = req.query.tag
  
  if(tag !='') {
        postsTag = posts.filter(function(post) {
            for (var i = 0; i < post.tag.length; i++) {
            if (post.tag[i] == tag) {
                return post;
            }
            }
        })
  }
  
  const postsOnPage = 6
    
  let pageAll
  
  if( postsTag.length > 0){
    pageAll = Math.ceil(postsTag.length / postsOnPage)
  } else{
    pageAll = Math.ceil(posts.length / postsOnPage)
  }
  const pages = []
  
  for (let i = 1; i <= pageAll; i++) {
    const page = { page: i}
    pages.push(page)
  }
  let page = 1
  let test = req.query.page
  if(test > page){
    page = test
  }
  posts = posts.slice((page-1) * postsOnPage , page * postsOnPage)
  postsT = postsTag.slice((page-1) * postsOnPage , page * postsOnPage)
    
    if (req.isAuthenticated()) {
        res.render('index', { user: req.user.name, posts, postsT, pages, tag})
    } else {
        res.render('index', {posts,postsT, pages, tag})
    }
})


router.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/')
})

module.exports = router