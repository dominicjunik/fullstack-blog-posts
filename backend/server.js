// Require dotenv to setup environment variables in our server
require('dotenv').config()

// Load express
const express = require('express')

const cors = require('cors')

// Setup our Express app
const app = express()

const PORT = 8080 

// Load the connectDB function
const connectDB = require('./config')

// Connect to database
connectDB()

const postRoutes = require('./routes/postRoutes')
const commentRoutes = require('./routes/commentRoutes')

app.use(express.json())
app.use(cors())

app.use('/api/posts', postRoutes)
app.use('/api/comments', commentRoutes)

// Listen to the given port
app.listen(PORT, () => {
    console.log('Listening to the port: ' + PORT)
})