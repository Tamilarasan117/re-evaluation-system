// import require packages
import express from 'express'

// import require modules
import { checkAuth, forgotPassword, login, logout, register, resetPassword, verifyEmail } from '../controllers/authController.js'
import { protectMiddleware } from '../middleware/verifyTokenMiddleware.js'

// express router instance
const authRouter = express.Router()

// all auth routes
authRouter.get('/check-auth', protectMiddleware, checkAuth)

authRouter.post('/register', register)
authRouter.post('/verify-email', verifyEmail)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.post('/forgot-password', forgotPassword)
authRouter.post('/reset-password/:token', resetPassword)

// export the router
export default authRouter
