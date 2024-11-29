import React, { useState } from 'react'
import toast from 'react-hot-toast'

import { Menu } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

import '../../styles/styles.css'
import logo from '../../assets/logo.png'
import { useAuth } from '../hooks/useAuth.js'

const activeLink = ({ isActive }) => (isActive ? 'active' : '')

const EvaluatorHeader = () => {
  const { logout } = useAuth()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    logout()
    toast.success('User logged out successfully')
    console.log('User logged out successfully')
  }
  const toggleMenu = () => {
    setOpen(!open)
  }

  return (
    <header className='header-cont'>
      <nav className='header-menu'>
        <div>
          <img src={ logo } alt='Logo' className='header-logo' />
        </div>
        <ul className={ open ? `admin-nav-menu active` :  `admin-nav-menu` }>
          <li className='admin-nav-link'>
            <NavLink to='/evaluator/profile' className={`link ${ activeLink }`}>Profile</NavLink>
          </li>
          <li className='admin-nav-link'>
            <NavLink to='/evaluator/view-assigned-request' className={`link ${ activeLink }`}>View Assigned Requests</NavLink>
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
        <div className='menu-icon' onClick={ toggleMenu }>
          <Menu color='#fff' size={ 30 } />
        </div>
      </nav>
    </header>
  )
}

export default EvaluatorHeader
