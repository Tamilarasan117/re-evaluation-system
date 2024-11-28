import React from 'react'

import '../../styles/styles.css'
import pay from '../../assets/pay.jpg'
import cvc from '../../assets/cvc.png'

const FourInput = ({ label, name, name2, placeholder2, type2, type, name3, placeholder3, ...props }) => {
  return (
    <div className='pro-three-in-box'>
      <label htmlFor={ name } className='profile-label'>{ label }</label>
      <div className='three-input-card'>
        <div className='in-box'>
          <div className='in-in-box'>
            <input { ...props } type={ type } name={ name } className='pay-in-field' />
            <img src={ pay } className='pay-img' alt='pay-icon' />
          </div>
          <hr className='line' />
          <div className='in-in-box'>
            <input
              type={ type2 }
              placeholder={ placeholder2 }
              name={ name2 }
              className='pay-in-field'
            />
            <hr className='line-har' />
            <div className='in-in-box'>
              <input
                type={ type }
                placeholder={ placeholder3 }
                name={ name3 }
                className='pay-in-field'
              />
              <img src={ cvc } className='cvc-img' alt='pay-icon' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FourInput
