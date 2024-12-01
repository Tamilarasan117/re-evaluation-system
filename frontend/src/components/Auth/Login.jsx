// importing packages
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, Loader } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

// importing modules
import '../../styles/styles.css'
import { useAuth } from '../hooks/useAuth.js'

// importing components
import OneInput from '../Common/OneInput.jsx'
import PasswordInput from '../Common/PasswordInput.jsx'

const Login = () => {
  const [email,  setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { isLoading, login, user } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)

      if (user?.role === 'admin') {
        navigate('/admin/profile')
      }
      
      if (user?.role === 'evaluator') {
        navigate('/evaluator/profile')
      }

      if (user?.role === 'student') {
        navigate('/student/about')
      }

      toast.success('Logged in successfully!')
      console.log('User logged in successfully')
    } catch (error) {
      toast.error(error.response.data.message)
      console.error(error.response.data.message)
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
          <h1 className="auth-form-heading">Login</h1>
          <form onSubmit={ handleLogin } method="post">
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
            <div className='redirect-card'>
              <Link to='#' className='auth-redirect-link'>Forgot Password?</Link>
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
                : 'Login'
              }
            </motion.button>
            <div className='redirect-card'>
              <Link to='/' className='auth-redirect-link'>- Home</Link>
              <p className='auth-back-link'>
                Don't have an account?{"  "}
                <Link to='/register' className='auth-redirect-link'>Register</Link>
              </p>
            </div>
            </form>
        </div>
        </motion.div>
    </>
  )
}

export default Login