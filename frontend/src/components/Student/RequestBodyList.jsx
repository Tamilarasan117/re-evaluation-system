import React from 'react'

import { motion } from 'framer-motion'
import { Trash2 } from 'lucide-react'

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
    <li className='request-body-list-cont'>
      <h1 className='request-body-list-head'>Requested Card</h1>
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
            Delete Request <Trash2 color='#fff' />
          </motion.button>
        </div>
      </div>
    </li>
  )
}

export default RequestBodyList


/*
import React from 'react'

import { Trash2 } from 'lucide-react'

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

  const completed = request.status === 'Completed' ? 'completed' : ''
  const progress = request.status === 'InProgress' ? 'process' : ''
  const pending = request.status === 'Pending' ? 'pending' : ''
  const approved = request.status === 'Approved' ? 'approved' : ''
  const rejected = request.status === 'Rejected' ? 'rejected' : ''

  return (
    <li className='request-body-list-cont'>
      <div className='request-body-header-card1'>
        <p className='list-body-msg'>{ request.subject }</p>
      </div>
      <div className='request-body-header-card3'>
        <p className='list-body-msg'>{ request.mark }</p>
      </div>
      <div className='request-body-header-card2'>
        <p className='list-body-msg'>
        { request.revaluatedMark ? request.revaluatedMark: '-' }
        </p>
      </div>
      <div className='request-body-header-card2'>
        <p className={`list-body-msg ${ completed } ${ progress } ${ pending } ${ rejected } ${ approved }`}>
          { request.status }
        </p>
      </div>
      <div className='request-body-header-card1'>
        <p className='list-body-msg'>
          { request.comment ? request.comment : '' }
        </p>
      </div>
      <div className='request-body-header-card2'>
        <p className='list-body-msg'>{ dateFormat(request.createdAt) }</p>
      </div>
      <div className='request-body-header-card3'>
        <button onClick={ handleDelete } className='list-delete-btn'> <Trash2 color='#333' /> </button>
      </div>
    </li>
  )
}

export default RequestBodyList
*/

/*
import React, { useEffect } from 'react'

import toast from 'react-hot-toast'

import '../../styles/styles.css'
import RevaluationStatusState from './RequestStatusState.jsx'
import RequestBodyHeader from './RequestBodyHeader.jsx'
import RequestBodyList from './RequestBodyList.jsx'
import noResult from '../../assets/no-user.jpg'
import { useStudent } from '../hooks/useStudent.js'

const RevaluationStatus = () => {
  const { allRequestList, deleteRequest, getAllRevaluationRequest } = useStudent()

  const requestCount = allRequestList?.length
  const completedRequest = allRequestList?.filter( each => each.status === 'Completed')
  const completedCount = completedRequest?.length
  const inProgressRequest = allRequestList?.filter( each => each.status === 'InProgress')
  const inProgressCount = inProgressRequest?.length
  const pendingRequest = allRequestList?.filter( each => each.status === 'Pending')
  const pendingCount = pendingRequest?.length

  const handleDeleteRequest = async (requestId) => {
    const confirm = window.confirm('Are you sure you want to delete this request?')
    if (!confirm) return
    
    try {
      await deleteRequest(requestId)
      toast.success('Request deleted successfully')
      getAllRevaluationRequest()
    } catch (error) {
      toast.error('Failed to delete request')
      console.log(error)
    }
  }

  const requestLists = allRequestList ? allRequestList.map((each, index) => {
    return (
      <RequestBodyList
        key={ index }
        request={ each }
        handleDeleteRequest={ handleDeleteRequest }
      />
    )
  }) : ''

  const NoResult = () => {
    return (
      <div className='no-result-card'>
        <img src={ noResult } className='no-result-img' alt='No User Available' />
      </div>
    )
  }

  useEffect(() => {
    getAllRevaluationRequest()
  }, [getAllRevaluationRequest])

  return (
    <div className='request-status-main-cont'>
      <RevaluationStatusState
        requestCount={ requestCount }
        completedCount={ completedCount }
        inProgressCount={ inProgressCount }
        pendingCount={ pendingCount }
      />
      <ul className='request-status-body-cont'>
        <RequestBodyHeader />
        { requestLists.length > 0 ? requestLists : <NoResult /> }
      </ul>
    </div>
  )
}

export default RevaluationStatus
*/

/*
.request-status-main-cont {
  width: 100%;
  min-height: 80vh;
  padding: 0 7px;
}
.request-state-cont {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
.request-status-body-cont {
  margin-top: 15px;
  min-width: 1000px;
  box-shadow: 0 0 15px #888;
  border-radius: 10px;
  padding: 15px;
}
.request-body-header-cont {
  margin-top: 15px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ddd;
  padding: 10px 0;
}
.request-body-header-card1 {
  width: 225px;
  padding-left: 15px;
  text-align: center;
}
.request-body-header-card2 {
  width: 175px;
  text-align: center;
}
.request-body-header-card3 {
  width: 150px;
  text-align: center;
}
.request-body-list-cont {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}
.list-body-msg {
  font-size: 16px;
  color: #555;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.list-check-icon {
  color: green;
  margin-left: 7px;
}
.completed {
  color: #008000 !important;
}
.process {
  color: #7bff00 !important;
}
.pending {
  color: #ff9100 !important;
}
.rejected {
  color: #ff0000 !important;
}
.approved {
  color: #00a2ff !important;
}
.request-list-header-cont {
  margin-top: 15px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ddd;
  padding: 10px 10px;
}
.request-list-card {
  text-align: center;
}
.card1 {
  width: 190px;
}
.card2 {
  width: 90px;
}
.card3 {
  width: 140px;
}
.card4 {
  width: 150px;
}
.request-list-msg {
  color: #666;
  font-size: 16px !important;
  overflow-wrap: break-word;
}
*/