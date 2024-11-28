import React from 'react'
import { Navigate } from 'react-router-dom'

import { useAuth } from '../components/hooks/useAuth'

const EvaluatorRoute = ({ children, requiredRole }) => {
  const { user } = useAuth()

  if (!requiredRole.includes(user.role)) {
    return <Navigate to='/unauthorized' replace />
  }

  return children
}

export default EvaluatorRoute