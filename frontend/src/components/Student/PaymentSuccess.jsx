import React from 'react'

import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useStudent } from '../hooks/useStudent.js'
import { Loader } from 'lucide-react'

const PaymentSuccess = () => {
  const navigate = useNavigate()

  const { isLoading, paymentDetails } = useStudent()
  console.log('payment details data: ', paymentDetails)

  return (
    <motion.div 
      initial={{ opacity: 0, y: 75 }}
      animate={{ opacity: 1, y: 0 }}
      transition = {{ duration: 0.6 }}
      className='request-cart'
    >
      <h1 className='payment-success-head'>Payment Successful!</h1>
      <p className='payment-success-message'>
        Thank you for your payment! Your re-evaluation request has been successfully submitted.
      </p>
      <div className='payment-success-detail-cont'>
        <h2 className='pay-success-detail-head'>Payment Details:</h2>
        <div className='pay-success-detail-card'>
          <p className='pay-success-card-msg'>Payment ID: { paymentDetails._id }</p>
          <p className='pay-success-card-msg'>Amount Paid: { paymentDetails.paymentAmount } (RS)</p>
          <p className='pay-success-card-msg'>Payment Status: { paymentDetails.paymentStatus }</p>
          <p className='pay-success-card-msg'>Date: { new Date(paymentDetails.paymentDate).toLocaleString() }</p>
          <p className='pay-success-card-msg'>Student ID: { paymentDetails.studentId }</p>
          <p className='pay-success-card-msg'>Revaluation Request ID: { paymentDetails.revaluationRequestId }</p>
        </div>
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition = {{ delay: 0.3 }}
          type='submit'
          className="request-btn"
          disabled={ isLoading }
          onClick={ () => navigate('/student/profile') }
        >
          { isLoading ?
              <Loader color='#fff' className='animate-spinner' size={ 25 } aria-label="Loading Spinner" />
            : 'Go to Dashboard'
          }
        </motion.button>
      </div>
    </motion.div>
  )
}

export default PaymentSuccess
