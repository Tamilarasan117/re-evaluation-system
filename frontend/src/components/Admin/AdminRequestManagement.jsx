// importing packages
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

// importing modules
import '../../styles/styles.css'
import { useAdmin } from './../hooks/useAdmin.js'
import noResult from '../../assets/no-user.jpg'

// importing components
import RequestState from './RequestState.jsx'
import RequestListHeader from './RequestListHeader.jsx'
import RequestList from './RequestList.jsx'

const AdminRequestManagement = () => {
  const {
    assignEvaluator,
    deleteRequest,
    getUsers,
    getRevaluationRequest,
    requestList,
    updateRequestStatus,
    userList
  } = useAdmin()

  const requestCount = requestList?.length
  const approvedRequest = requestList?.filter( each => each.status === 'Approved')
  const approvedCount = approvedRequest?.length
  const pendingRequest = requestList?.filter( each => each.status === 'Pending')
  const pendingCount = pendingRequest?.length
  const rejectedRequest = requestList?.filter( each => each.status === 'Rejected')
  const rejectedCount = rejectedRequest?.length

  const evaluatorList = userList ? userList.filter(user => {
    return user.role === 'evaluator'
  }) : ''

  const handleUpdateRequestStatus = async (requestId, requestStatus) => {
    const confirm = window.confirm("Are you sure you want to update this request status?")
    if (!confirm) return
    try {
      await updateRequestStatus(requestId, requestStatus)
      toast.success('Request status updated successfully')
    } catch (error) {
      toast.error('Failed to update request status')
      console.error(error)
    }
  }

  const handleAssignEvaluator = async (requestId, evaluatorName) => {
    const evaluatorId = evaluatorList ? evaluatorList.filter(each => each.username === evaluatorName ) : ''
    try {
      if (evaluatorId.length === 0) {
        return toast.error('Evaluator not found')
      } else {
        await assignEvaluator(requestId, evaluatorId[0]._id)
        toast.success('Evaluator assigned successfully')
      }
    } catch (error) {
      toast.error('Failed to assign evaluator')
      console.error(error)
    }
  }

  const handleDeleteRequest = async (requestId) => {
    const confirm = window.confirm('Are you sure you want to delete this request?')
    if (!confirm) return
    
    try {
      await deleteRequest(requestId)
      toast.success('Request deleted successfully')
      console.log('Request deleted successfully.')
    } catch (error) {
      toast.error('Failed to delete request')
      console.log(error)
    }
  }

  const requestLists = requestList ? requestList.map((each, index) => {
    return (
      <RequestList
        key={ index }
        requestList={ each }
        evaluatorList={ evaluatorList }
        handleUpdateRequestStatus={ handleUpdateRequestStatus }
        handleAssignEvaluator={ handleAssignEvaluator }
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
    getRevaluationRequest()
    getUsers()
  }, [getRevaluationRequest, getUsers])

  return (
    <div className='request-status-main-cont'>
      <RequestState
        requestCount={ requestCount }
        approvedCount={ approvedCount }
        pendingCount={ pendingCount }
        rejectedCount={ rejectedCount }
      />
      <ul className='request-status-body-cont'>
        <RequestListHeader />
        { requestLists.length > 0 ? requestLists : <NoResult /> }
      </ul>
    </div>
  )
}

export default AdminRequestManagement