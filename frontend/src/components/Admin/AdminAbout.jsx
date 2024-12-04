// importing packages
import React from 'react'
import { Loader } from 'lucide-react'
import { motion } from 'framer-motion'

// importing modules
import '../../styles/styles.css'
import { useStudent } from '../hooks/useStudent.js'

// importing components
import ContactInput from '../Common/ContactInput.jsx'
import Textarea from '../Common/Textarea.jsx'

// how work data
const howwork = [
  {
    topic: "Log in to Your Admin Account",
    data:
      "Access the admin dashboard securely using your credentials.",
  },
  {
    topic: "View and Validate Requests",
    data:
      "Use the request management module to view all submissions and their details.",
  },
  {
    topic: "Assign Evaluators",
    data:
      "Select evaluators for specific requests with a few clicks.",
  },
  {
    topic: "Monitor Progress",
    data:
      "Track the status of each request and ensure deadlines are met.",
  },
  {
    topic: "Manage Notifications",
    data:
      "Ensure students and evaluators receive timely updates throughout the process.",
  },
]

const AdminAbout = () => {
  const { isLoading } = useStudent()

  const handleContactSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="about-container">
      <h1 className='about-head'>About Section for Admin</h1>
      <div className='about-cont'>
        <h1 className='about-head'>Welcome to the Online Re-Evaluation System Administrator</h1>
        <p className='about-desc1'>
          The <strong>Online Re-evaluation System</strong> empowers 
          administrators to efficiently manage, monitor, and streamline the academic 
          re-evaluation process. Designed with precision and ease of use, 
          the admin dashboard is the heart of the system, offering tools 
          to handle requests, payments, evaluator assignments, and more.
        </p>
      </div>
      <div className='about-cont'>
        <h1 className='about-head'>Why This System is Important for Admins?</h1>
        <p className='about-desc1'>
          The re-evaluation process can often be complex and time-consuming. 
          As an administrator, you play a vital role in ensuring accuracy, 
          fairness, and transparency. Our system is designed to automate 
          repetitive tasks, centralize data, and provide you with actionable 
          insights, so you can focus on making informed decisions.
        </p>
      </div>
      <div className='about-cont'>
        <h1 className='about-head'>How It Works for Admins</h1>
        <ol className='about-order-list-cont'>
          { howwork.map((work, index) => (
            <div key={ index }>
              <li>{ work.topic }</li>
              <ul className='about-unorder-list-cont'>
                <li>{ work.data }</li>
              </ul>
            </div>
          ))}
        </ol>
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

export default AdminAbout
