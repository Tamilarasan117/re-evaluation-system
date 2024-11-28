import React from 'react'

import StudentHeader from '../Common/StudentHeader.jsx'
import Footer from '../Common/Footer.jsx';
import '../../styles/styles.css'

const StudentLayout = ({ children }) => {
  return (
    <div className='admin-layout-cont'>
      <StudentHeader />
      <div className='admin-container'>
        { children }
      </div>
      <Footer />
    </div>
  )
}

export default StudentLayout
