// import required packages
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import bodyParser from 'body-parser'
import path from 'path'

// import required modules
import dbConnect from './config/database.js'
import authRouter from './routes/authRoute.js'
import adminRouter from './routes/adminRoute.js'
import studentRouter from './routes/studentRoute.js'
import evaluatorRouter from './routes/evaluatorRoute.js'

// Load .env file variables into process.env
dotenv.config()

// express instance
const app = express()
const PORT = process.env.PORT || 5000

const __dirname = path.resolve()

app.use(cors({ origin: 'http://localhost:3000', credentials: true }))

// middleware
app.use(express.json({ limit: '50mb' }))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// routes
app.use('/api/auth', authRouter)
app.use('/api/admin', adminRouter)
app.use('/api/student', studentRouter)
app.use('/api/evaluator', evaluatorRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
}

// Start the server
app.listen(PORT, () => {
  dbConnect()
  console.log(`Server running on port ${PORT}`)
})
