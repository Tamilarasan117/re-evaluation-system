// importing packages
import React from 'react'
import { Trash2 } from 'lucide-react'

// importing modules
import '../../styles/styles.css'

const RequestList = (props) => {
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
    <li className='request-status-list-cont'>
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

export default RequestList
