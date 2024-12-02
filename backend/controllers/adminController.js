// importing package
import bcrypt from 'bcryptjs'

// importing modules
import { User } from "../models/User.js"
import { RevaluationRequest } from "../models/RevaluationRequest.js"
import { Payment } from "../models/Payment.js"

// get user controller
export const getUser = async (request, response) => {
  try {
    const users = await User.find()
    response.status(200).json( users )
    console.log('All users fetched successfully')
  } catch (error) {
    console.log('Something went wrong while fetching all users from the server')
    console.log(error.message)
    response.status(500).json({ message: "Internal server error" })
  }
}
// delete user controller
export const deleteUser = async (request, response) => {
  try {
    const userId = request.params.id
    const checkAdmin = await User.findById(userId)
    if (checkAdmin.role === 'admin') {
      console.log('You are the admin, you cannot delete yourself')
      return response.status(403).json({ message: 'You are the admin, you cannot delete yourself' })
    }

    const user = await User.findByIdAndDelete(userId)
    if (!user) {
      console.log('User not found')
      return response.status(400).json({ message: 'User not found' })
    }

    response.status(200).json({ message: "User deleted successfully", user: user })
    console.log('User deleted successfully.')
  } catch (error) {
    console.log('Something went wrong while deleting user from the server')
    console.log(error.message)
    response.status(500).json({ message: "Internal server error" })
  }
}
// update user role controller
export const updateUserRole = async (request, response) => {
  try {
    const userId = request.params.id
    const { role } = request.body
    const checkAdmin = await User.findById(userId)
    if (!checkAdmin) {
      console.log('User not found')
      return response.status(400).json({ message: 'User not found' })
    }
    if (checkAdmin.role === 'admin') {
      console.log('You are the admin, you cannot update your role')
      return response.status(403).json({ 
        message: 'You are the admin, you cannot update your role'
      })
    }
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true })
    if (!user) {
      console.log('User not found')
      return response.status(400).json({ message: 'User not found' })
    }
    response.status(200).json({ message: "User role updated successfully", user: user })
    console.log('User role updated successfully.')
  } catch (error) {
    console.log('Something went wrong while updating user role')
    console.log(error.message)
    response.status(500).json({ message: "Internal server error" })
  }
}
// update user status controller
export const updateUserStatus = async (request, response) => {
  try {
    const userId = request.params.id
    const { status } = request.body
    const checkAdmin = await User.findById(userId)
    if (checkAdmin.role === 'admin') {
      console.log('You are the admin, you cannot update your status')
      return response.status(403).json({ 
        message: 'You are the admin, you cannot update your status'
      })
    }

    const user = await User.findByIdAndUpdate(userId, { status }, { new: true })
    if (!user) {
      console.log('User not found')
      return response.status(400).json({ message: 'User not found' })
    }
    response.status(200).json({ message: "User status updated successfully", user: user })
    console.log('User status updated successfully.')
  } catch (error) {
    console.log('Something went wrong while updating user status')
    console.log(error.message)
    response.status(500).json({ message: "Internal server error" })
  }
}
// get profile information controller
export const getAdminProfile = async (request, response) => {
  try {
    const userId = request.user.id
    const user = await User.findById(userId).select('-password')
    if (!user) {
      return response.status(404).json({ message: 'User not found' })
    }
    response.status(200).json(user)
    console.log('Admin profile fetched successfully')
  } catch (error) {
    console.log('Something went wrong while fetching admin profile')
    console.log(error.message)
    response.status(500).json({ message: "Internal server error" })
  }
}
// update profile information controller
export const updateProfile = async (request, response) => {
  try {
    const userId = request.user.id
    const { username, phone, dob, bio, address, profile } = request.body
    const adminProfile = await User.findByIdAndUpdate(
      userId,
      { username, phone, dob, bio, address, profile },
      { new: true }
    )
    if (!adminProfile) {
      return response.status(404).json({ message: 'User not found' })
    }

    response.status(200).json({ message: "Admin profile updated successfully", adminProfile: adminProfile })
    console.log('admin profile info updated successfully')
  } catch (error) {
    console.log('Something went wrong while updating admin profile')
    console.log(error.message)
    response.status(500).json({ message: "Internal server error" })
  }
}
// admin get all revaluation request list controller
export const getAllRevaluationRequest = async (request, response) => {
  try {
    const revaluationRequest = await RevaluationRequest.find().select('-document')
    if (!revaluationRequest) {
      console.log('No revaluation requests found')
      return response.status(404).json({ message: 'No revaluation request found' })
    }

    const getPayments = await Payment.find()
    if (!getPayments) {
      console.log('No payments found')
      return response.status(404).json({ message: 'No payments found' })
    }
    
    response.status(200).json( revaluationRequest )
    console.log('Revaluation request list fetched successfully')
  } catch (error) {
    console.log('Something went wrong while fetching revaluation request list')
    console.log(error.message)
    response.status(500).json({ message: "Internal server error" })
  }
}
// update request status
export const updateRequestStatus = async (request, response) => {
  try {
    const requestId = request.params.id
    const status = request.body.status
    const requestStatus = await RevaluationRequest.findByIdAndUpdate(requestId, { status: status }, { new : true })
    if (!requestStatus) {
      console.log('Request not found')
      return response.status(404).json({ message: 'Request not found' })
    }

    response.status(200).json({ message: 'Request status updated successfully', requestStatus })
    console.log('Request status updated successfully')
  } catch (error) {
    console.log('Something went wrong while updating request status')
    console.log(error.message)
    response.status(500).json({ message: "Internal server error" })
  }
}
// admin can assign request to a different evaluator controller
export const assignEvaluator = async (request, response) => {
  try {
    const requestId = request.params.id
    const evaluatorId = request.body.evaluatorId
    const requestStatus = await RevaluationRequest.findByIdAndUpdate(
      requestId,
      { evaluatorId: evaluatorId },
      { new : true }
    )
    if (!requestStatus) {
      console.log('Request not found')
      return response.status(404).json({ message: 'Request not found' })
    }

    requestStatus.assignedAt = new Date()
    await requestStatus.save()
    
    response.status(200).json({ message: 'Request assigned to evaluator successfully', requestStatus })
    console.log('Request assigned to evaluator successfully')
  } catch (error) {
    console.log('Something went wrong while assigning request to evaluator')
    console.log(error.message)
    response.status(500).json({ message: "Internal server error" })
  }
}
// delete revaluation request controller
export const deleteRevaluationRequest = async (request, response) => {
  try {
    const { id } = request.params
    const existingRequest = await RevaluationRequest.findOneAndDelete({ _id: id })
    if (!existingRequest) {
      console.log('Revaluation request not found or invalid user')
      return response.status(404).json({ message: 'Revaluation request not found or invalid user' })
    }

    response.status(200).json({ message: "Revaluation request deleted successfully" })
    console.log('Revaluation request deleted successfully')
  } catch (error) {
    console.log('Something went wrong while deleting revaluation request')
    console.log(error.message)
    response.status(500).json({ message: "Internal server error" })
  }
}
// change password controller  
export const changePassword = async (request, response) => {
  const { oldPassword, newPassword, confirmPassword } = request.body
  const userId = request.user.id

  try {
    if (!oldPassword || !newPassword || !confirmPassword) {
      console.log('Please provide required fields')
      return response.status(400).json({ message: 'Please provide required fields' })
    }

    if (newPassword !== confirmPassword) {
      console.log('Passwords do not match')
      return response.status(400).json({ message: 'Passwords do not match' })
    }

    const user = await User.findOne({ _id: userId })
    if (!user) {
      console.log('User not found')
      return response.status(404).json({ message: 'User not found' })
    }

    const isValidPassword = await bcrypt.compare(oldPassword, user.password)
    if (!isValidPassword) {
      console.log('Invalid old password')
      return response.status(401).json({ message: 'Invalid old password' })
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    user.password = hashedPassword
    await user.save()

    response.status(200).json({ message: "Password changed successfully" })
    console.log('Password changed successfully')
  } catch (error) {
    console.log('Something went wrong while changing password')
    console.log(error.message)
    response.status(500).json({ message: "Internal server error" })
  }
}
