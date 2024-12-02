// importing packages
import React from 'react'

// importing modules
import '../../styles/styles.css'

// importing components
import StudentHeader from '../Header/StudentHeader.jsx'
import Footer from '../Common/Footer.jsx'

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
