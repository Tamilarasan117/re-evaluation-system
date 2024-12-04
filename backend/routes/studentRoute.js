// import require packages
import express from 'express'

// import required modules
import { studentProtectMiddleware } from '../middleware/verifyTokenMiddleware.js'
import {
  changePassword,
  createCheckoutSession,
  deleteRevaluationRequest,
  getAllRequestedRevaluation,
  getPaymentHistory,
  getRevaluationRequest,
  getStudentProfile,
  paymentSuccess,
  revaluationRequest,
  updateStudentProfile
} from '../controllers/studentController.js'

// express router instance
const studentRouter = express.Router()

// all student routes
studentRouter.get('/get-profile', studentProtectMiddleware, getStudentProfile)
studentRouter.get('/get-revaluation-request', studentProtectMiddleware, getRevaluationRequest)
studentRouter.get('/get-all-revaluation-request', studentProtectMiddleware, getAllRequestedRevaluation)
studentRouter.get('/get-payment-history', studentProtectMiddleware, getPaymentHistory)

studentRouter.post('/revaluation-request', studentProtectMiddleware, revaluationRequest)
studentRouter.post('/change-password', studentProtectMiddleware, changePassword)
studentRouter.post("/create-checkout-session", studentProtectMiddleware, createCheckoutSession)
studentRouter.post("/payment-success/:id", studentProtectMiddleware, paymentSuccess)

studentRouter.put('/update-profile', studentProtectMiddleware, updateStudentProfile)

studentRouter.delete('/revaluation-request-delete/:id', studentProtectMiddleware, deleteRevaluationRequest)

// export the router
export default studentRouter
