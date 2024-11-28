import React from 'react'

import PublicHeader from '../Common/PublicHeader.jsx'
import Footer from '../Common/Footer.jsx';
import '../../styles/styles.css'

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
