// importing packages
import React from 'react'
import { motion } from 'framer-motion'
import { Trash2 } from 'lucide-react'

// importing modules
import '../../styles/styles.css'

// importing components
import RequestInfo from '../Evaluator/RequestInfo.jsx'

const PaymentList = (props) => {
  const { paymentHistory } = props

  const dateFormat = (date) => {
    const newDate = new Date(date)
    const year = newDate.getFullYear()
    const month = newDate.getMonth() + 1
    const day = newDate.getDate()
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 75 }}
      animate={{ opacity: 1, y: 0 }}
      transition = {{ duration: 0.6 }}
    >
      <li className='history-list-card'>
        <h1 className='history-head'>Subject: { paymentHistory.subject }</h1>
        <div className='history-card'>
          <RequestInfo
            label='Transaction ID: '
            data={ paymentHistory.transactionId }
          />
          <RequestInfo
            label='Name: '
            data={ paymentHistory.username }
          />
          <RequestInfo
            label='Email: '
            data={ paymentHistory.email }
          />
          <RequestInfo
            label='Payment Amount: '
            data={ paymentHistory.paymentAmount }
          />
          <RequestInfo
            label='Payment Status: '
            data={ paymentHistory.paymentStatus }
          />
          <RequestInfo
            label='Payment Date: '
            data={ dateFormat(paymentHistory.paymentDate) }
          />
        </div>
      </li>
    </motion.div>
  )
}

export default PaymentList
