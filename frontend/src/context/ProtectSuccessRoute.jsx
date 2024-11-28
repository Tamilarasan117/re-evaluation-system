import React from 'react'
import { Navigate } from 'react-router-dom'

import { useStudent } from '../components/hooks/useStudent.js'

const ProtectSuccessRoute = ({ children }) => {
  const { isPaid } = useStudent()

  if (!isPaid) {
    return <Navigate to='/student/revaluation-request' replace />
  }

  return children

}

export default ProtectSuccessRoute