// importing packages
import React from 'react'

// importing modules
import '../../styles/styles.css'

const ContactInput = (props) => {
  return (
    <div className='pro-three-in-box'>
      <input { ...props } className='pay-input-field' />
    </div>
  )
}

export default ContactInput
