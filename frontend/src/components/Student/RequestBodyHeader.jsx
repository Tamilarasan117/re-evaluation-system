import React from 'react'

const RequestBodyHeader = () => {
  return (
    <>
      <li className='request-body-header-cont'>
        <div className='request-body-header-card1'>
          <h3 className='list-header-head'>Subject</h3>
        </div>
        <div className='request-body-header-card3'>
          <h3 className='list-header-head'>Original Mark</h3>
        </div>
        <div className='request-body-header-card2'>
          <h3 className='list-header-head'>Revaluated Marks</h3>
        </div>
        <div className='request-body-header-card2'>
          <h3 className='list-header-head'>Status</h3>
        </div>
        <div className='request-body-header-card1'>
          <h3 className='list-header-head'>Comments</h3>
        </div>
        <div className='request-body-header-card2'>
          <h3 className='list-header-head'>Request Date</h3>
        </div>
        <div className='request-body-header-card3'>
          <h3 className='list-header-head'>Action</h3>
        </div>
      </li>
    </>
  )
}

export default RequestBodyHeader
