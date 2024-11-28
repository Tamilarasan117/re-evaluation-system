import React, { useEffect, useState } from 'react'

import toast from 'react-hot-toast'

import { useEvaluator } from '../hooks/useEvaluator.js'

import profileImg from '../../assets/avatar.png'
import convertToBase64 from '../helper/convertToBase64.jsx'
import TwoInput from '../Common/TwoInput.jsx'
import Textarea from '../Common/Textarea.jsx'

const EvaluatorProfile = () => {
  const { evaluatorProfile, getEvaluatorProfile, updateEvaluatorProfile } = useEvaluator()

  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [dob, setDob] = useState('')
  const [department, setDepartment] = useState('')
  const [course, setCourse] = useState('')
  const [bio, setBio] = useState('')
  const [address, setAddress] = useState('')
  const [profile, setProfile] = useState('')

  useEffect(() => {
    getEvaluatorProfile()
  }, [getEvaluatorProfile])

  const uploadProfile = async (e) => {
    const file = e.target.files[0]
    const base64 = await convertToBase64(file)
    setProfile(base64)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateEvaluatorProfile({
        username: username || evaluatorProfile?.username,
        phone: phone || evaluatorProfile?.phone,
        dob: dob || evaluatorProfile?.dob,
        department: department || evaluatorProfile?.department,
        course: course || evaluatorProfile?.course,
        bio: bio || evaluatorProfile?.bio,
        address: address || evaluatorProfile?.address,
        profile: profile || evaluatorProfile?.profile,
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
              <img src={ profile || evaluatorProfile?.profile || profileImg } alt='Profile' className='profile-pic' />
            </label>
            <input  type='file' onChange={ uploadProfile } id='profile' name='profile' />
            <p className='profile-info'>
              Name: { evaluatorProfile?.username }
            </p>
            <p className='profile-info'>
              Role: { evaluatorProfile?.role }
            </p>
            <p className='profile-info'>
              Status: { evaluatorProfile?.status }
            </p>
          </div>
          <div className='profile-input-card'>
            <div className='profile-input-box'>
              <TwoInput
                label='Username:'
                type='text'
                name='username'
                placeholder={ evaluatorProfile?.username || 'enter username' }
                value={ username }
                onChange={(e) => setUsername(e.target.value)}
              />
              <TwoInput
                label='Email:'
                type='text'
                name='email'
                placeholder={ evaluatorProfile?.email || 'enter email address' }
                value={ evaluatorProfile?.email }
              />
            </div>
            <div className='profile-input-box'>
              <TwoInput
                label='Phone Number:'
                type='text'
                name='phone'
                placeholder={ evaluatorProfile?.phone || 'enter phone number' }
                value={ phone }
                onChange={(e) => setPhone(e.target.value)}
              />
              <TwoInput
                label='Date Of Birth:'
                type='text'
                name='dob'
                placeholder={ evaluatorProfile?.dob || 'day-month-year' }
                value={ dob }
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <div className='profile-input-box'>
              <TwoInput
                label='Department:'
                type='text'
                name='department'
                placeholder={ evaluatorProfile?.department || 'enter department' }
                value={ department }
                onChange={(e) => setDepartment(e.target.value)}
              />
              <TwoInput
                label='Course:'
                type='text'
                name='course'
                placeholder={ evaluatorProfile?.course || 'enter course' }
                value={ course }
                onChange={(e) => setCourse(e.target.value)}
              />
            </div>
            <div className='profile-input-box'>
              <Textarea
                label='Bio:'
                name='bio'
                id='bio'
                placeholder={ evaluatorProfile?.bio || 'enter bio' }
                value={ bio }
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <div className='profile-input-box'>
              <Textarea
                label='Current Address:'
                name='address'
                id='address'
                placeholder={ evaluatorProfile?.address || 'enter current address' }
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

export default EvaluatorProfile
