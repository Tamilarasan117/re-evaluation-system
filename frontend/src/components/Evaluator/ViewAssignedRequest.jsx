// importing packages
import React, { useEffect } from 'react'

// importing modules
import '../../styles/styles.css'
import { useEvaluator } from '../hooks/useEvaluator.js'
import noResult from '../../assets/no-user.jpg'

// importing components
import AssignedRequestState from './AssignedRequestState.jsx'
import AssignedRequestList from './AssignedRequestList.jsx'

const ViewAssignedRequest = () => {
  const { getAssignedRequests, requestList } = useEvaluator()

  const requestCount = requestList?.length
  const completedRequest = requestList?.filter( each => each.status === 'Completed')
  const completedCount = completedRequest?.length
  const processRequest = requestList?.filter( each => each.status === 'InReview')
  const processCount = processRequest?.length
  const pendingRequest = requestList?.filter( each => each.status === 'Pending')
  const pendingCount = pendingRequest?.length

  const assignedRequestList = requestList ? requestList.map((each, index) => {
    return (
      <AssignedRequestList
        key={ index }
        assignedRequestList={ each }
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
    getAssignedRequests()
  }, [getAssignedRequests])

  return (
    <div className='request-status-main-cont'>
      <AssignedRequestState
        requestCount={ requestCount }
        completedCount={ completedCount }
        processCount={ processCount }
        pendingCount={ pendingCount }
      />
      <ul className='assigned-request-cont'>
        <li className='assigned-cont-head-list'>
          <h1 className='assigned-list-head '>Assigned Request Lists</h1>
        </li>
        { assignedRequestList.length > 0 ? assignedRequestList  : <NoResult /> }
      </ul>
    </div>
  )
}

export default ViewAssignedRequest
