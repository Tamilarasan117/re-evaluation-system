import React from 'react'
import { Navigate } from 'react-router-dom'

import { useAuth } from '../components/hooks/useAuth'

const ProtectRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth()

  if (isAuthenticated && user.isLoggedIn && user.role === 'admin') {
    return <Navigate to='/admin/profile' replace />
  }

  if (isAuthenticated && user.isLoggedIn && user.role === 'evaluator') {
    return <Navigate to='/evaluator/profile' replace />
  }

  if (isAuthenticated && user.isLoggedIn && user.role === 'student') {
    return <Navigate to='/student/profile' replace />
  }
  return children
}

export default ProtectRoute