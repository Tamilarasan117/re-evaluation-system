import React from 'react'

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
