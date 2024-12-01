// importing packages
import React, { useState } from 'react'
import { Loader, Minus, Plus } from 'lucide-react'
import { motion } from 'framer-motion'

// importing modules
import '../../styles/styles.css'
import { useStudent } from '../hooks/useStudent.js'

// importing components
import ContactInput from '../Common/ContactInput.jsx'
import Textarea from '../Common/Textarea.jsx'

// how work data
const howWork = [
  {
    question: "Log in to Your Account",
    answer:
      "Access your personalized dashboard where you can view and manage all your re-evaluation requests.",
  },
  {
    question: "Submit a Request",
    answer:
      "Choose the subject you wish to be re-evaluated, provide your reason, upload supporting documents (if required), and pay the re-evaluation fee securely.",
  },
  {
    question: "Track Your Request",
    answer:
      "Stay updated with the progress of your request. From submission to evaluator assignment and final result updates, you’ll be notified at every step.",
  },
  {
    question: "Receive Updated Results",
    answer:
      "Once your request is processed, view the updated results directly on your dashboard.",
  },
]

// FAQ data
const faqs = [
  {
    question: "Who can use this platform?",
    answer:
      "Any enrolled student of the institution with valid credentials can access the platform.",
  },
  {
    question: "What is the re-evaluation fee?",
    answer:
      "The fee varies based on the subject and department. The exact amount will be displayed during the request submission process.",
  },
  {
    question: "How long does the re-evaluation process take?",
    answer:
      "The timeline depends on the number of requests in progress and evaluator availability. You can track your request in real-time through your dashboard.",
  },
  {
    question: "Can I cancel a re-evaluation request?",
    answer:
      "Yes, you can cancel a request before it is assigned to an evaluator. However, the re-evaluation fee may not be refundable.",
  },
  {
    question: "Will my scores always increase after re-evaluation?",
    answer:
      "Not necessarily. The re-evaluation process ensures accuracy, which means your scores can increase, decrease, or remain unchanged.",
  },
  {
    question: "How will I be notified about my request status?",
    answer:
      "You will receive email notifications and updates on your dashboard at every stage of the re-evaluation process.",
  },
]

const StudentAbout = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const { isLoading } = useStudent()

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="about-container">
      <h1 className='about-head'>About Section for Students</h1>
      <div className='about-cont'>
        <h1 className='about-head'>Welcome to the Online Re-evaluation System</h1>
        <p className='about-desc1'>
          Welcome to our re-evaluation system. We strive to make academic processes 
          more transparent and efficient for all stakeholders. 
          As a student, your academic success is our priority. 
          Our platform is designed to simplify and streamline the 
          re-evaluation process, ensuring fairness, transparency, 
          and convenience for every student.
        </p>
      </div>
      <div className='about-cont'>
        <h1 className='about-head'>Why choose us?</h1>
        <p className='about-desc1'>
          We understand that sometimes your exam results may not 
          reflect your efforts. Whether it's a calculation error, 
          an overlooked answer, or a need for a second opinion, 
          our system allows you to take control of your academic 
          journey by providing a hassle-free re-evaluation process.
        </p>
      </div>
      <div className='about-cont'>
        <h1 className='about-head'>How Does It Work for Students?</h1>
        <ol className='about-order-list-cont'>
          { howWork.map((work, index) => (
            <div key={ index }>
              <li>{ work.question }</li>
              <ul className='about-unorder-list-cont'>
                <li>{ work.answer }</li>
              </ul>
            </div>
          ))}
        </ol>
      </div>
      <div className='about-cont'>
        <h1 className='about-head'>Frequently Asked Questions</h1>
        {faqs.map((faq, index) => (
          <div
            key={ index }
            className={`faq-item ${ openIndex === index ? 'open' : '' }`}
          >
            <div
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="faq-icon">
                {openIndex === index ? <Minus size={ 20 } /> : <Plus size={ 25 } /> }
              </span>
            </div>
            {openIndex === index && <p className="faq-answer">{faq.answer}</p>}
          </div>
        ))}
      </div>
      <div className='about-cont2'>
        <div className='contact-cont'>
          <h1 className="about-head">Contact Us</h1>
          <p className="about-desc1">
            Have questions or need help? We're here to assist you. Feel free to reach out to us 
            through the form below or via the provided contact information.
          </p>
          <p className='about-desc1'>
            If you encounter issues or need assistance with the platform, 
            our dedicated support team is here to help:
          </p>
          <div className="contact-info">
            <h1>Contact Information</h1>
            <p><strong>Email:</strong> support@reevaluation-system.com</p>
            <p><strong>Phone:</strong> +1 (123) 456-7890</p>
            <p><strong>Address:</strong> Electronic City Phase - 2, Bangalore, Karnataka, India</p>
            <p><strong>Working Hours:</strong> Monday to Friday, 9:00 AM - 5:00 PM</p>
          </div>
        </div>
        <div className='contact-form-cont'>
          <h1 className="auth-form-heading">Contact</h1>
          <form onSubmit={ handleContactSubmit } method="post">
            <ContactInput
              type = 'text'
              placeholder = 'Enter your name'
            />
            <ContactInput
              type = 'email'
              placeholder = 'Enter email address'
            />
            <Textarea
              label='Reason:'
              type='text'
              name='reason'
              placeholder='Enter your reason'
              row={ 5 }
            />
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition = {{ delay: 0.3 }}
              type='submit'
              className="auth-button"
              disabled={ isLoading }
            >
              {
                isLoading ?
                  <Loader color='#fff' className='animate-spinner' size={ 25 } aria-label="Loading Spinner" />
                  : 'Submit'
              }
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentAbout
