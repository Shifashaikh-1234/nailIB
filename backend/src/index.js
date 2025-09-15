require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const courses = require('./routes/courses')


const authRoutes = require('./routes/auth')
const aiRoutes = require('./routes/ai')


const app = express()
app.use(cors())
app.use(express.json({ limit: '10mb' }))




app.use('/api/auth', authRoutes)
app.use('/api/ai', aiRoutes)

console.log('Environment:', process.env.MONGO_URI)

const PORT = process.env.PORT || 4000


mongoose.connect(process.env.MONGO_URI)
.then(() => {
console.log('MongoDB connected')
app.listen(PORT, () => console.log('Server running on', PORT))
}).catch(err => {
console.error('MongoDB connection error', err)
})