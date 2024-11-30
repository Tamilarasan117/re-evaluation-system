// importing packages
import React, { useState } from 'react'
import { Eye, EyeClosed } from 'lucide-react'

// importing modules
import '../../styles/styles.css'

const PasswordInput = ({ icon: Icon, ...props }) => {
  
  const { type, value, placeholder, name, onChange } = props

  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  
  return (
    <div className='auth-input-box'>
      <Icon className='auth-input-icon' />
      <input
        className='auth-input-field'
        type={ showPassword ? 'text' : type }
        placeholder={ placeholder }
        name={ name }
        value={ value }
        onChange={ onChange }
      />
      <div className='auth-input-icon' onClick={ togglePasswordVisibility }>
      { 
        showPassword ?
          <Eye size={ 25 } /> 
        :
          <EyeClosed size={ 25 } />
      }
      </div>
    </div>
  )
}

export default PasswordInput
