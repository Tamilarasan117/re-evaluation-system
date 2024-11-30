import React from 'react'

import { CircleCheck } from 'lucide-react'
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
      className='pay-success-card'
    >
      <div className='pay-success-box'>
        <h1 className='payment-success-head'>Payment Successful!</h1>
        <div className='pay-suc-icon'><CircleCheck size={ 50 } color='#4CAF50' /></div>
        <p className='payment-success-message'>
          Thank you for your payment! Your re-evaluation request has been successfully submitted.
        </p>
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
            : 'Back to Profile'
          }
        </motion.button>
      </div>
    </motion.div>
  )
}

export default PaymentSuccess
