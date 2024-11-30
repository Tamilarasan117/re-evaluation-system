// importing packages
import React from 'react'

// importing modules
import '../../styles/styles.css'

const Textarea = ({ label, name, ...props }) => {
  return (
    <div className='pro-in-box'>
      <label htmlFor={ name } className='profile-label'>{ label }</label>
      <textarea { ...props } name={ name } className='profile-input-field big-field' />
    </div>
  )
}

export default Textarea
