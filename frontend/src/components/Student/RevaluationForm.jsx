import React, { useState } from 'react'
import { Loader } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

import toast from 'react-hot-toast'

import { useStudent } from '../hooks/useStudent.js'

import ThreeInput from '../Common/ThreeInput.jsx'
import Textarea from './../Common/Textarea.jsx'
import fileUploadImg from '../../assets/fileUpload.jpg'
import convertToBase64 from '../helper/convertToBase64.jsx'

const RevaluationForm = () => {
  const { isLoading, revaluationRequest, studentProfile } = useStudent()

  const [studentName, setStudentName] = useState(studentProfile?.username)
  const [studentTokenNo, setStudentTokenNo] = useState(studentProfile?.tokenNo)
  const [email, setEmail] = useState(studentProfile?.email)
  const [course, setCourse] = useState('')
  const [semester, setSemester] = useState('')
  const [subject, setSubject] = useState('')
  const [mark, setMark] = useState('')
  const [fees, setFees] = useState('')
  const [document, setDocument] = useState('')
  const [reason, setReason] = useState('')

  const navigate = useNavigate()

  const uploadDocument = async (e) => {
    const file = e.target.files[0]
    const base64 = await convertToBase64(file)
    setDocument(base64)
  }

  const handleMark = (e) => {
    const { value } = e.target
    if (value => 0 && value <= 100) {
      setMark(value)
    }
  }

  const handleSubmitRequest = async (e) => {
    e.preventDefault()
    console.log(course, semester)

    if (!studentName ||!studentTokenNo ||!email ||!course ||!semester ||!subject ||!mark ||!fees ||!reason ||!document) {
      toast.error('All fields are required!')
      return
    }

    try {
      await revaluationRequest({
        studentName,
        studentTokenNo,
        email,
        course,
        semester,
        subject,
        mark,
        fees,
        reason,
        document,
      })

      navigate('/student/revaluation-request/payment', { replace: true })
      
      toast.success('Revaluation request submitted successfully!')
      console.log('Revaluation request submitted successfully!')
      setStudentName('')
      setStudentTokenNo('')
      setEmail('')
      setCourse('')
      setSemester('')
      setSubject('')
      setMark('')
      setFees('')
      setReason('')
      setDocument('')
    } catch (error) {
      toast.error(error)
      console.error('Failed to submit revaluation request:', error)
    }
  }

  return (
    <div className='revaluation-cont'>
      <form onSubmit={ handleSubmitRequest } className='revaluation-form'>
        <h1 className='revaluation-head'>Re-Evaluation Request</h1>
        <div className='revaluation-input-group'>
          <ThreeInput
            label='Student Name:'
            type='text'
            name='name'
            placeholder='Enter your name'
            value={ studentProfile?.username || studentName }
            onChange={ e => setStudentName(e.target.value) }
          />
          <ThreeInput
            label='Token number:'
            type='text'
            name='token'
            placeholder='Enter token number'
            value={ studentProfile?.tokenNo || studentTokenNo }
            onChange={ e => setStudentTokenNo(e.target.value) }
          />
        </div>
        <div className='revaluation-input-group'>
          <ThreeInput
            label='Email:'
            type='email'
            name='email'
            placeholder='Enter email address'
            value={ studentProfile?.email || email }
            onChange={ e => setEmail(e.target.value) }
          />
          <div className='pro-in-box'>
            <label htmlFor='course' className='profile-label'>Course:</label>
            <select
              className='profile-input-field'
              value={ studentProfile?.course || course }
              onChange={ e => setCourse(e.target.value) }
            >
              <option value='CP01'>CP01</option>
              <option value='CP04'>CP04</option>
              <option value='CP08'>CP08</option>
              <option value='CP09'>CP09</option>
              <option value='CP15'>CP15</option>
              <option value='CP23'>CP23</option>
            </select>
          </div>
        </div>
        <div className='revaluation-input-group'>
          <div className='pro-in-box'>
            <label htmlFor='course' className='profile-label'>Course:</label>
            <select
              className='profile-input-field'
              value={ studentProfile?.sem || semester }
              onChange={ e => setSemester(e.target.value) }
            >
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
            </select>
          </div>
          <ThreeInput
            label='Subject:'
            type='text'
            name='subject'
            placeholder='Enter subject'
            value={ subject }
            onChange={ (e) => setSubject(e.target.value) }
          />
        </div>
        <div className='revaluation-input-group'>
          <ThreeInput
            label='Current Mark:'
            type='text'
            name='mark'
            placeholder='Enter current mark'
            value={ mark }
            onChange={ (e) => handleMark(e) }
          />
          <ThreeInput
            label='Request Fees:'
            type='text'
            name='fees'
            placeholder='Enter request fees minimum RS:-350'
            value={ fees }
            onChange={ (e) => setFees(e.target.value) }
          />
        </div>
        <div className='revaluation-input-group'>
          <Textarea
            label='Reason:'
            type='text'
            name='reason'
            placeholder='Enter valid reason'
            value={ reason }
            onChange={ (e) => setReason(e.target.value) }
          />
        </div>
        <div className='file-upload-cont'>
          <p className='profile-label'>File Upload:</p>
          <div className='file-upload-card'>
            <label htmlFor='file-upload'>
              <img src={ document || fileUploadImg } alt='document' className='file-upload-img' />
            </label>
            <input type='file' onChange={ uploadDocument } id='file-upload' />
            <p className='file-upload-txt'> Maximum file size: 1MB. Supported file types: JPEG, PNG, JPG, and PDF. </p>
          </div>
        </div>
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition = {{ delay: 0.3 }}
          type='submit'
          className="request-btn"
          disabled={ isLoading }
        >
          {
            isLoading ?
              <Loader color='#fff' className='animate-spinner' size={ 25 } aria-label="Loading Spinner" />
              : 'Submit Revaluation Request'
          }
        </motion.button>
      </form>
    </div>
  )
}

export default RevaluationForm