// importing packages
import React from 'react'
import { Navigate } from 'react-router-dom'

// importing modules
import { useAuth } from '../components/hooks/useAuth'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated || !user.isLoggedIn) {
    return <Navigate to='/login' replace />
  }

  return children

}

export default ProtectedRoute