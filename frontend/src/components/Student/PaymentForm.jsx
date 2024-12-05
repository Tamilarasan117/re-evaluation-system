// importing packages
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Loader } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'
import toast from 'react-hot-toast'
import axios from 'axios'

// importing modules
import '../../styles/styles.css'
import { useStudent } from '../hooks/useStudent.js'

// importing components
import RequestInfo from '../Evaluator/RequestInfo.jsx'

const API_URL = 'http://localhost:5000/api/student'
//const API_URL = 'https://re-evaluation-system.onrender.com/api/student'
const stripePromise = loadStripe('pk_test_51QNbo5KnEShZpXMA7FhbjUtj9zZLtXBvQraFMl1SVnEGdJu4EnRB0iJNsSdC1AjZ8wjNErd1HAz69iTYl6bhyXMG00oCpDcCMi')

const PaymentForm = () => {
  const { getRevaluationRequest, requestCart } = useStudent()
  const [isLoading, setIsLoading] = useState(false)

  const handleStripePayment = async () => {
    setIsLoading(true)
    const stripe = await stripePromise

    try {
      const response = await axios.post(`${ API_URL }/create-checkout-session`, { requestCart })
      const session = response.data
      const result = await stripe.redirectToCheckout({ sessionId: session.sessionId })
      if (result.error) {
        toast.error(result.error.message)
        console.log(result.error.message)
      }
      setIsLoading(false)
    } catch (error) {
      toast.error('Error creating payment session')
      console.error('Error creating payment session: ', error)
    }
  }

  useEffect(() => {
    getRevaluationRequest()
  }, [getRevaluationRequest])

  return (
    <div className='payment-cont'>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition = {{ duration: 0.6 }}
        className='request-cart'
      >
        <h1 className='request-cart-head'>Request Details</h1>
        <div className='request-cart-body'>
          <RequestInfo
            label='Name: '
            data={ requestCart?.studentName }
          />
          <RequestInfo
            label='Token No: '
            data={ requestCart?.studentTokenNo }
          />
          <RequestInfo
            label='Subject: '
            data={ requestCart?.subject }
          />
          <RequestInfo
            label='Reason: '
            data={ requestCart?.reason }
          />
          <RequestInfo
            label='Re-Evaluation Fees: '
            data={ requestCart?.fees }
          />
          <RequestInfo
            label='Request Document: '
          />
          <img src={ requestCart?.document } className='request-cart-img' alt='request-document' />
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            type='submit'
            className="request-btn"
            onClick={ handleStripePayment }
            disabled={ isLoading }
          >
          {
            isLoading ?
              <Loader color='#fff' className='animate-spinner' size={ 25 } aria-label="Loading Spinner" />
              : 'Pay Re-Evaluation Fees'
          }
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default PaymentForm
