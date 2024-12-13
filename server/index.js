require('dotenv').config()
const cors = require('cors')
const express = require('express')
const cookieParser = require('cookie-parser')
const db = require('./db')
const router = require('./route/index')
// const userModel = require('./models/user_model')
// const tokenModel = require('./models/token_model')
const models = require('./models/models')
const ErrorMidleware = require('./midlewares/errorHandler')

// const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 5000
const DB_URL = process.env.DB_URL

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/server', router)
app.use(ErrorMidleware)

const start = async () => {
    try {
        // await mongoose.connect(DB_URL)
        await db.authenticate()
        await db.sync()
        app.listen(PORT, () => console.log(`Server start on server ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()