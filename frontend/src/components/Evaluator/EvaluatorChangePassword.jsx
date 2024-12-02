// importing packages
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Loader, CheckCheck, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

// importing modules
import '../../styles/styles.css'
import { useEvaluator } from '../hooks/useEvaluator.js'
import { useAuth } from '../hooks/useAuth.js'

// importing components
import PasswordInput from '../Common/PasswordInput.jsx'

const EvaluatorChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { isLoading, changePassword } = useEvaluator()
  const { logout } = useAuth()

  const [upperCase, setUpperCase] = useState(false)
  const [lowerCase, setLowerCase] = useState(false)
  const [number, setNumber] = useState(false)
  const [specialChar, setSpecialChar] = useState(false)
  const [passwordLength, setPasswordLength] = useState(false)

  const correct = <CheckCheck size={ 20 } color='green' />
  const wrong = <X size={ 20 } color='red' />

  const switchIcon = (con) => con ? correct : wrong

  useEffect( () => {
    setUpperCase( /[A-Z]/.test(newPassword))
    setLowerCase( /[a-z]/.test(newPassword))
    setNumber( /[0-9]/.test(newPassword))
    setSpecialChar( /[!@#$%^&*]/.test(newPassword))
    setPasswordLength(newPassword.length >= 6)
  }, [newPassword])

  const navigate = useNavigate()

  const onHandleSubmit = async (e) => {
    e.preventDefault()

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error('Please provide required fields')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    if (!passwordLength) {
      toast.error('Password must be at least 6 characters long')
      return
    }
    if (!upperCase) {
      toast.error('Password must have at least one uppercase letter')
      return
    }
    if (!lowerCase) {
      toast.error('Password must have at least one lowercase letter')
      return
    }
    if (!number) {
      toast.error('Password must have at least one number')
      return
    }
    if (!specialChar) {
      toast.error('Password must have at least one special character')
      return
    }
    
    try {
      await changePassword(oldPassword, newPassword, confirmPassword)
      toast.success('Password changed successfully')
      logout()
      setTimeout(() => {
        navigate('/login')
      }, 1000)
    } catch (error) {
      toast.error(error.response.data.message)
      console.log(error.response.data.message)
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
          <h1 className="auth-form-heading">Change Password</h1>
          <form onSubmit={ onHandleSubmit } method="post">
            <PasswordInput
              icon = { Lock }
              type = 'password'
              placeholder = 'Old Password'
              value={ oldPassword }
              onChange={ (e) => setOldPassword(e.target.value) }
            />
            <PasswordInput
              icon = { Lock }
              type = 'password'
              placeholder = 'New Password'
              value={ newPassword }
              onChange={ (e) => setNewPassword(e.target.value) }
            />
            <PasswordInput
              icon = { Lock }
              type = 'password'
              placeholder = 'Confirm Password'
              value={ confirmPassword }
              onChange={ (e) => setConfirmPassword(e.target.value) }
            />
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
                : 'Change Password'
              }
            </motion.button>
          </form>
        </div>
      </motion.div>
    </>
  )
}

export default EvaluatorChangePassword
