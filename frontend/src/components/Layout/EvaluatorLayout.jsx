// importing packages
import React from 'react'

// importing modules
import '../../styles/styles.css'

// importing components
import EvaluatorHeader from '../Common/EvaluatorHeader.jsx'
import Footer from '../Common/Footer.jsx'

const EvaluatorLayout = ({ children }) => {
  return (
    <div className='admin-layout-cont'>
      <EvaluatorHeader />
      <div className='admin-container'>
        { children }
      </div>
      <Footer />
    </div>
  )
}

export default EvaluatorLayout
