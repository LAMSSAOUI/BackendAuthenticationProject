const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const HeroRoutes = require('./routes/HeroRoute')
const userRoutes = require('./routes/UserRoutes')
const cors = require('cors')


const app = express() ; 
const PORT = process.env.PORT
const MongoDb_URL = process.env.MongoDb_URL



app.use(cors())
// middleware 
app.use(express.json())

// make routes 
app.use('/', HeroRoutes)
app.use('/user', userRoutes)




// connect to the database 
mongoose.connect(MongoDb_URL)
    .then( () => {
        app.listen(PORT , () => {
            console.log(`App is now running is Port : ${PORT}`) })
    }).catch((err) => {
        console.log(err)
    }) 

    




