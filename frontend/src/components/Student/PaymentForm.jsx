import React, { useEffect, useState } from 'react'
import { CircleChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

import toast from 'react-hot-toast'

import '../../styles/styles.css'
import FiveInput from '../Common/FiveInput.jsx'
import pay from '../../assets/pay.jpg'
import cvcImg from '../../assets/cvc.png'
import RequestInfo from '../Evaluator/RequestInfo.jsx'

import { useStudent } from '../hooks/useStudent.js'
import { useNavigate } from 'react-router-dom'

const PaymentForm = () => {
  const [email, setEmail] = useState('')
  const [cardholder, setCardholder] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expireDate, setExpireDate] = useState('')
  const [cvc, setCvc] = useState('')
  
  const navigate = useNavigate()
  
  const { getRevaluationRequest, requestCart, requestPayment } = useStudent()

  const handleCardInputChange = (e) => {
    const value = e.target.value
    if (value.length <= 12 && !isNaN(value) && (!/^[a-z]/.test(value))) {
      setCardNumber(value)
    }
  }

  const handleCVCChange = (e) => {
    const value = e.target.value
    if (value.length <= 3 && !isNaN(value) && (!/^[a-z]/.test(value))) {
      setCvc(value)
    }
  }

  useEffect(() => {
    getRevaluationRequest()
  }, [getRevaluationRequest])

  const handleRequestPayment = async (e) => {
    e.preventDefault()
    try {
      if (!email || !cardholder || !cardNumber || !expireDate || !cvc) { 
        toast.error('Please fill in all required fields')
        return
      }

      await requestPayment({
        revaluationRequestId: requestCart.revaluationRequestId,
        paymentAmount: requestCart?.fees,
        paymentStatus: 'Paid',
        username: cardholder,
        email: email,
        cardNumber: cardNumber,
        expireDate: expireDate,
        cvc: cvc,
      })

      navigate('/student/revaluation-payment-success', { replace: true })

      toast.success('Payment successful')
      console.log('Payment successful')
    } catch (error) {
      toast.error('Payment failed: ')
      console.error(error)
    }
  }

  return (
    <div className='payment-cont'>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition = {{ duration: 0.6 }}
        className='request-cart'
      >
        <h1 className='request-cart-head'>Request Details</h1>
        <div className='request-cart-body'>
          <RequestInfo
            label='Name: '
            data={ requestCart?.studentName }
          />
          <RequestInfo
            label='Token No: '
            data={ requestCart?.studentTokenNo }
          />
          <RequestInfo
            label='Subject: '
            data={ requestCart?.subject }
          />
          <RequestInfo
            label='Reason: '
            data={ requestCart?.reason }
          />
          <RequestInfo
            label='Request Document: '
          />
          <img src={ requestCart?.document } className='request-cart-img' alt='request-document' />
        </div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition = {{ duration: 0.6 }}
        className='payment-card'
      >
        <div className='pay-head-card'>
          <h1 className='pay-head'>
            Pay with <CircleChevronRight size={ 20 } className='pay-arrow' /> link
          </h1>
        </div>
        <form onSubmit={ handleRequestPayment } className='pay-body-card'>
          <FiveInput
            label='Email:'
            type='email'
            name='email'
            placeholder={ 'enter email address' }
            value={ email }
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className='pro-three-in-box'>
            <label htmlFor='cardInformation' className='profile-label'>Card Information:</label>
            <div className='three-input-card'>
              <div className='in-box'>
                <div className='in-in-box'>
                  <input
                    type='text'
                    name='cardInformation'
                    className='pay-in-field'
                    placeholder='1234 1234 1234 1234'
                    value={ cardNumber }
                    onChange={ (e) => handleCardInputChange(e) }
                  />
                  <img src={ pay } className='pay-img' alt='pay-icon' />
                </div>
                <hr className='line' />
                <div className='in-in-box'>
                  <input
                    type='text'
                    placeholder='MM / YY'
                    name='exp'
                    className='pay-in-field'
                    value={ expireDate }
                    onChange={(e) => setExpireDate(e.target.value)}
                  />
                  <hr className='line-har' />
                  <div className='in-in-box'>
                    <input
                      type='text'
                      placeholder='CVC'
                      name='cvc'
                      className='pay-in-field'
                      value={ cvc }
                      onChange={ (e) => handleCVCChange(e) }
                    />
                    <img src={ cvcImg } className='cvc-img' alt='pay-icon' />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FiveInput
            label='Request Fees:'
            type='number'
            name='fees'
            placeholder={ 'enter request fees' }
            value={ requestCart?.fees }
          />
          <FiveInput
            label='Cardholder name:'
            type='text'
            name='name'
            placeholder={ 'Full name or card' }
            value={ cardholder }
            onChange={(e) => setCardholder(e.target.value)}
          />
          <div className='pay-secure-card'>
            <p className='pay-secure-text'>
              Securely pay with your card information and payment details.
            </p>
          </div>
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition = {{ delay: 0.3 }}
            type='submit'
            className="auth-button"
          >
              Pay Now
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default PaymentForm