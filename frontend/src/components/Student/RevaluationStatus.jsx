// importing packages
import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

// importing modules
import '../../styles/styles.css'
import noResult from '../../assets/no-user.jpg'
import { useStudent } from '../hooks/useStudent.js'

// importing components
import RequestBodyList from './RequestBodyList.jsx'

const RevaluationStatus = () => {
  const { allRequestList, deleteRequest, getAllRevaluationRequest } = useStudent()
  const [searchValue, setSearchValue] = useState('')

  const requestCount = allRequestList ? allRequestList.length : 0

  const handleDeleteRequest = async (requestId) => {
    const confirm = window.confirm('Are you sure you want to delete this request?')
    if (!confirm) return
    
    try {
      await deleteRequest(requestId)
      toast.success('Request deleted successfully')
      getAllRevaluationRequest()
    } catch (error) {
      toast.error('Failed to delete request')
      console.log(error)
    }
  }

  const filteredRequests = allRequestList ? allRequestList.filter(request => (
    request.subject.toLowerCase().includes(searchValue.toLowerCase())
    ||
    request.status.toLowerCase().includes(searchValue.toLowerCase())
  )) : ''

  const requestLists = filteredRequests.length > 0 ? filteredRequests.map((each, index) => {
    return (
      <RequestBodyList
        key={ index }
        request={ each }
        handleDeleteRequest={ handleDeleteRequest }
      />
    )
  }) : ''

  const NoResult = () => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 75 }}
        animate={{ opacity: 1, y: 0 }}
        transition = {{ duration: 0.6 }}
      >
        <div className='no-result-card'>
          <img src={ noResult } className='no-result-img' alt='No User Available' />
        </div>
      </motion.div>
    )
  }

  useEffect(() => {
    getAllRevaluationRequest()
  }, [getAllRevaluationRequest])

  return (
    <div className='request-status-main-cont'>
      <div className='request-status-state-cont'>
        <p className='request-count-text'>
          Total Requests: 
          <span className='request-count'>{ requestCount }</span>
        </p>
        <div className="user-search-container">
          <input
            type="search"
            placeholder='Search by subject name or request status'
            className="user-search-field"
            onChange={ (e) => setSearchValue(e.target.value) }
            value={ searchValue }
          />
          <Search color='grey' />
        </div>
      </div>
      <ul className='request-status-cont'>
        { requestLists.length > 0 ? requestLists : <NoResult /> }
      </ul>
    </div>
  )
}

export default RevaluationStatus
