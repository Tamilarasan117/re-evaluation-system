// import required package
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
    const { username, phone, dob, department, course, bio, address, profile } = request.body
    const evaluatorProfile = await User.findByIdAndUpdate(
      userId,
      { username, phone, dob, department, course, bio, address, profile },
      { new: true }
    )
    if (!evaluatorProfile) {
      return response.status(404).json({ message: 'User not found' })
    }

    response.status(200).json({ message: "Admin profile updated successfully", evaluatorProfile: evaluatorProfile })
    console.log('admin profile info updated successfully')
    console.log({
      username: evaluatorProfile.username,
      email: evaluatorProfile.email,
      phone: evaluatorProfile.phone,
      dob: evaluatorProfile.dob,
      department: evaluatorProfile.department,
      course: evaluatorProfile.course,
      bio: evaluatorProfile.bio,
      address: evaluatorProfile.address,
    })
  } catch (error) {
    response.status(500).json({ message: "Internal server error" })
    console.log(error)
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
    response.status(500).json({ message: "Internal server error" })
    console.log(error.message)
  }
}
// get specific request controller
export const getSpecificRequestDetails = async (request, response) => {
  try {
    const userId = request.user.id
    const { id } = request.params
    console.log('user id: ', userId)
    console.log('request id: ', id)
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
    response.status(500).json({ message: "Internal server error" })
    console.log(error.message)
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
    console.log('Request status updated successfully')
    response.status(200).json({ message: 'Request status updated successfully', requestStatus })
  } catch (error) {
    response.status(500).json({ message: "Internal server error" })
    console.log(error)
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
    response.status(500).json({ message: "Internal server error" })
    console.log(error.message)
  }
}