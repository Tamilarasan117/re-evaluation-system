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
  const inProgressRequest = allRequestList?.filter( each => each.status === 'InReview')
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