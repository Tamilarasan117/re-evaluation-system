import React from 'react'

import EvaluatorHeader from '../Common/EvaluatorHeader.jsx'
import Footer from '../Common/Footer.jsx';
import '../../styles/styles.css'

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
