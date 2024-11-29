import React, { useEffect, useState } from 'react'

import toast from 'react-hot-toast'

import { useStudent } from '../hooks/useStudent.js'

import profileImg from '../../assets/avatar.png'
import convertToBase64 from '../helper/convertToBase64.jsx'
import TwoInput from '../Common/TwoInput.jsx'
import Textarea from '../Common/Textarea.jsx'

const StudentProfile = () => {
  const { studentProfile, getStudentProfile, updateStudentProfile } = useStudent()

  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState()
  const [dob, setDob] = useState('')
  const [department, setDepartment] = useState('')
  const [course, setCourse] = useState('')
  const [semester, setSemester] = useState()
  const [bio, setBio] = useState('')
  const [address, setAddress] = useState('')
  const [profile, setProfile] = useState('')

  const handlePhoneInputChange = (e) => {
    const value = e.target.value
    if (value.length <= 10 && !isNaN(value) && (!/^[a-z]/.test(value))) {
      setPhone(value)
    }
  }

  useEffect(() => {
    getStudentProfile()
  }, [getStudentProfile])

  const uploadProfile = async (e) => {
    const file = e.target.files[0]
    const base64 = await convertToBase64(file)
    setProfile(base64)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateStudentProfile({
        username: username || studentProfile?.username,
        tokenNo: studentProfile?.email.split('@')[0].toUpperCase(),
        phone: phone || studentProfile?.phone,
        dob: dob || studentProfile?.dob,
        department: department || studentProfile?.department,
        course: course || studentProfile?.course,
        sem: semester || studentProfile?.sem,
        bio: bio || studentProfile?.bio,
        address: address || studentProfile?.address,
        profile: profile || studentProfile?.profile,
      })
      
      toast.success('User profile updated successfully')
      console.log('User profile updated successfully')
    } catch (error) {
      toast.error('Error updating user profile')
      console.error(error)
    }
  }

  return ( 
    <>
      <div className='profile-cont'>
        <form className='profile-form' onSubmit={ handleSubmit }>
          <div className='profile-photo-card'>
            <h1 className='profile-head'>Profile</h1>
            <p className='profile-text'>You can update your profile here</p>
            <label htmlFor='profile'>
              <img src={ profile || studentProfile?.profile || profileImg } alt='Profile' className='profile-pic' />
            </label>
            <input  type='file' onChange={ uploadProfile } id='profile' name='profile' />
            <p className='profile-info'>
              Name: { studentProfile?.username }
            </p>
            <p className='profile-info'>
              Token No: { studentProfile?.tokenNo }
            </p>
            <p className='profile-info'>
              Role: { studentProfile?.role }
            </p>
            <p className='profile-info'>
              Status: { studentProfile?.status }
            </p>
          </div>
          <div className='profile-input-card'>
            <div className='profile-input-box'>
              <TwoInput
                label='Username:'
                type='text'
                name='username'
                placeholder={ studentProfile?.username || 'enter username' }
                value={ username }
                onChange={(e) => setUsername(e.target.value)}
              />
              <TwoInput
                label='Token Number:'
                type='text'
                name='tokenNo'
                placeholder={ studentProfile?.tokenNo || 'enter token number' }
                value={ studentProfile?.email.split('@')[0] }
              />
            </div>
            <div className='profile-input-box'>
              <TwoInput
                label='Email:'
                type='text'
                name='email'
                placeholder={ studentProfile?.email || 'enter email address' }
                value={ studentProfile?.email }
              />
              <TwoInput
                label='Phone Number:'
                type='text'
                name='phone'
                placeholder={ studentProfile?.phone || 'enter phone number' }
                value={ phone }
                onChange={ (e) => handlePhoneInputChange(e) }
              />
            </div>
            <div className='profile-input-box'>
              <TwoInput
                label='Date Of Birth:'
                type='text'
                name='dob'
                placeholder={ studentProfile?.dob || 'enter date of birth' }
                value={ dob }
                onChange={(e) => setDob(e.target.value)}
              />
              <TwoInput
                label='Department:'
                type='text'
                name='dept'
                placeholder={ studentProfile?.department || 'enter department name' }
                value={ department }
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
            <div className='profile-input-box'>
              <div className='pro-in-box'>
                <label htmlFor='course' className='profile-label'>Course:</label>
                <select
                  id='course'
                  className='profile-input-field'
                  value={ studentProfile?.course || course }
                  onChange={(e) => setCourse(e.target.value)}
                >
                  <option value='CP01'>CP01</option>
                  <option value='CP04'>CP04</option>
                  <option value='CP08'>CP08</option>
                  <option value='CP09'>CP09</option>
                  <option value='CP15'>CP15</option>
                  <option value='CP23'>CP23</option>
                </select>
              </div>
              <div className='pro-in-box'>
                <label htmlFor='sem' className='profile-label'>Semester:</label>
                <select
                  id='sem'
                  className='profile-input-field'
                  value={ semester || studentProfile?.sem  }
                  onChange={(e) => setSemester(e.target.value)}
                >
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                </select>
              </div>
            </div>
            <div className='profile-input-box'>
              <Textarea
                label='Bio:'
                name='bio'
                id='bio'
                placeholder={ studentProfile?.bio || 'enter bio' }
                value={ bio }
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <div className='profile-input-box'>
              <Textarea
                label='Current Address:'
                name='address'
                id='address'
                placeholder={ studentProfile?.address || 'enter current address' }
                value={ address }
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <button type='submit' className='profile-input-button'>Save Changes</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default StudentProfile
