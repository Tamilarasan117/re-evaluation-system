import React from 'react'

const RequestInfo = (props) => {
  return (
    <p className='revaluate-info-para'>
      <strong>{ props.label }</strong>
      { props.data }
    </p>
  )
}

export default RequestInfo