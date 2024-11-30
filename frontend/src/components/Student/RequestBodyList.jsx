// importing packages
import React from 'react'
import { motion } from 'framer-motion'
import { Trash2 } from 'lucide-react'

// importing modules
import '../../styles/styles.css'

// importing components
import RequestInfo from '../Evaluator/RequestInfo.jsx'

const RequestBodyList = (props) => {
  const { request, handleDeleteRequest } = props

  const handleDelete = () => {
    handleDeleteRequest(request._id)
  }

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
      <li className='request-body-list-card'>
        <div className='request-body-list-body'>
          <div className='request-body-list-body-top'>
            <img src={request.document} alt='request-image' className='request-body-list-image' />
          </div>
          <div className='request-body-list-body-bottom'>
            <RequestInfo
              label='Reason: '
              data={ request.subject }
            />
            <RequestInfo
              label='Current Mark: '
              data={ request.mark }
            />
            <RequestInfo
              label='Re-Evaluated Mark: '
              data={ request.revaluatedMark ? request.revaluatedMark: 'no update' }
            />
            <RequestInfo
              label='Request Status: '
              data={ request.status }
            />
            <RequestInfo
              label='Requested Date: '
              data={ dateFormat (request.createdAt) }
            />
            <RequestInfo
              label='Comments: '
              data={ request.comment ? request.comment : 'no update' }
            />
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition = {{ delay: 0.3 }}
              type='click'
              onClick={ handleDelete }
              className='request-delete-btn'
            >
              Delete Request <Trash2 size={ 17 } color='#fff' />
            </motion.button>
          </div>
        </div>
      </li>
    </motion.div>
  )
}

export default RequestBodyList
