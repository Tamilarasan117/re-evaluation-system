import React from 'react'
import { Navigate } from 'react-router-dom'

import { useStudent } from '../components/hooks/useStudent.js'

const ProtectPaymentRoute = ({ children }) => {
  const { requested } = useStudent()

  if (!requested) {
    return <Navigate to='/student/revaluation-request' replace />
  }

  return children

}

export default ProtectPaymentRoute