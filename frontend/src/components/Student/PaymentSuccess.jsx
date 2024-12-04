// importing packages
import React, { useEffect } from 'react'
import { ArrowLeft, CheckCircle, HandHeart } from 'lucide-react'
import { Link } from 'react-router-dom'
import Confetti from "react-confetti"

// importing modules
import '../../styles/styles.css'
import { useStudent } from './../hooks/useStudent'
import toast from 'react-hot-toast'

const PaymentSuccess = () => {
  const { getRevaluationRequest, paymentSuccess, requestCart } = useStudent()

	const handlePaymentSuccess = async () => {
		try {
			const requestId = requestCart?.revaluationRequestId
			await paymentSuccess(requestId)
			toast.success('Payment successful')
			console.log('Payment success')
		} catch (error) {
			toast.error(error.response.data.message)
			console.error(error.response.data.message)
		}
	}

	useEffect(() => {
		getRevaluationRequest()
	}, [getRevaluationRequest])
  return (
    <div className='payment-success-cont'>
			<Confetti
				width={ window.innerWidth }
				height={ window.innerHeight }
				gravity={ 0.1 }
				style={{ zIndex: 99 }}
				numberOfPieces={ 1000 }
				recycle={ false }
			/>
			<div className='payment-success-box '>
        <CheckCircle className='payment-success-icon' />
        <h1 className='payment-success-head'>Requested Successful!</h1>
				<p className='payment-success-text'>Thank you for your request.</p>
				<p className='payment-success-text'>Check your email for request details and updates.</p>
				<button className='payment-success-heart'>
					<HandHeart size={ 20 } />
					Thanks for trusting us!
				</button>
				<Link
					to="/student/revaluation-request"
					onClick={ handlePaymentSuccess }
					className='payment-success-link'
				>
					<ArrowLeft size={ 18 } /> Go Back
				</Link>
			</div>
		</div>
  )
}

export default PaymentSuccess
