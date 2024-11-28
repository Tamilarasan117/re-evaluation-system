import React from 'react'

import { ClockArrowDown, ListCheck, Send, TrendingUp } from 'lucide-react'

const RequestState = (props) => {
  const { requestCount, approvedCount, pendingCount, rejectedCount } = props

  return (
    <div className='request-state-cont'>
      <div className="user-state-card total-user-box">
        <Send size={ 90 } color='#ffa500' className='users-img' />
        <div className="user-state-content-card">
          <p className="user-state-text total-user-text">Total Requests</p>
          <span className='users-count total-count'>{ requestCount }</span>
        </div>
      </div>
      <div className="user-state-card active-user-box">
        <ListCheck size={ 90 } color='#008000' className='users-img' />
        <div className="user-state-content-card">
          <p className="user-state-text active-user-text">Approved</p>
          <span className='users-count active-count'>{ approvedCount }</span>
        </div>
      </div>
      <div className="user-state-card student-box">
        <ClockArrowDown size={ 90 } color='#00a2ff' className='users-img' />
        <div className="user-state-content-card">
          <p className="user-state-text student-text">Pending</p>
          <span className='users-count student-count'>{ pendingCount }</span>
        </div>
      </div>
      <div className="user-state-card inactive-user-box">
        <TrendingUp size={ 90 } color='#ff4500' className='users-img' />
        <div className="user-state-content-card">
          <p className="user-state-text inactive-user-text">Rejected</p>
          <span className='users-count inactive-count'>{ rejectedCount }</span>
        </div>
      </div>
    </div>
  )
}

export default RequestState