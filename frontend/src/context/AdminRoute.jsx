// importing packages
import React from 'react'
import { Navigate } from 'react-router-dom'

// importing modules
import { useAuth } from '../components/hooks/useAuth.js'

const AdminRoute = ({ children, requiredRole }) => {
  const { user } = useAuth()

  if (!requiredRole.includes(user.role)) {
    return <Navigate to='/unauthorized' replace />
  }

  return children
}

export default AdminRoute
