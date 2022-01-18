const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')

const homeRouter = require ('./routes/home')
const addPostRouter = require('./routes/addPost')
const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')

const PORT = process.env.PORT || 3000
const URL = 'mongodb://localhost:27017/blog'

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views' )

app.use(express.urlencoded({ extended:true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(homeRouter)
app.use(addPostRouter)
app.use(registerRouter)
app.use(loginRouter)


async function start() {
    try {
        await mongoose.connect(URL, 
        { 
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false
        })
        app.listen(PORT, () => {
            console.log("Сервер ожидает подключения...")
        })
    } catch(e){
        console.log(e)
    }
}

start()

        
    
  

