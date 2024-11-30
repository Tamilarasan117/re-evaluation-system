// importing packages
import React from 'react'


import '../../styles/styles.css'

// importing components
import PublicHeader from '../Common/PublicHeader.jsx'
import Footer from '../Common/Footer.jsx'

const PublicLayout = ({ children }) => {
  return (
    <div className='layout-cont'>
      <PublicHeader />
      <div className='index-container'>
        { children }
      </div>
      <Footer />
    </div>
  )
}

export default PublicLayout
