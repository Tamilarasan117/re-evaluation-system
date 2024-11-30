// importing packages
import React from 'react'

// importing modules
import '../../styles/styles.css'

const ThreeInput = ({ label, name, ...props }) => {
  return (
    <div className='pro-in-box'>
      <label htmlFor={ name } className='profile-label'>{ label }</label>
      <input { ...props } name={ name } className='profile-input-field' />
    </div>
  )
}

export default ThreeInput
