import React from 'react'

import '../../styles/styles.css'

const OneInput = ({ icon: Icon, ...props }) => {
  return (
    <div className='auth-input-box'>
      <Icon className='auth-input-icon' />
      <input {...props} className='auth-input-field' />
    </div>
  )
}

export default OneInput
