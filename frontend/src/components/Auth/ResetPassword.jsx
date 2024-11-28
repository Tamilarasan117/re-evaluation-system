import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Loader, ArrowLeft, CheckCheck, X } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

import toast from 'react-hot-toast'

import '../../styles/styles.css'
import { useAuth } from '../hooks/useAuth.js'

import PasswordInput from '../Common/PasswordInput.jsx'

const ResetPassword = () => {

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { error, isLoading, message, resetPassword } = useAuth()

  const [upperCase, setUpperCase] = useState(false)
  const [lowerCase, setLowerCase] = useState(false)
  const [number, setNumber] = useState(false)
  const [specialChar, setSpecialChar] = useState(false)
  const [passwordLength, setPasswordLength] = useState(false)

  const correct = <CheckCheck size={ 20 } color='green' />
  const wrong = <X size={ 20 } color='red' />

  const switchIcon = (con) => con ? correct : wrong

  useEffect( () => {
    setUpperCase( /[A-Z]/.test(password))
    setLowerCase( /[a-z]/.test(password))
    setNumber( /[0-9]/.test(password))
    setSpecialChar( /[!@#$%^&*]/.test(password))
    setPasswordLength(password.length >= 6)
  }, [password])

  const { token } = useParams()
  const navigate = useNavigate()

  const onHandleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error('Password do not match')
      return
    }

    try {
      await resetPassword(token, password)
      toast.success('Password reseated successfully')
      setTimeout(() => {
        navigate('/login')
      }, 1000)
    } catch (error) {
      toast.error('Error resetting password')
      console.log(error)
    }
  }

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition = {{ duration: 0.6 }}
      >
        <div className='auth-form-container'>
          <h1 className="auth-form-heading">Reset Password</h1>
          { error && <p className='alert'>{ error }</p> }
          { message && <p className='success'>{ message }</p> }
          <form onSubmit={ onHandleSubmit } method="post">
            <PasswordInput
              icon = { Lock }
              type = 'password'
              placeholder = 'New Password'
              value={ password }
              onChange={ (e) => setPassword(e.target.value) }
            />
            <PasswordInput
              icon = { Lock }
              type = 'password'
              placeholder = 'Confirm Password'
              value={ confirmPassword }
              onChange={ (e) => setConfirmPassword(e.target.value) }
            />
            { error && <p className='alert'>{ error }</p> }
            {/* password strength */}
            <div className='auth-pass-str-card'>
              <ul className='auth-form-list'>
                <li>{ switchIcon(upperCase)} Uppercase letter (A-Z)</li>
                <li>{ switchIcon(lowerCase) } Lowercase letter (a-z)</li>
                <li>{ switchIcon(number) } Number (0-9)</li>
                <li>{ switchIcon(specialChar) } Special character (!@#$%^&*)</li>
                <li>{ switchIcon(passwordLength) } Minimum 6 characters</li>
              </ul>
            </div>
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
                : 'Set new Password'
              }
            </motion.button>
            <div className='redirect-card'>
              <Link to='/' className='auth-redirect-link'>- Home</Link>
              <Link to={'/login'} className='auth-fot-pass-link'>
                <ArrowLeft size={ 20 } /> {' '} Back to Login
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  )
}

export default ResetPassword