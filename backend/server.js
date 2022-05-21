const express = require('express');
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const asyncHandler = require('express-async-handler')
const colors = require('colors')
const connectDB = require('./config/db')

connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))


const PORT = process.env.PORT || 3000


const goalRoutes = require('./routes/goalRoutes')
app.use('/api/goals', goalRoutes)

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

