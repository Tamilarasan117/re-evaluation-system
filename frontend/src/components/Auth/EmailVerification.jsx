import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import { Loader } from 'lucide-react'
import toast from 'react-hot-toast'

import '../../styles/styles.css'
import { useAuth } from '../hooks/useAuth.js'

const EmailVerification = () => {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef([])

  const navigate = useNavigate()
  const { error, isLoading, verifyEmail } = useAuth()

  const handleChange = (index, value) => {
    const newCode = [...code]
    // handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split('')
      for (let i=0; i<6; i++) {
        newCode[i] = pastedCode[i] || ''
      }
      setCode(newCode)
      // focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== '')
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5
      inputRefs.current[focusIndex].focus()
    } else {
      newCode[index] = value
      setCode(newCode)
      // move focus to the next input field if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus()
      }
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  useEffect(() => {
    if (code.every(digit => digit !== '')) {
      handleSubmit(new Event('submit'))
    }
  }, [code])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const verificationCode = code.join('')

    try {
      await verifyEmail(verificationCode)
      navigate('/login')
      toast.success('Email verified successfully')
      toast.success('Welcome email sent')
    } catch (error) {
      toast.error('Invalid verification code')
      console.log(error)
    }
  }

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition = {{ duration: 0.6 }}
      >
        <div className='auth-form-container'>
          <h1 className='auth-form-heading'>Verify Your Email</h1>
          <p className='auth-form-text'>Enter the 6-digit code sent to your email address.</p>
          <form onSubmit={ handleSubmit }>
            <div className='verify-box-card'>
              {
                code.map((digit, index) => (
                  <input
                    key={ index }
                    ref={(element) => (inputRefs.current[index] = element)}
                    type='text'
                    maxLength='6'
                    value={ digit }
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className='verify-code-box'
                  />
                ))
              }
            </div>
            { error && <p className='alert'>{ error }</p> }
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition = {{ delay: 0.3 }}
              type='submit'
              className="auth-button"
              disabled={ isLoading }
            >
              {
                isLoading ?
                  <Loader color='#fff' className='animate-spinner' size={ 25 } aria-label="Loading Spinner" />
                : 'Verify Email'
              }
            </motion.button>
          </form>
        </div>
      </motion.div>
    </>
  )
}

export default EmailVerification
