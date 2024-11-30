// import required packages
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User } from '../models/User.js'

// Load .env file variables into process.env
dotenv.config()

// verify token middleware
export const protectMiddleware = async (request, response, next) => {
  try {
    const token = request.cookies.token
    if (!token) {
      console.log('Unauthorized: No token provided')
      return response.status(401).json({ message: 'Unauthorized: No token provided' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    if(!decoded) {
      console.log('Unauthorized: Invalid token or invalid jwt secret key')
      return response.status(401).json({ message: 'Unauthorized: Invalid token' })
    }
    
    request.userId = decoded.userId
    next()
  } catch (error) {
    console.log('Something went wrong while verifying token')
    console.log(error.message)
    return response.status(401).json({ message: error.message || 'Server error' })
  }
}
// verify admin token middleware
export const adminProtectMiddleware = async (request, response, next) => {
  try {
    const token = request.cookies.token
    if (!token) {
      console.log('Unauthorized: No token provided')
      return response.status(401).json({ message: 'Unauthorized: No token provided' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    if(!decoded) {
      console.log('Unauthorized: Invalid token or invalid jwt secret key')
      return response.status(401).json({ message: 'Unauthorized: Invalid token' })
    }
    
    const user = await User.findById(decoded.userId)
    if (!user) {
      console.log('Unauthorized: User not found')
      return response.status(401).json({ message: 'Unauthorized: User not found' })
    }

    if (user.role !== 'admin') {
      console.log('Unauthorized: User is not an admin')
      return response.status(403).json({ message: 'Unauthorized: User is not an admin' })
    }

    request.user = user
    next()
  } catch (error) {
    console.log('Something went wrong while verifying token')
    console.log(error.message)
    return response.status(401).json({ message: error.message || 'Server error' })
  }
}
// verify student token middleware
export const studentProtectMiddleware = async (request, response, next) => {
  try {
    const token = request.cookies.token
    if (!token) {
      console.log('Unauthorized: No token provided')
      return response.status(401).json({ message: 'Unauthorized: No token provided' })
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    if(!decoded) {
      console.log('Unauthorized: Invalid token or invalid jwt secret key')
      return response.status(401).json({ message: 'Unauthorized: Invalid token' })
    }
    
    const user = await User.findById(decoded.userId)
    if (!user) {
      console.log('Unauthorized: User not found')
      return response.status(401).json({ message: 'Unauthorized: User not found' })
    }
    
    if (user.role !== 'student') {
      console.log('Unauthorized: User is not a student')
      return response.status(403).json({ message: 'Unauthorized: User is not a student' })
    }
    
    request.user = user
    next()
  } catch (error) {
    console.log('Something went wrong while verifying token')
    console.log(error.message)
    return response.status(401).json({ message: error.message || 'Server error' })
  }
}
// verify evaluator token middleware
export const evaluatorProtectMiddleware = async (request, response, next) => {
  try {
    const token = request.cookies.token
    if (!token) {
      console.log('Unauthorized: No token provided')
      return response.status(401).json({ message: 'Unauthorized: No token provided' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    if(!decoded) {
      console.log('Unauthorized: Invalid token or invalid jwt secret key')
      return response.status(401).json({ message: 'Unauthorized: Invalid token' })
    }
    
    const user = await User.findById(decoded.userId)
    if (!user) {
      console.log('Unauthorized: User not found')
      return response.status(401).json({ message: 'Unauthorized: User not found' })
    }

    if (user.role !== 'evaluator') {
      console.log('Unauthorized: User is not an evaluator')
      return response.status(403).json({ message: 'Unauthorized: User is not an evaluator' })
    }

    request.user = user
    next()
  } catch (error) {
    console.log('Something went wrong while verifying token')
    console.log(error.message)
    return response.status(401).json({ message: error.message || 'Server error' })
  }
}