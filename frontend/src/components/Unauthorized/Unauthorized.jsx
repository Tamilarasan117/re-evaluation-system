// importing packages
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// importing modules
import '../../styles/styles.css'
import unauthorized from '../../assets/unauthorized.jpg'

const Unauthorized = () => {
  return (
    <div className='unauthorized-cont'>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition = {{ duration: 0.6 }}
      >
        <img src={ unauthorized } alt='Unauthorized' className='unauthorized-img' />
      </motion.div>
      <div className='unauthorized-content-card'>
        <p className='unauthorized-error'>
          401 - Unauthorized: Access is denied due to invalid credentials.
        </p>
        <p className='unauthorized-text'>
          Sorry, you do not have permission to view this directory or page
          using the credentials that you supplied.
        </p>
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition = {{ delay: 0.3 }}y
          type='submit'
          className='not-found-btn-card'
        >
          <Link to='/' className='not-found-link'>Go to home</Link>
        </motion.button>
      </div>
    </div>
  )
}

export default Unauthorized
