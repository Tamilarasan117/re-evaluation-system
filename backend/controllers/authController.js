// import require package
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import dotenv from 'dotenv'

// Load .env file variables into process.env
dotenv.config()

// import require module
import { User } from '../models/User.js'
import { generateTokenAndSetCookie, generateEmailVerificationToken } from '../utils/generateTokens.js'
import { sendPasswordResetEmail, sendPasswordResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from '../email/emailSender.js'

// user register controller
export const register = async (request, response) => {
  const { username, email, password } = request.body
  
  try {
    if (!username || !email || !password) {
      console.log('All input fields are required')
      return response.status(400).json({ message: 'All input fields are required' })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      console.log('User already exists')
      return response.status(400).json({ message: 'User already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)
    const verificationToken = generateEmailVerificationToken()
    const user = new User({
      username,
      email,
      password: hashedPassword,
      verificationToken: verificationToken,
      verificationTokenExpiresAt:  Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    })
    await user.save()

    generateTokenAndSetCookie(response, user._id)
    /*await sendVerificationEmail(user.email, verificationToken)*/

    response.status(200).json({
      message: `User registered successfully with email address ${email}`,
      user: { ...user._doc, password: undefined }
    })
    console.log(`User registered successfully with email address ${email}`)
  } catch (error) {
    console.log(error)
    response.status(500).json({ message: error.message || 'Something went wrong' });
  }
}
// verify email function
export const verifyEmail = async (request, response) => {
  const { code } = request.body
  
  try {
    const user = await User.findOne({ 
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    })

    if (!user) {
      console.log('Invalid or expired verification code')
      return response.status(400).json({ message: 'Invalid or expired verification code' })
    }
    
    user.isVerified = true
    user.verificationToken = undefined
    user.verificationTokenExpiresAt = undefined
    await user.save()
    
    await sendWelcomeEmail( user.email, user.username )
    
    response.status(201).json({
      message: `Email Verified successfully`,
      user: { ...user._doc, password: undefined }
    })
    console.log(`Email Verified successfully for user: ${user.email}`)
  } catch (error) {
    console.log(`Error is email verify: `, error)
    response.status(500).json({ message: 'Server error' });
  }
}
// user login controller
export const login = async (request, response) => {
  const { email, password } = request.body
  
  try {
    const user = await User.findOne({ email })
    if (!user) {
      console.log('Invalid email address')
      return response.status(400).json({ message: 'Invalid credentials' })
    }
    
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      console.log('Invalid password')
      return response.status(400).json({ message: 'Invalid credentials' })
    }
    
    generateTokenAndSetCookie(response, user._id)
    
    user.lastLogin = new Date()
    user.isLoggedIn = true
    await user.save()

    response.status(201).json({
      message: `User logged in successfully with email: ${email}`,
      user: { ...user._doc, password: undefined }
    })
    console.log(`User logged in successfully with email: ${email}`)
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Something went wrong' });
  }
}
// user logout controller
export const logout = async (request, response) => {
  try {
    response.clearCookie('token')
    response.status(200).json({ message: 'Logged out successfully' })
    console.log('User logged out successfully')
  } catch (error) {
    response.status(400).json({ message: 'Internal server error' })
    console.log('Error in logout: ', error)
  }
}
// forgot password controller
export const forgotPassword = async (request, response) => {
  const { email } = request.body
  
  try {
    const user = await User.findOne({ email })
    if (!user) {
      console.log('Invalid email address')
      return response.status(400).json({ message: 'Email not found' })
    }
    
    const resetPasswordToken = crypto.randomBytes(20).toString('hex')
    const resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000  // 1 hour
    
    user.resetPasswordToken = resetPasswordToken
    user.resetPasswordExpiresAt = resetPasswordExpiresAt
    await user.save()
    
    await sendPasswordResetEmail(
      user.email,
      `${ process.env.CLIENT_URL }/reset-password/${ resetPasswordToken }`
    )

    response.status(200).json({ message: 'Password reset lint sent to your email' })
    console.log(`Password reset lint sent to ${user.email}`)
  } catch (error) {
    console.error('Error in forgot password: ', error);
    response.status(400).json({ message: error.message || 'Server error'})
  }
}
// reset password controller
export const resetPassword = async (request, response) => {
  try {
    const { token } = request.params
    const { password } = request.body
    
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt:  { $gt: new Date() }
    })

    if (!user) {
      console.log('Invalid or expired password reset token')
      return response.status(400).json({ message: 'Invalid or expired password reset token' })
    }
  
    const hashedPassword = await bcrypt.hash(password, 10)
    
    user.password = hashedPassword
    user.resetPasswordToken = undefined
    user.resetPasswordExpiresAt = undefined
    await user.save()
    
    await sendPasswordResetSuccessEmail(user.email)

    response.status(200).json({ message: 'Password reset successfully' })
    console.log(`Password reset successfully for ${user.email}`)
  } catch (error) {
    console.log('Error in password reset email: ' + error.message)
    response.status(400).json({ message: error.message || 'Server error'})
  }
}
// check authenticated user controller
export const checkAuth = async (request, response) => {
  try {
    const user = await User.findById(request.userId).select('-password')
    if (!user) {
      console.log('User not found')
      return response.status(401).json({ message: 'User not found' })
    }

    response.status(200).json({ message: 'User authenticated successfully', user })
    console.log(`User authenticated successfully for user: ${user.email}`)
  } catch (error) {
    console.error('Error in checkAuth: ', error);
    response.status(400).json({ message: error.message || 'Server error'})
  }
}