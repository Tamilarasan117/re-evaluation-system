// importing packages
import React from 'react'
import { Loader } from 'lucide-react'
import { motion } from 'framer-motion'

// importing modules
import '../../styles/styles.css'
import { useAuth } from '../hooks/useAuth.js'
import { useEvaluator } from '../hooks/useEvaluator.js'

// importing components
import ContactInput from '../Common/ContactInput.jsx'
import Textarea from '../Common/Textarea.jsx'

// key features data
const keyFeatures = [
  {
    topic: "Centralized Dashboard",
    data1:
      "Access all assigned re-evaluation requests in one place.",
    data2:
      "View detailed student information, such as subject, marks, and re-evaluation reason.",
  },
  {
    topic: "Streamlined Evaluation Process",
    data1:
      "Submit updated marks directly through the platform.",
    data2:
      "Provide comments and feedback for transparency.",
  },
  {
    topic: "Secure and Transparent System",
    data1:
      "Ensure confidentiality of student data.",
    data2:
      "Keep an auditable record of re-evaluation actions and outcomes.",
  },
  {
    topic: "Flexible Workflows",
    data1:
      "Manage your workload with clearly assigned tasks and deadlines.",
    data2:
      "Notify the admin if additional resources or clarification are required.",
  },
]

// key responsibility data
const keyResponsibility = [
  {
    topic: "Review Re-evaluation Requests",
    data1:
      "Carefully examine the student's re-evaluation request details, including reasons and initial marks.",
    data2:
      "Ensure all submitted documents, such as answer scripts, are reviewed thoroughly.",
  },
  {
    topic: "Update Marks",
    data1:
      "Adjust the marks based on a fair and unbiased re-assessment of the student's work.",
    data2:
      "Enter the revised marks in the system along with a justification if changes are made.",
  },
  {
    topic: "Provide Feedback",
    data1:
      "Add constructive comments for each request, offering clarity to students and administrators about the evaluation outcome.",
    data2:
      "",
  },
  {
    topic: "Meet Deadlines",
    data1:
      "Complete assigned re-evaluation tasks within the specified time to ensure timely communication with students.",
    data2:
      "",
  },
  {
    topic: "Maintain Confidentiality",
    data1:
      "Protect student information and adhere to institutional data security protocols.",
    data2:
      "",
  },
]

// how work data
const howwork = [
  {
    topic: "Simplified Task Management",
    data:
      "Access all your assigned requests through the evaluator dashboard, Filter and sort requests by priority or subject.",
  },
  {
    topic: "Automated Notifications",
    data:
      "Receive alerts for newly assigned requests and approaching deadlines.",
  },
  {
    topic: "Real-Time Collaboration",
    data:
      "Communicate with administrators for additional clarification or support.",
  },
  {
    topic: "Access Anywhere, Anytime",
    data:
      "Log in securely from any device to review and manage requests at your convenience.",
  },
]


const EvaluatorAbout = () => {
  const { user } = useAuth()
  const { isLoading } = useEvaluator()

  const handleContactSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="about-container">
      <h1 className='about-head'>About Section for Evaluator</h1>
      <div className='about-cont'>
        <h1 className='about-head'>Welcome, Esteemed Evaluators</h1>
        <p className='about-desc1'>
          The <strong>Online Re-evaluation System</strong> values your 
          expertise and dedication in ensuring fairness and accuracy in 
          the academic evaluation process. As an evaluator, your role is 
          pivotal in maintaining the credibility and trust of the institution's 
          assessment procedures.
        </p>
      </div>
      <div className='about-cont'>
        <h1 className='about-head'>{ user.username } your Role in the Re-evaluation System</h1>
        <p className='about-desc1'>
          As an evaluator, you are entrusted with the critical task of reassessing student 
          submissions, ensuring that every score reflects the student's actual performance. 
          This platform simplifies your responsibilities by providing a centralized and 
          organized system to review requests efficiently.
        </p>
      </div>
      <div className='about-cont'>
        <h1 className='about-head'>Key Features for Evaluators</h1>
        <ol className='about-order-list-cont'>
          { keyFeatures.map((work, index) => (
            <div key={ index }>
              <li>{ work.topic }</li>
              <ul className='about-unorder-list-cont'>
                <li>{ work.data1 }</li>
                <li>{ work.data2 }</li>
              </ul>
            </div>
          ))}
        </ol>
      </div>
      <div className='about-cont'>
        <h1 className='about-head'>Responsibilities of Evaluators</h1>
        <ol className='about-order-list-cont'>
          { keyResponsibility.map((work, index) => (
            <div key={ index }>
              <li>{ work.topic }</li>
              <ul className='about-unorder-list-cont'>
                <li>{ work.data1 }</li>
                { work.data2 !== '' ? <li>{ work.data2 }</li> : null }
              </ul>
            </div>
          ))}
        </ol>
      </div>
      <div className='about-cont'>
        <h1 className='about-head'>How the System Helps You</h1>
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

export default EvaluatorAbout
