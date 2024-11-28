import React from 'react'

import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

import RequestInfo from './RequestInfo'

const AssignedRequestList = (props) => {
  const  { assignedRequestList } = props
  const navigate = useNavigate()

  const dateFormat = (date) => {
    const newDate = new Date(date)
    const year = newDate.getFullYear()
    const month = newDate.getMonth() + 1
    const day = newDate.getDate()
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
  }

  const handleViewDetails = (requestId) => {
    navigate(`/evaluator/assigned-requests-details/${ requestId }`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition = {{ duration: 0.6 }}
      className='assigned-list-item'
    >
      <div className='assigned-list-img-card'>
        <img src={ assignedRequestList.document } alt='request-pic' className='assigned-list-img' />
      </div>
      <div className='request-list-details'>
        <h1 className='request-list-title'>{ assignedRequestList.subject }</h1>
        <RequestInfo
          label='Student Name: '
          data={ assignedRequestList.studentName }
        />
        <RequestInfo
          label='Student TK.NO: '
          data={ assignedRequestList.studentTokenNo }
        />
        <RequestInfo
          label='Reason: '
          data={ assignedRequestList.reason }
        />
        <RequestInfo
          label='Assigned Date: '
          data={ dateFormat(assignedRequestList.assignedAt) }
        />
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition = {{ delay: 0.3 }}
          type='click'
          className="auth-button"
          onClick={() => handleViewDetails(assignedRequestList._id)}
        >
          Start Re-Evaluate
        </motion.button>
      </div>
    </motion.div>
  )
}

export default AssignedRequestList
