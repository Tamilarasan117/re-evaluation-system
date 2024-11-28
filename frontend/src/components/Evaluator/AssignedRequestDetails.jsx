import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

import '../../styles/styles.css'
import { useEvaluator } from '../hooks/useEvaluator.js'

import RequestInfo from './RequestInfo.jsx'
import toast from 'react-hot-toast'

const AssignedRequestDetails = () => {
  const { requestId } = useParams()
  const { getRequestDetails, requestDetails, updateRequestDetails, updateRequestStatus } = useEvaluator()
  const [comment, setComment] = useState('')
  const [newMark, setNewMark] = useState(0)

  const dateFormat = (date) => {
    const newDate = new Date(date)
    const year = newDate.getFullYear()
    const month = newDate.getMonth() + 1
    const day = newDate.getDate()
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
  }

  const handleChangeRequestStatus = async (requestId, requestStatus) => {
    const confirm = window.confirm("Are you sure you want to update this request status?")
    if (!confirm) return
    try {
      await updateRequestStatus(requestId, requestStatus)
      toast.success('Request status updated successfully')
    } catch (error) {
      toast.error('Failed to update request status')
      console.error(error)
    }
  }

  const handleRevaluation = async (e) => {
    e.preventDefault()
    try {
      if (comment === '') {
        toast.error('Please provide a comment')
        return
      } else {
        await updateRequestDetails({
          id: requestDetails._id,
          revaluatedMark: newMark,
          comment: comment,
        })
        toast.success('Revaluation submitted successfully')
        console.log('Revaluation submitted successfully')
        setComment('')
        setNewMark(0)
      }
    } catch (error) {
      toast.error('Failed to submit revaluation')
      console.error(error)
    }
  }

  useEffect(() => {
    getRequestDetails(requestId)
  }, [requestId, getRequestDetails])

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition = {{ duration: 0.6 }}
      className='request-detail-cont'
    >
      <h1 className='request-detail-main-head'>Request Details</h1>
      <form onSubmit={ handleRevaluation } className='revaluate-form'>
        <div className='revaluate-info-card'>
          <div className='revaluate-img-card'>
            <img src={ requestDetails?.document } alt='request-image' className='revaluate-img' />
          </div>
          <div className='revaluate-info'>
            <h1 className='revaluate-info-head'>Subject: { requestDetails?.subject }</h1>
            <RequestInfo
              label='Student Name: '
              data={ requestDetails?.studentName }
            />
            <RequestInfo
              label='Student TK.NO: '
              data={ requestDetails?.studentTokenNo }
            />
            <RequestInfo
              label='Department: '
              data={ requestDetails?.department }
            />
            <RequestInfo
              label='Course: '
              data={ requestDetails?.course }
            />
            <RequestInfo
              label='Semester: '
              data={ requestDetails?.semester }
            />
            <RequestInfo
              label='Reason: '
              data={ requestDetails?.reason }
            />
            <RequestInfo
              label='Current Mark: '
              data={ requestDetails?.mark }
            />
            <RequestInfo
              label='Requested Date: '
              data={ dateFormat(requestDetails?.createdAt) }
            />
            <RequestInfo
              label='Last Update: '
              data={ dateFormat(requestDetails?.updatedAt) }
            />
          </div>
        </div>
        <div className='revaluate-update-card'>
          <h2 className='revaluate-update-head'>Update Request</h2>
          <div className='revaluate-update-group'>
            <div className='update-group-card'>
              <div className='card'>
                <label className='update-group-label'>Evaluator Comment:</label>
                <textarea
                  placeholder='Write some comment about revaluation process'
                  className='update-group-field'
                  value={ comment }
                  onChange={ (e) => setComment(e.target.value) }
                />
              </div>
            </div>
            <div className='update-group-card'>
              <div className='update-input-box'>
                <label htmlFor='newMark' className='update-group-label'>Revaluated Mark:</label>
                <input
                  type='number'
                  id='newMark'
                  placeholder='Enter revaluated mark'
                  className='update-group-field'
                  value={ newMark }
                  onChange={ (e) => setNewMark(e.target.value) }
                  />
              </div>
              <div className='update-input-box'>
                <label htmlFor='status' className='update-group-label'>Revaluation Status:</label>
                <select
                  className='update-group-field'
                  value={ requestDetails?.status }
                  onChange={(e) => handleChangeRequestStatus(requestDetails._id, e.target.value)}
                >
                  <option value='Pending'>Pending</option>
                  <option value='InReview'>InReview</option>
                  <option value='Completed'>Completed</option>
                </select>
              </div>
            </div>
          </div>
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition = {{ delay: 0.3 }}
            type='submit'
            className="update-btn"
          >
            Update Request
        </motion.button>
        </div>
      </form>
    </motion.div>
  )
}

export default AssignedRequestDetails
