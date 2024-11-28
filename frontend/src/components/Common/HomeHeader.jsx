import React from 'react'
import toast from 'react-hot-toast'

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import '../../styles/styles.css'
import logo from '../../assets/logo.png'
import { useAuth } from '../hooks/useAuth.js'

const HomeHeader = () => {
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    toast.success('User logged out successfully')
    console.log('User logged out successfully')
  }

  return (
    <header className='home-header-cont'>
      <nav className='home-header-menu'>
        <img src={ logo } alt='Logo' className='header-logo' />
        <ul className='home-nav-menu'>
          <li className='home-nav-link'>
            <Link to='/admin/profile' className='home-nav-links'>Admin Dashboard</Link>
          </li>
          <li className='home-nav-link'>
            <Link to='/student/profile' className='home-nav-links'>Student Dashboard</Link>
          </li>
          <li className='home-nav-link'>
            <Link to='/evaluator/profile' className='home-nav-links'>Evaluator Dashboard</Link>
          </li>
          <li className='home-nav-link'>
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition = {{ delay: 0.3 }}
              type='submit'
              className="home-header-btn"
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

export default HomeHeader
