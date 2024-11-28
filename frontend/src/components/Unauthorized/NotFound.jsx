import React from 'react'

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import notFound from '../../assets/404.jpg'

const NotFound = () => {
  return (
    <div className='not-found-cont'>
      <h1 className='not-found-head'>Opps! page not found</h1>
      <img src={ notFound } className='not-found-img' alt='Page not found' />
      <p className='not-found-para'>Sorry, we cannot seem to find the page you are looking for.</p>
      <motion.button 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition = {{ delay: 0.3 }}
        type='submit'
        className='not-found-btn-card'
      >
        <Link to='/home' className='not-found-link'>Go to home</Link>
      </motion.button>
    </div>
  )
}

export default NotFound