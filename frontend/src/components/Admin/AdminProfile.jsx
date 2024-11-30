// importing packages
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

// importing modules
import '../../styles/styles.css'
import { useAdmin } from '../hooks/useAdmin.js'
import profileImg from '../../assets/avatar.png'

// importing components
import convertToBase64 from '../helper/convertToBase64.jsx'
import TwoInput from '../Common/TwoInput.jsx'
import Textarea from '../Common/Textarea.jsx'

const AdminProfile = () => {
  const { adminProfile, getAdminProfile, updateAdminProfile } = useAdmin()

  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState()
  const [dob, setDob] = useState('')
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
    getAdminProfile()
  }, [getAdminProfile])

  const uploadProfile = async (e) => {
    const file = e.target.files[0]
    const base64 = await convertToBase64(file)
    setProfile(base64)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateAdminProfile({
        username: username || adminProfile?.username,
        phone: phone || adminProfile?.phone,
        dob: dob || adminProfile?.dob,
        bio: bio || adminProfile?.bio,
        address: address || adminProfile?.address,
        profile: profile || adminProfile?.profile,
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
              <img src={ profile || adminProfile?.profile || profileImg } alt='Profile' className='profile-pic' />
            </label>
            <input  type='file' onChange={ uploadProfile } id='profile' name='profile' />
            <p className='profile-info'>
              Name: { adminProfile?.username }
            </p>
            <p className='profile-info'>
              Role: { adminProfile?.role }
            </p>
            <p className='profile-info'>
              Status: { adminProfile?.status }
            </p>
          </div>
          <div className='profile-input-card'>
            <div className='profile-input-box'>
              <TwoInput
                label='Username:'
                type='text'
                name='username'
                placeholder={ adminProfile?.username || 'enter username' }
                value={ username }
                onChange={(e) => setUsername(e.target.value)}
              />
              <TwoInput
                label='Email:'
                type='text'
                name='email'
                placeholder={ adminProfile?.email || 'enter email address' }
                value={ adminProfile?.email }
              />
            </div>
            <div className='profile-input-box'>
              <TwoInput
                label='Phone Number:'
                type='text'
                name='phone'
                placeholder={ adminProfile?.phone || 'enter phone number' }
                value={ phone }
                onChange={ (e) => handlePhoneInputChange(e) }
              />
              <TwoInput
                label='Date Of Birth:'
                type='text'
                name='dob'
                placeholder={ adminProfile?.dob || 'day-month-year' }
                value={ dob }
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <div className='profile-input-box'>
              <Textarea
                label='Bio:'
                name='bio'
                id='bio'
                placeholder={ adminProfile?.bio || 'enter bio' }
                value={ bio }
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <div className='profile-input-box'>
              <Textarea
                label='Current Address:'
                name='address'
                id='address'
                placeholder={ adminProfile?.address || 'enter current address' }
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

export default AdminProfile
