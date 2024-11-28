// import require packages
import express from 'express'

// import required modules
import { studentProtectMiddleware } from '../middleware/verifyTokenMiddleware.js'
import {
  deleteRevaluationRequest,
  getAllRequestedRevaluation,
  getRevaluationRequest,
  getStudentProfile,
  requestPayment,
  revaluationRequest,
  updateStudentProfile
} from '../controllers/studentController.js'

// express router instance
const studentRouter = express.Router()

// all student routes
studentRouter.get('/get-profile', studentProtectMiddleware, getStudentProfile)
studentRouter.get('/get-revaluation-request', studentProtectMiddleware, getRevaluationRequest)
studentRouter.get('/get-all-revaluation-request', studentProtectMiddleware, getAllRequestedRevaluation)

studentRouter.post('/revaluation-request', studentProtectMiddleware, revaluationRequest)
studentRouter.post('/request-payment/:id', studentProtectMiddleware, requestPayment)

studentRouter.put('/update-profile', studentProtectMiddleware, updateStudentProfile)

studentRouter.delete('/revaluation-request-delete/:id', studentProtectMiddleware, deleteRevaluationRequest)

// export the router
export default studentRouter
