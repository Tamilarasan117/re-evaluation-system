import React from 'react'

const RequestListHeader = () => {
  return (
    <>
      <li className='request-list-header-cont'>
        <div className='request-list-card card3'>
          <h3 className='list-header-head'>Student TK.NO</h3>
        </div>
        <div className='request-list-card card2'>
          <h3 className='list-header-head'>Semester</h3>
        </div>
        <div className='request-list-card card1'>
          <h3 className='list-header-head'>Reason</h3>
        </div>
        <div className='request-list-card card4'>
          <h3 className='list-header-head'>Payment Status</h3>
        </div>
        <div className='request-list-card card4'>
          <h3 className='list-header-head'>Requested Date</h3>
        </div>
        <div className='request-list-card card4'>
          <h3 className='list-header-head'>Request Status</h3>
        </div>
        <div className='request-list-card card4'>
          <h3 className='list-header-head'>Evaluator</h3>
        </div>
        <div className='request-list-card card2'>
          <h3 className='list-header-head'>Action</h3>
        </div>
      </li>
    </>
  )
}

export default RequestListHeader