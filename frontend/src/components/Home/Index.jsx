import React from 'react'

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import '../../styles/styles.css'
import loginImg from '../../assets/login.svg'

const Index = () => {
  return (
    <section className='index-card'>
      <div className='index-cont-card'>
        <h1 className='index-head'>Welcome to the Online Re-evaluation System</h1>
        <p className='index-desc'>Your one-stop solution for re-evaluation requests, payments, and updates!</p>
        <p className='index-desc'>Submit re-evaluation requests with ease and track them in real-time!</p>
        <ul className='index-desc-list'>
          <li>* Quick and easy re-evaluation submissions</li>
          <li>* Secure payment gateway for processing fees</li>
          <li>* Email notifications for status updates</li>
          <li>* Admin and evaluator portals for managing requests</li>
        </ul>
        <div className='index-links'>
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition = {{ delay: 0.3 }}
          >
            <button className='button button-danger'>
              <Link to='/register' className='link'>Register</Link>
            </button>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition = {{ delay: 0.3 }}
          >
            <button className='button button-success'>
              <Link to='/login' className='link'>Login</Link>
            </button>
          </motion.div>
        </div>
      </div>
      <div className='hero-image-cont'>
        <img src={ loginImg } alt='Authentication' className='auth-img' />
      </div>
    </section>
  )
}

export default Index
