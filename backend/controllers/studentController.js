// import required package
import { Payment } from "../models/Payment.js"
import { RevaluationRequest } from "../models/RevaluationRequest.js"
import { User } from "../models/User.js"

// get student profile information controller
export const getStudentProfile = async (request, response) => {
  try {
    const userId = request.user.id
    const user = await User.findById(userId).select('-password')
    user.tokenNo = user.email.split('@')[0].toUpperCase()
    await user.save()

    if (!user) {
      return response.status(404).json({ message: 'User not found' })
    }
    response.status(200).json(user)
    console.log({
      username: user.username,
      email: user.email,
      tokenNo: user.email.split('@')[0].toUpperCase(),
    })
  } catch (error) {
    response.status(500).json({ message: "Internal server error" })
    console.log(error)
  }
}
// update student profile information controller
export const updateStudentProfile = async (request, response) => {
  try {
    const userId = request.user.id
    const { username, email, phone, dob, department, course, sem, bio, address, profile } = request.body
    const studentProfile = await User.findByIdAndUpdate(
      userId,
      { username, email, phone, dob, department, course, sem, bio, address, profile },
      { new: true }
    )
    if (!studentProfile) {
      return response.status(404).json({ message: 'User not found' })
    }

    response.status(200).json({ message: "Student profile updated successfully", studentProfile: studentProfile })
    console.log('Student profile info updated successfully')
    console.log({
      username: studentProfile.username,
      email: studentProfile.email,
      phone: studentProfile.phone,
      dob: studentProfile.dob,
      bio: studentProfile.bio,
      address: studentProfile.address,
    })
  } catch (error) {
    response.status(500).json({ message: "Internal server error" })
    console.log(error)
  }
}
// revaluation request controller
export const revaluationRequest = async (request, response) => {
  const userId = request.user.id
  const {
    studentName, studentTokenNo, department, course,
    semester, subject, mark, fees, document, reason
  } = request.body
  
  try {
    if (!studentName || !studentTokenNo || !department || !course || !semester || !subject || !mark || !fees || !document || !reason) {
      console.log('Please fill all the fields')
      return response.status(400).json({ message: 'Please fill all the fields' })
    }
    
    if (fees < 350) {
      console.log('Fees should be at least 350')
      return response.status(400).json({ message: 'Fees should be at least 350' })
    }
    
    const existingRequest = await RevaluationRequest.findOne({
      studentId: userId,
      department,
      semester,
      subject,
    })
    
    if (existingRequest) {
      console.log('You have already submitted a revaluation request for this subject')
      return response.status(400).json({
        message: `You have already submitted a revaluation request for this ${ semester } sem ${ subject } subject`,
      })
    }
    
    const newRequest = new RevaluationRequest({
      studentId: userId,
      studentName,
      studentTokenNo,
      department,
      course,
      semester,
      subject,
      mark,
      fees,
      document,
      reason
    })
    
    await newRequest.save()
    
    response.status(200).json({
      message: "Reevaluation request submitted successfully",
      data: newRequest,
    })
    console.log('Reevaluation request submitted successfully')
  } catch (error) {
    console.log(error.errors)
    response.status(500).json({ message: "Internal server error" })
  }
}
// get revaluation request controller
export const getRevaluationRequest = async (request, response) => {
  try {
    const userId = request.user.id
    
    const revaluationRequests = await RevaluationRequest.find({ studentId: userId })
    if (!revaluationRequests) {
      return response.status(404).json({ message: "No revaluation requests found" })
    }
    
    response.status(200).json({
      message: "Revaluation requests fetched successfully",
      data: {
        revaluationRequestId: revaluationRequests[0]._id,
        studentName: revaluationRequests[0].studentName,
        studentTokenNo: revaluationRequests[0].studentTokenNo,
        department: revaluationRequests[0].department,
        course: revaluationRequests[0].course,
        semester: revaluationRequests[0].semester,
        subject: revaluationRequests[0].subject,
        mark: revaluationRequests[0].mark,
        fees: revaluationRequests[0].fees,
        reason: revaluationRequests[0].reason,
        document: revaluationRequests[0].document,
      },
    })
    console.log('Revaluation requests fetched successfully')
    console.log({
      studentName: revaluationRequests[0].studentName,
      studentTokenNo: revaluationRequests[0].studentTokenNo,
      department: revaluationRequests[0].department,
      course: revaluationRequests[0].course,
      semester: revaluationRequests[0].semester,
      subject: revaluationRequests[0].subject,
      mark: revaluationRequests[0].mark,
      fees: revaluationRequests[0].fees,
      reason: revaluationRequests[0].reason,
    })
  } catch (error) {
    console.log(error)
    response.status(500).json({ message: "Internal server error" })
  }
}
// request payment controller
export const requestPayment = async (request, response) => {
  const userId = request.user.id
  const { id } = request.params
  const { paymentAmount, paymentStatus, username, email, cardNumber, expireDate, cvc } = request.body
  try {
    const existingRequest = await RevaluationRequest.findById({ _id: id, studentId: userId})
    if (!existingRequest) {
      console.log('Revaluation request not found')
      return response.status(404).json({ message: 'Revaluation request not found' })
    }

    const paymentRequest = await Payment.create({
      revaluationRequestId: existingRequest._id,
      studentId: existingRequest.studentId,
      paymentAmount: paymentAmount,
      username: existingRequest.studentName,
      email: email,
      cvc: cvc,
      cardNumber: cardNumber,
      expireDate: expireDate,
      paymentStatus: paymentStatus,
    })

    existingRequest.paymentStatus = 'Paid'
    await existingRequest.save()
    await paymentRequest.save()
    
    response.status(200).json({
      message: "Payment request sent successfully",
      data: paymentRequest,
    })
    console.log('Payment request sent successfully')
    console.log(paymentRequest)
  } catch (error) {
    console.log(error)
    response.status(500).json({ message: "Internal server error" })
  }
}
// get student requested revaluation controller
export const getAllRequestedRevaluation = async (request, response) => {
  const userId = request.user.id
  try {
    const revaluationRequests = await RevaluationRequest.find({ studentId: userId })
    if (!revaluationRequests) {
      console.log('No revaluation requests found')
      return response.status(404).json({ message: 'No revaluation requests found' })
    }

    response.status(200).json({
      message: "Revaluation requests retrieved successfully",
      data: revaluationRequests
    })
    console.log("Revaluation requests retrieved successfully" )
  } catch (error) {
    response.status(500).json({ message: "Internal server error" })
    console.log(error)
  }
}
// delete revaluation request controller
export const deleteRevaluationRequest = async (request, response) => {
  try {
    const userId = request.user.id
    const { id } = request.params
    const existingRequest = await RevaluationRequest.findOneAndDelete({
      _id: id,
      studentId: userId,
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