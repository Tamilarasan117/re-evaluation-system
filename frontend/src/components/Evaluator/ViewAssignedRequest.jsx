// importing packages
import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react'

// importing modules
import '../../styles/styles.css'
import { useEvaluator } from '../hooks/useEvaluator.js'
import noResult from '../../assets/no-user.jpg'

// importing components
import AssignedRequestState from './AssignedRequestState.jsx'
import AssignedRequestList from './AssignedRequestList.jsx'

const ViewAssignedRequest = () => {
  const { getAssignedRequests, requestList } = useEvaluator()
  const [searchValue, setSearchValue] = useState('')

  const requestCount = requestList?.length
  const completedRequest = requestList?.filter( each => each.status === 'Completed')
  const completedCount = completedRequest?.length
  const processRequest = requestList?.filter( each => each.status === 'InReview')
  const processCount = processRequest?.length
  const pendingRequest = requestList?.filter( each => each.status === 'Pending')
  const pendingCount = pendingRequest?.length

  const filteredRequests = requestList ? requestList.filter(request => (
    request.subject.toLowerCase().includes(searchValue.toLowerCase())
  )) : ''

  const assignedRequestList = filteredRequests ? filteredRequests.map((each, index) => {
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
        <li className='assigned-cont-head-list'>
          <div className='request-status-state-cont'>
            <p className='request-count-text'>
              Total Requests: 
              <span className='request-count'>{ requestCount }</span>
            </p>
            <div className="user-search-container">
              <input
                type="search"
                placeholder='Search by subject name or request status'
                className="user-search-field"
                onChange={ (e) => setSearchValue(e.target.value) }
                value={ searchValue }
              />
              <Search color='grey' />
            </div>
          </div>
        </li>
        { assignedRequestList.length > 0 ? assignedRequestList  : <NoResult /> }
      </ul>
    </div>
  )
}

export default ViewAssignedRequest
