// importing packages
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Lock, CheckCheck, X, Loader } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

// importing modules
import '../../styles/styles.css'
import { useAuth } from '../hooks/useAuth.js'

// importing components
import OneInput from '../Common/OneInput.jsx'
import PasswordInput from '../Common/PasswordInput.jsx'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email,  setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const { isLoading, register } = useAuth()
  const navigate = useNavigate()

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

  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      await register(username, email, password)
      navigate('/')
      toast.success('Account created successfully')
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
          <h1 className="auth-form-heading">Create Account</h1>
          <form onSubmit={ handleRegister } method="post">
            <OneInput
              icon = { User }
              type = 'text'
              placeholder = 'Username'
              value = { username }
              onChange={(e) => setUsername(e.target.value)}
            />
            <OneInput
              icon = { Mail }
              type = 'email'
              placeholder = 'Email Address'
              value = { email }
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordInput
              icon = { Lock }
              type = 'password'
              placeholder = 'Password'
              value={ password }
              onChange={ (e) => setPassword(e.target.value) }
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
                : 'Register'
              }
            </motion.button>
            <div className='redirect-card'>
              <Link to='/' className='auth-redirect-link'>- Home</Link>
              <p className='auth-back-link'>
                Already have an account?{"   "}
                <Link to='/login' className='auth-redirect-link'>Login</Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  )
}

export default Register