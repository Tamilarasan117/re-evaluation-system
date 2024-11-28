import React from 'react'
import toast from 'react-hot-toast'

import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

import '../../styles/styles.css'
import logo from '../../assets/logo.png'
import { useAuth } from '../hooks/useAuth'

const activeLink = ({ isActive }) => (isActive ? 'active' : '')

const StudentHeader = () => {
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    toast.success('User logged out successfully')
    console.log('User logged out successfully')
  }

  return (
    <header className='header-cont'>
      <nav className='header-menu'>
          <div>
            <img src={ logo } alt='Logo' className='header-logo' />
          </div>
        <ul className='admin-nav-menu'>
          <li className='admin-nav-link'>
            <NavLink to='/student/profile' className={`link ${ activeLink }`}>Profile</NavLink>
          </li>
          <li className='admin-nav-link'>
            <NavLink to='/student/revaluation-request'  className={`link ${ activeLink }`}>Revaluation Request</NavLink>
          </li>
          <li className='admin-nav-link'>
            <NavLink to='/student/revaluation-request/payment'  className={`link ${ activeLink }`}>Payment</NavLink>
          </li>
          <li className='admin-nav-link'>
            <NavLink to='/student/revaluation-status'  className={`link ${ activeLink }`}>Revaluation Status</NavLink>
          </li>
          <li className='admin-nav-link'>
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition = {{ delay: 0.3 }}
              type='submit'
              className="auth-button logout-btn"
              onClick={ handleLogout }
            >
              Logout
            </motion.button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default StudentHeader
