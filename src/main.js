const express = require('express')
const app = express()
const helmet=require('helmet')
const route=require('./routes/index')
const db=require('./model/db')
const cookieparser=require('cookie-parser')
const errorHandler = require('./middlewares/error_handler')
const serverless = require('serverless-http')
const cors=require('cors')

app.use(cors({
    origin: process.env.PAGE_URL,
    credentials: true
}))
app.use(cookieparser())
app.use(helmet())
app.use(express.json())
app.use(route)
app.use(errorHandler._404Handler)
app.use(errorHandler.errorHandler)

db.initDB()

module.exports=serverless(app)
