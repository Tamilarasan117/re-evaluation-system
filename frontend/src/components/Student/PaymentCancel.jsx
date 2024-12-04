// importing packages
import React from 'react'
import { ArrowLeft, CircleX } from 'lucide-react'
import { Link } from 'react-router-dom'

// importing modules
import '../../styles/styles.css'

const PaymentCancel = () => {
  return (
    <div className='payment-success-cont'>
			<div className='payment-success-box '>
        <CircleX className='payment-cancel-icon' />
        <h1 className='payment-cancel-head'>Requested Cancelled!</h1>
				<p className='payment-success-text'>Your re-evaluation request cancelled. No charge have been made.</p>
				<Link
					to="/student/revaluation-request"
					className='payment-success-link'
				>
					<ArrowLeft size={ 18 } /> Return to request
				</Link>
			</div>
		</div>
  )
}

export default PaymentCancel
