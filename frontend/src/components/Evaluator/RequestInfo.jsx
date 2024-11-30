// importing packages
import React from 'react'

// importing modules
import '../../styles/styles.css'

const RequestInfo = (props) => {
  const completed = props.data === 'Completed' ? 'completed' : ''
  const progress = props.data === 'InProgress' ? 'process' : ''
  const pending = props.data === 'Pending' ? 'pending' : ''
  const approved = props.data === 'Approved' ? 'approved' : ''
  const rejected = props.data === 'Rejected' ? 'rejected' : ''

  return (
    <p className='revaluate-info-para'>
      <strong>{ props.label }</strong>
      <span className={`${ completed } ${ progress } ${ pending } ${ approved } ${ rejected }`}>{ props.data }</span>
    </p>
  )
}

export default RequestInfo