const express = require('express');
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const asyncHandler = require('express-async-handler')
const colors = require('colors')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 3000


const goalRoutes = require('./routes/goalRoutes')
const userRoutes = require('./routes/userRoutes')
connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/api/goals', goalRoutes)
app.use('/api/users', userRoutes)

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

