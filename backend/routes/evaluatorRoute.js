// import require packages
import express from 'express'
import {
  getAllAssignedRequests,
  getEvaluatorProfile,
  getSpecificRequestDetails,
  updateProfile,
  updateRequestDetails,
  updateRequestStatus,
} from '../controllers/evaluatorController.js'
import { evaluatorProtectMiddleware } from '../middleware/verifyTokenMiddleware.js'

// express router instance
const evaluatorRouter = express.Router()

// all evaluator routes
evaluatorRouter.get('/get-profile', evaluatorProtectMiddleware, getEvaluatorProfile)
evaluatorRouter.get('/get-assigned-requests', evaluatorProtectMiddleware, getAllAssignedRequests)
evaluatorRouter.get('/get-specific-request-details/:id', evaluatorProtectMiddleware, getSpecificRequestDetails)

evaluatorRouter.put('/update-profile', evaluatorProtectMiddleware, updateProfile)
evaluatorRouter.put('/update-request-status/:id', evaluatorProtectMiddleware, updateRequestStatus)
evaluatorRouter.put('/update-request-details/:id', evaluatorProtectMiddleware, updateRequestDetails)

// export the router
export default evaluatorRouter