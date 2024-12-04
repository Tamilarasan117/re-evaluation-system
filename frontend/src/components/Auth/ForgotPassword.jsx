// importing packages
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Mail, Loader } from 'lucide-react'
import toast from 'react-hot-toast'

// importing modules
import '../../styles/styles.css'
import { useAuth } from '../hooks/useAuth.js'

// importing components
import OneInput from '../Common/OneInput.jsx'

const ForgotPassword = () => {

  const [email, setEmail] = useState('')
  const [isSubmitted, setSubmitted] = useState(false)

  const { isLoading, forgotPassword } = useAuth()

  const onHandleSubmit = async (e) => {
    e.preventDefault()

    try {
      await forgotPassword(email)
      setSubmitted(true)
      toast.success('Check your email for password reset instructions.')
    } catch (error) {
      toast.error('Failed to send password reset email')
      console.error(error)
    }
  } 

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition = {{ duration: 0.6 }}
      >
        <div className='auth-form-container'>
          <h1 className='auth-form-heading'>Forgot Password</h1>
          {
            !isSubmitted ? (
              <form onSubmit={ onHandleSubmit }>
                <p className='auth-form-text'>
                  Enter your email address and we'll send you to <br /> reset your password.
                </p>
                <OneInput
                  icon={ Mail }
                  type='email'
                  placeholder='Email Address'
                  value={ email }
                  onChange={ (e) => setEmail(e.target.value) }
                  required
                />
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
                    : 'Send reset link'
                  }
                </motion.button>
              </form>
            ) : (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className='icon-cont'
                >
                  <Mail className='icon-style' />
                </motion.div>
                <p className='auth-form-text'>
                  If an account exists for { email }, <br />
                  you'll receive a password reset link shortly.
                </p>
              </>
            )
          }
          <div className='redirect-card'>
            <Link to='/' className='auth-redirect-link'>Home</Link>
            <Link to={'/login'} className='auth-redirect-link'>
              <ArrowLeft className='link-arrow' />
              Back to Login
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default ForgotPassword