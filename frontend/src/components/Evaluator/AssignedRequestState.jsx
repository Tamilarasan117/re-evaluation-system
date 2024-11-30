// importing packages
import React from 'react'
import { ClockArrowDown, ListCheck, Send, TrendingUp } from 'lucide-react'

// importing modules
import '../../styles/styles.css'

const AssignedRequestState = (props) => {
  const { requestCount, completedCount, processCount, pendingCount } = props

  return (
    <div className='request-state-cont'>
      <div className='user-state-box1'>
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
            <p className="user-state-text active-user-text">Completed</p>
            <span className='users-count active-count'>{ completedCount }</span>
          </div>
        </div>
      </div>
      <div className='user-state-box1'>
        <div className="user-state-card student-box">
          <ClockArrowDown size={ 90 } color='#00a2ff' className='users-img' />
          <div className="user-state-content-card">
            <p className="user-state-text student-text">In Progress</p>
            <span className='users-count student-count'>{ processCount }</span>
          </div>
        </div>
        <div className="user-state-card inactive-user-box">
          <TrendingUp size={ 90 } color='#ff4500' className='users-img' />
          <div className="user-state-content-card">
            <p className="user-state-text inactive-user-text">Pending</p>
            <span className='users-count inactive-count'>{ pendingCount }</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssignedRequestState