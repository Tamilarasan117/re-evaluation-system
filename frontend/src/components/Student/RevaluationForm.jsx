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
  const [department, setDepartment] = useState(studentProfile?.department)
  const [course, setCourse] = useState(studentProfile?.course)
  const [semester, setSemester] = useState(studentProfile?.sem)
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

  const handleSubmitRequest = async (e) => {
    e.preventDefault()

    if (!studentName ||!studentTokenNo ||!department ||!course ||!semester ||!subject ||!mark ||!fees ||!reason ||!document) {
      toast.error('All fields are required!')
      return
    }

    try {
      await revaluationRequest({
        studentName,
        studentTokenNo,
        department,
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
      setDepartment('')
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
            value={ studentProfile?.username }
          />
          <ThreeInput
            label='Token number:'
            type='text'
            name='token'
            placeholder='Enter token number'
            value={ studentProfile?.tokenNo }
          />
        </div>
        <div className='revaluation-input-group'>
          <ThreeInput
            label='Department:'
            type='text'
            name='dept'
            placeholder='Enter department'
            value={ studentProfile?.department }
          />
          <ThreeInput
            label='Course:'
            type='text'
            name='course'
            placeholder='Enter course'
            value={ studentProfile?.course }
          />
        </div>
        <div className='revaluation-input-group'>
          <ThreeInput
            label='Semester:'
            type='number'
            name='semester'
            placeholder='Enter semester'
            value={ studentProfile?.sem }
          />
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
            onChange={ (e) => setMark(e.target.value) }
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