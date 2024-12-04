// importing package
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import mongoose from "mongoose"

// importing modules
import { RevaluationRequest } from "../models/RevaluationRequest.js"
import { User } from "../models/User.js"
import { Payment } from "../models/Payment.js"
import { stripe } from '../config/stripe.js'

// frontend URL
//const URL = process.env.CLIENT_URL
const URL = 'https://re-evaluation-system.onrender.com'

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
    console.log('Student profile fetched successfully')
  } catch (error) {
    console.log('Something went wrong while fetching student profile')
    console.log(error.message)
    response.status(500).json({ message: "Internal server error" })
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
  } catch (error) {
    console.log('Something went wrong while updating student profile')
    console.log(error.message)
    response.status(500).json({ message: "Internal server error" })
  }
}
// revaluation request controller
export const revaluationRequest = async (request, response) => {
  const userId = request.user.id
  const {
    studentName, studentTokenNo, email, course,
    semester, subject, mark, fees, document, reason
  } = request.body
  
  try {
    if (!studentName || !studentTokenNo || !email || !course || !semester || !subject || !mark || !fees || !reason) {
      console.log('Please fill all the fields')
      return response.status(400).json({ message: 'Please fill all the fields' })
    }
    
    if (fees < 50) {
      console.log('Fees should be at least 50')
      return response.status(400).json({ message: 'Fees should be at least 50' })
    }
    
    const existingRequest = await RevaluationRequest.findOne({
      studentId: userId,
      email,
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
      email,
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
    console.log('Something went wrong while submitting revaluation request')
    console.log(error.message)
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
  } catch (error) {
    console.log('Something went wrong while fetching revaluation requests')
    console.log(error.message)
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
    console.log('Something went wrong while retrieving revaluation requests')
    console.log(error.message)
    response.status(500).json({ message: "Internal server error" })
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
// create checkout session controller
export const createCheckoutSession = async (request, response) => {
  try {
    const { requestCart } = request.body
    const requestsItem = [ requestCart ]
    if (!Array.isArray(requestsItem) || requestsItem.length === 0) {
      console.log('Invalid or empty request items array')
      return response.status(400).json({ error: 'Invalid or empty request items array' })
    }
    
    let totalAmount = 0
    const lineItems = requestsItem.map((item) => {
      const amount = Math.round(item.fees * 100)
      totalAmount += amount * 1
      
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.subject,
            description: item.reason,
          },
          unit_amount: amount
        },
        "quantity": 1
      }
    })
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${ URL }/student/request-payment-success`,
			cancel_url: `${ URL }//student/request-payment-cancel`,
      metadata: {
        userId: request.user._id.toString(),
        requestsItem: JSON.stringify(
					requestsItem.map((item) => ({
						id: item._id,
						quantity: 1,
						price: item.fees,
					}))
				),
      }
    })

    response.status(200).json({ sessionId: session.id, totalAmount: totalAmount / 100 })
    console.log('Payment checkout session created successful')
  } catch (error) {
    console.log('Something went wrong while creating checkout session')
    console.error(error)
    response.status(500).json({ message: "Internal server error" })
  }
}
// payment success controller
export const paymentSuccess = async (request, response) => {
  const userId = request.user.id
  const { id } = request.params
  try {
    const existingRequest = await RevaluationRequest.findById({
      _id: id,
      studentId: userId
    })
    if (!existingRequest) {
      console.log('Revaluation request not found')
      return response.status(404).json({ message: 'Revaluation request not found' })
    }

    const transactionId = crypto.randomBytes(10).toString('hex')
    const updatePayment = new Payment({
      studentId: userId,
      revaluationRequestId: id,
      transactionId: transactionId,
      paymentAmount: existingRequest.fees,
      paymentStatus: 'Paid',
      username: request.user.username,
      email: request.user.email,
      subject: existingRequest.subject,
      paymentDate: new Date()
    })
    await updatePayment.save()
    existingRequest.paymentStatus = 'Paid'
    await existingRequest.save()

    console.log('Payment success')
    response.status(200).json({ message: 'Payment success' })
  } catch (error) {
    console.log('Something went wrong while updating payment status')
    console.error(error)
    response.status(500).json({ message: "Internal server error" })
  }
}
// get request payment history controller
export const getPaymentHistory = async (request, response) => {
  const userId = request.user.id
  try {
    const paymentHistory = await Payment.find({ studentId: userId })
    if (!paymentHistory) {
      console.log('Payment history not found')
      return response.status(404).json({ message: 'Payment history not found' })
    }

    console.log('Payment history found')
    response.status(200).json(paymentHistory)
  } catch (error) {
    console.log('Something went wrong while fetching payment history')
    response.status(500).json({ message: "Internal server error" })
  }
}
