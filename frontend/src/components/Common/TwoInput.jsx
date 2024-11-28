import React from 'react'

import '../../styles/styles.css'

const TwoInput = ({ label, name, ...props }) => {
  return (
    <div className='pro-in-box'>
      <label htmlFor={ name } className='profile-label'>{ label }</label>
      <input { ...props } name={ name } className='profile-input-field' />
    </div>
  )
}

export default TwoInput
