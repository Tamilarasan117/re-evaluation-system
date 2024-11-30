// importing packages
import React from 'react'

// importing modules
import '../../styles/styles.css'

// importing components
import AdminHeader from '../Common/AdminHeader.jsx'
import Footer from '../Common/Footer.jsx'

const AdminLayout = ({ children }) => {
  return (
    <div className='admin-layout-cont'>
      <AdminHeader />
      <div className='admin-container'>
        { children }
      </div>
      <Footer />
    </div>
  )
}

export default AdminLayout
