import React, { useState } from 'react'


import { Menu } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import '../../styles/styles.css'
import logo from '../../assets/logo.png'

const PublicHeader = () => {
  const [open, setOpen] = useState(false)

  const toggleMenu = () => {
    setOpen(!open)
  }


  return (
    <header className='header-cont'>
      <nav className='header-menu'>
        <div>
          <img src={ logo } alt='Logo' className='header-logo' />
        </div>
        <ul className={ open ? `header-links actives` :  `header-links` }>
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
        <div className='menu-icon' onClick={ toggleMenu }>
          <Menu color='#fff' size={ 30 } />
        </div>
      </nav>
    </header>
  )
}

export default PublicHeader
