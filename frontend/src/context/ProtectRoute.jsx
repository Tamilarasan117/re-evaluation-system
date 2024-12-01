// importing packages
import React from 'react'
import { Navigate } from 'react-router-dom'

// importing modules
import { useAuth } from '../components/hooks/useAuth'

const ProtectRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth()

  if (isAuthenticated && user.isLoggedIn && user.role === 'admin') {
    return <Navigate to='/admin/about' replace />
  }

  if (isAuthenticated && user.isLoggedIn && user.role === 'evaluator') {
    return <Navigate to='/evaluator/about' replace />
  }

  if (isAuthenticated && user.isLoggedIn && user.role === 'student') {
    return <Navigate to='/student/about' replace />
  }
  
  return children
}

export default ProtectRoute
