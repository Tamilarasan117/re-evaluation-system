// importing packages
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

// importing modules
import '../../styles/styles.css'
import noResult from '../../assets/no-user.jpg'
import { useStudent } from '../hooks/useStudent.js'

// importing components
import PaymentList from './PaymentList.jsx'

const PaymentHistory = () => {
  const { getPaymentHistory, paymentHistory } = useStudent()
  const allPaymentHistory = paymentHistory ? paymentHistory.map((history, index) => {
    return (
      <PaymentList
        key={ index }
        paymentHistory={ history }
      />
    )
  }) : ''

  const NoResult = () => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 75 }}
        animate={{ opacity: 1, y: 0 }}
        transition = {{ duration: 0.6 }}
      >
        <div className='no-result-card'>
          <img src={ noResult } className='no-result-img' alt='No User Available' />
        </div>
      </motion.div>
    )
  }

  console.log('payment history: ', paymentHistory)

  useEffect(() => {
    getPaymentHistory()
  }, [getPaymentHistory])

  return (
    <div className='request-status-main-cont'>
      <h1 className='payment-history-head'>Payment History</h1>
      <ul className='request-status-cont'>
        { allPaymentHistory.length > 0 ? allPaymentHistory : <NoResult /> }
      </ul>
    </div>
  )
}

export default PaymentHistory
