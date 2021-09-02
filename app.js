const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const path = require('path')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')
const exphbs = require('express-handlebars')
const passport = require('passport')
    // Load config
dotenv.config({ path: './config/config.env' })

//Passport Config
require('./config/passport')(passport)

//Connect to the mongodb
connectDB()

const app = express()

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}

// Handlebars Helpers
const { formatDate } = require('./helpers/hbs')

// Handlebars
app.engine('.hbs', exphbs({ helpers: { formatDate }, defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,

        })
        // cookie: { secure: true }
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Static Folder Defining
app.use(express.static(path.join(__dirname, 'public')))

//routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

//
const PORT = process.env.PORT || 3000

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))

console.log("Hello World")