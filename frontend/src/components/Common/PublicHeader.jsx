import React from 'react'

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import '../../styles/styles.css'
import logo from '../../assets/logo.png'

const PublicHeader = () => {
  return (
    <header className='header-cont'>
      <nav className='header-menu'>
          <div>
            <img src={ logo } alt='Logo' className='header-logo' />
          </div>
        <ul className='header-links'>
          <li className='header-link'>
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition = {{ delay: 0.3 }}
            >
              <button className='button button-danger'>
                <Link to='/register' className='link'>Register</Link>
              </button>
            </motion.div>
          </li>
          <li className='header-link'>
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition = {{ delay: 0.3 }}
            >
              <button className='button button-success'>
                <Link to='/login' className='link'>Login</Link>
              </button>
            </motion.div>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default PublicHeader
