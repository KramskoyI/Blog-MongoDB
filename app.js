const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')

const homeRouter = require ('./routes/home')
const addPostRouter = require('./routes/addPost')
const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')
const readPostRoter = require('./routes/readPost')

const URL = 'mongodb://localhost:27017/blog'
const PORT = process.env.PORT || 3000


const app = express()

// const hbs = exphbs.create({
//     defaultLayout: 'main',
//     extname: 'hbs'
// })

// app.engine('hbs', hbs.engine)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended:true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(homeRouter)
app.use(addPostRouter)
app.use(registerRouter)
app.use(loginRouter)
app.use(readPostRoter )

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

        
    
  

