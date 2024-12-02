// import require packages
import express from 'express'
import {
  assignEvaluator,
  changePassword,
  deleteUser,
  deleteRevaluationRequest,
  getAdminProfile,
  getAllRevaluationRequest,
  getUser,
  updateProfile,
  updateRequestStatus,
  updateUserRole,
  updateUserStatus
} from '../controllers/adminController.js'
import { adminProtectMiddleware } from '../middleware/verifyTokenMiddleware.js'

// express router instance
const adminRouter = express.Router()

// all admin routes
adminRouter.get('/get-users',  adminProtectMiddleware, getUser)
adminRouter.get('/get-profile', adminProtectMiddleware, getAdminProfile)
adminRouter.get('/get-revaluation-requests', adminProtectMiddleware, getAllRevaluationRequest)

adminRouter.post('/delete-user/:id', adminProtectMiddleware, deleteUser)
adminRouter.post('/change-password', adminProtectMiddleware, changePassword)

adminRouter.put('/update-user-role/:id', adminProtectMiddleware, updateUserRole)
adminRouter.put('/update-user-status/:id', adminProtectMiddleware, updateUserStatus)
adminRouter.put('/update-profile', adminProtectMiddleware, updateProfile)
adminRouter.put('/update-request-status/:id', adminProtectMiddleware, updateRequestStatus)
adminRouter.put('/assign-evaluator/:id', adminProtectMiddleware, assignEvaluator)
adminRouter.put('/change-password', adminProtectMiddleware, changePassword)

adminRouter.delete('/revaluation-request-delete/:id', adminProtectMiddleware, deleteRevaluationRequest)

// export the router
export default adminRouter