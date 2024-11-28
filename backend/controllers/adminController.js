// import required package
import { User } from "../models/User.js"
import { RevaluationRequest } from "../models/RevaluationRequest.js"
import { Payment } from "../models/Payment.js"

// get user controller
export const getUser = async (request, response) => {
  try {
    const users = await User.find()
    response.status(200).json( users )
  } catch (error) {
    response.status(500).json({ message: "Internal server error" })
    console.log(error)
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
    console.log('User deleted successfully.', user)
  } catch (error) {
    response.status(500).json({ message: "Internal server error" })
    console.log(error)
  }
}
// update user role controller
export const updateUserRole = async (request, response) => {
  try {
    const userId = request.params.id
    console.log(userId)
    console.log(typeof(userId))
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
  } catch (error) {
    response.status(500).json({ message: "Internal server error" })
    console.log(error)
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
  } catch (error) {
    response.status(500).json({ message: "Internal server error" })
    console.log(error)
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
    console.log({
      username: user.username,
      email: user.email,
      phone: user.phone,
      dob: user.dob,
      bio: user.bio,
      address: user.address,
    })
  } catch (error) {
    response.status(500).json({ message: "Internal server error" })
    console.log(error)
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
    console.log({
      username: adminProfile.username,
      email: adminProfile.email,
      phone: adminProfile.phone,
      dob: adminProfile.dob,
      bio: adminProfile.bio,
      address: adminProfile.address,
    })
  } catch (error) {
    response.status(500).json({ message: "Internal server error" })
    console.log(error)
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
    
    console.log('Revaluation request list fetched successfully')
    response.status(200).json( revaluationRequest )
  } catch (error) {
    response.status(500).json({ message: "Internal server error" })
    console.log(error)
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
    console.log('Request status updated successfully')
    response.status(200).json({ message: 'Request status updated successfully', requestStatus })
  } catch (error) {
    response.status(500).json({ message: "Internal server error" })
    console.log(error)
  }
}
// admin can assign request to a different evaluator controller
export const assignEvaluator = async (request, response) => {
  try {
    const requestId = request.params.id
    const evaluatorId = request.body.evaluatorId
    const requestStatus = await RevaluationRequest.findByIdAndUpdate(requestId, { evaluatorId: evaluatorId }, { new : true })
    if (!requestStatus) {
      console.log('Request not found')
      return response.status(404).json({ message: 'Request not found' })
    }

    requestStatus.assignedAt = new Date()
    await requestStatus.save()
    console.log('Request assigned to evaluator successfully')
    response.status(200).json({ message: 'Request assigned to evaluator successfully', requestStatus })
  } catch (error) {
    response.status(500).json({ message: "Internal server error" })
    console.log(error)
  }
}
// delete revaluation request controller
export const deleteRevaluationRequest = async (request, response) => {
  try {
    const { id } = request.params
    const existingRequest = await RevaluationRequest.findOneAndDelete({
      _id: id,
    })
    if (!existingRequest) {
      console.log('Revaluation request not found or invalid user')
      return response.status(404).json({ message: 'Revaluation request not found or invalid user' })
    }

    response.status(200).json({
      message: "Revaluation request deleted successfully"
    })
    console.log('Revaluation request deleted successfully')
  } catch (error) {
    console.log(error.errors)
    response.status(500).json({ message: "Internal server error" })
  }
}