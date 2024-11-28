import React from 'react'

import AdminHeader from '../Common/AdminHeader.jsx'
import Footer from '../Common/Footer.jsx';
import '../../styles/styles.css'

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
