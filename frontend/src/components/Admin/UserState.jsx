// importing packages
import React from 'react'
import { Users, UserCheck, UserX } from 'lucide-react'

// importing modules
import '../../styles/styles.css'

const UserState = (props) => {
  const { totalUserCount, activeUserCount, inactiveUserCount, studentCount } = props

  return (
    <>
      <div className="user-state-cont">
        <div className='user-state-box1'>
          <div className="user-state-card total-user-box">
            <Users size={ 75 } color='#ffa500' className='users-img' />
            <div className="user-state-content-card">
              <p className="user-state-text total-user-text">Total User</p>
              <span className='users-count total-count'>{ totalUserCount > 0 ? totalUserCount : 0 }</span>
            </div>
          </div>
          <div className="user-state-card active-user-box">
            <UserCheck size={ 75 } color='#008000' className='users-img' />
            <div className="user-state-content-card">
              <p className="user-state-text active-user-text">Active User</p>
              <span className='users-count active-count'>{ activeUserCount > 0 ? activeUserCount : 0 }</span>
            </div>
          </div>
        </div>
        <div className='user-state-box1'>
          <div className="user-state-card inactive-user-box">
            <UserX size={ 75 } color='#ff4500' className='users-img' />
            <div className="user-state-content-card">
              <p className="user-state-text inactive-user-text">Inactive User</p>
              <span className='users-count inactive-count'>{ inactiveUserCount > 0 ? inactiveUserCount : 0 }</span>
            </div>
          </div>
          <div className="user-state-card student-box">
            <UserX size={ 75 } color='#00a2ff' className='users-img' />
            <div className="user-state-content-card">
              <p className="user-state-text student-text">Students</p>
              <span className='users-count student-count'>{ studentCount > 0 ? studentCount : 0 }</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserState
