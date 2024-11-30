// importing packages
import React from 'react'

// importing modules
import '../../styles/styles.css'

const FiveInput = ({ label, name, ...props }) => {
  return (
    <div className='pro-three-in-box'>
      <label htmlFor={ name } className='profile-label'>{ label }</label>
      <input { ...props } name={ name } className='pay-input-field' />
    </div>
  )
}

export default FiveInput
