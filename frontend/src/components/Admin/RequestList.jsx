// importing packages
import React from 'react'
import { Trash2 } from 'lucide-react'

// importing modules
import '../../styles/styles.css'

// importing components
import SelectOption from '../Common/SelectOption.jsx'

const RequestList = (props) => {
  const {
    evaluatorList,
    handleUpdateRequestStatus,
    handleAssignEvaluator,
    handleDeleteRequest,
    requestList
  } = props

  const dateFormat = (date) => {
    const newDate = new Date(date)
    const year = newDate.getFullYear()
    const month = newDate.getMonth() + 1
    const day = newDate.getDate()
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
  }

  const handleChangeStatus = (requestId, requestStatus) => {
    handleUpdateRequestStatus(requestId, requestStatus)
  }

  const handleAssignEvaluators = (requestId, evaluatorName) => {
    handleAssignEvaluator(requestId, evaluatorName)
  }

  const handleDelete = () => {
    handleDeleteRequest(requestList._id)
  }

  return (
    <>
      <li className='request-list-header-cont'>
        <div className='request-list-card card3'>
          <p className='request-list-msg'>{ requestList.studentTokenNo }</p>
        </div>
        <div className='request-list-card card2'>
          <p className='request-list-msg'>{ requestList.semester }</p>
        </div>
        <div className='request-list-card card1'>
          <p className='request-list-msg'>{ requestList.subject }</p>
        </div>
        <div className='request-list-card card2'>
          <p className='request-list-msg'>{ requestList.course }</p>
        </div>
        <div className='request-list-card card4'>
          <p className='request-list-msg'>{ dateFormat(requestList.createdAt) }</p>
        </div>
        <div className='request-list-card card2'>
          <p className='request-list-msg'>{ requestList.paymentStatus }</p>
        </div>
        <div className='request-list-card card4'>
          <select
            className='list-drop-down'
            value={ requestList.status }
            onChange={ (e) => handleChangeStatus(requestList._id, e.target.value) }
          >
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value='Pending'>Pending</option>
            <option value='InProgress'>InProgress</option>
            <option value='Completed'>Completed</option>
          </select>
        </div>
        <div className='request-list-card card4'>
          <select
            className='list-drop-down'
            
            onChange={ (e) => handleAssignEvaluators( requestList._id, e.target.value ) }
          >
            <option className=''>-- Assign --</option>
            {
              evaluatorList ? evaluatorList.map((each, index) => {
                return (
                  <SelectOption
                    key={ index }
                    evaluator={ each }
                  />
                )
              }) : ''
            }
          </select>
        </div>
        <div className='request-list-card card2'>
        <button onClick={ handleDelete } className='list-delete-btn'> <Trash2 color='#333' /> </button>
        </div>
      </li>
    </>
  )
}

export default RequestList