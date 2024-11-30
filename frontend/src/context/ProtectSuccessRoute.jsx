// importing packages
import React from 'react'
import { Navigate } from 'react-router-dom'

// importing modules
import { useStudent } from '../components/hooks/useStudent.js'

const ProtectSuccessRoute = ({ children }) => {
  const { isPaid } = useStudent()

  if (!isPaid) {
    return <Navigate to='/student/revaluation-request' replace />
  }

  return children

}

export default ProtectSuccessRoute