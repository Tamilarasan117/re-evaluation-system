// importing package
import bcrypt from 'bcryptjs'

// importing modules
import { User } from "../models/User.js"
import { RevaluationRequest } from "../models/RevaluationRequest.js"

// get profile information controller
export const getEvaluatorProfile = async (request, response) => {
  try {
    const userId = request.user.id
    const user = await User.findById(userId).select('-password')
    if (!user) {
      return response.status(404).json({ message: 'User not found' })
    }

    response.status(200).json(user)
    console.log('Evaluator profile retrieved successfully')
  } catch (error) {
    console.log('Something went wrong while retrieving evaluator profile')
    console.log(error.message)
    response.status(500).json({ message: "Internal server error" })
  }
}
// update profile information controller
export const updateProfile = async (request, response) => {
  try {
    const userId = request.user.id
    const { username, phone, dob, department, course, bio, address, profile } = request.body
    const evaluatorProfile = await User.findByIdAndUpdate(
      userId,
      { username, phone, dob, department, course, bio, address, profile },
      { new: true }
    )
    if (!evaluatorProfile) {
      return response.status(404).json({ message: 'User not found' })
    }

    response.status(200).json({ message: "Evaluator profile updated successfully", evaluatorProfile: evaluatorProfile })
    console.log('Evaluator profile info updated successfully')
  } catch (error) {
    console.log('Something went wrong while updating evaluator profile')
    console.log(error.message)
    response.status(500).json({ message: "Internal server error" })
  }
}
// get all assigned request controller
export const getAllAssignedRequests = async (request, response) => {
  try {
    const userId = request.user.id
    const assignedRequests = await RevaluationRequest.find({ evaluatorId: userId })
    if (!assignedRequests) {
      console.log('No assigned request found')
      response.status(404).json({ message: 'No assigned requests found' })
    }
    
    response.status(200).json({
      message: "All assigned requests retrieved successfully",
      assignedRequests: assignedRequests
    })
    console.log('all assigned requests retrieved successfully')
  } catch (error) {
    console.log('Something went wrong while retrieving assigned requests')
    console.log(error.message)
    response.status(500).json({ message: "Internal server error" })
  }
}
// get specific request controller
export const getSpecificRequestDetails = async (request, response) => {
  try {
    const userId = request.user.id
    const { id } = request.params
    const assignedRevaluation = await RevaluationRequest.findOne({ _id: id, evaluatorId: userId })
    if (!assignedRevaluation) {
      console.log('Assigned revaluation not found')
      return response.status(404).json({ message: 'Assigned revaluation not found' })
    }
    
    response.status(200).json({
      message: "Requested revaluation retrieved successfully",
      assignedRevaluation: assignedRevaluation
    })
    console.log('requested revaluation retrieved successfully')
  } catch (error) {
    console.log('Something went wrong while retrieving assigned requests')
    console.log(error.message)
    response.status(500).json({ message: "Internal server error" })
  }
}
// update request status controller
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
// update request controller
export const updateRequestDetails = async (request, response) => {
  try {
    const userId = request.user.id
    const { id } = request.params
    const { comment, revaluatedMark } = request.body
    const updatedRequest = await RevaluationRequest.findByIdAndUpdate(
      { _id: id, evaluatorId: userId },
      { comment, revaluatedMark },
      { new: true }
    )
    if (!updatedRequest) {
      console.log('Request not found')
      return response.status(404).json({ message: 'Assigned revaluation not found' })
    }

    updatedRequest.updatedAt = new Date()
    await updatedRequest.save()
    
    response.status(200).json({ message: "Request updated successfully", updatedRequest: updatedRequest })
    console.log('request updated successfully')
  } catch (error) {
    console.log('Something went wrong while updating request')
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