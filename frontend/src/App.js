// importing packages
import { Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

// importing modules
import './app.css'
import { useAuth } from './components/hooks/useAuth.js'

// importing protect route components
import ProtectRoute from './context/ProtectRoute.jsx'
import ProtectedRoute from './context/ProtectedRoute.jsx'
import ProtectPaymentRoute from './context/ProtectPaymentRoute.jsx'
import ProtectSuccessRoute from './context/ProtectSuccessRoute.jsx'
import AdminRoute from './context/AdminRoute.jsx'
import StudentRoute from './context/StudentRoute.jsx'
import EvaluatorRoute from './context/EvaluatorRoute.jsx'

// importing auth components
import LoadingSpinner from './components/Common/LoadingSpinner.jsx'
import PublicLayout from './components/Layout/PublicLayout.jsx'
import Index from './components/Home/Index.jsx'
import Register from './components/Auth/Register.jsx'
import EmailVerification from './components/Auth/EmailVerification.jsx'
import Login from './components/Auth/Login.jsx'
import ForgotPassword from './components/Auth/ForgotPassword.jsx'
import ResetPassword from './components/Auth/ResetPassword.jsx'
import NotFound from './components/Unauthorized/NotFound.jsx'
import Unauthorized from './components/Unauthorized/Unauthorized.jsx'

// importing admin components
import AdminLayout from './components/Layout/AdminLayout.jsx'
import AdminProfile from './components/Admin/AdminProfile.jsx'
import AdminUserManagement from './components/Admin/AdminUserManagement.jsx'
import AdminRequestManagement from './components/Admin/AdminRequestManagement.jsx'

// importing student components
import StudentLayout from './components/Layout/StudentLayout.jsx'
import StudentProfile from './components/Student/StudentProfile.jsx'
import RevaluationForm from './components/Student/RevaluationForm.jsx'
import RevaluationStatus from './components/Student/RevaluationStatus.jsx'
import PaymentForm from './components/Student/PaymentForm.jsx'
import PaymentSuccess from './components/Student/PaymentSuccess.jsx'

// importing evaluator components
import EvaluatorLayout from './components/Layout/EvaluatorLayout.jsx'
import EvaluatorProfile from './components/Evaluator/EvaluatorProfile.jsx'
import ViewAssignedRequest from './components/Evaluator/ViewAssignedRequest.jsx'
import AssignedRequestDetails from './components/Evaluator/AssignedRequestDetails.jsx'

const App = () => {
  const { checkAuth, isCheckingAuth } = useAuth()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth) {
    return <LoadingSpinner />
  }

  return ( 
    <>
      <Routes>
        {/* Public Route */}
        <Route exact path='/' element={ <PublicLayout> <Index /> </PublicLayout> } />

        {/* Protect Route */}
        <Route exact path='/register' element={
          <ProtectRoute> <Register /> </ProtectRoute>
        } />
        <Route exact path='/verify-email' element={ <EmailVerification /> } />
        <Route exact path='/login' element={
          <ProtectRoute> <Login /> </ProtectRoute>
        } />
        <Route exact path='/forgot-password' element={
          <ProtectRoute> <ForgotPassword /> </ProtectRoute>
        } />
        <Route exact path='/reset-password/:token' element={
          <ProtectRoute> <ResetPassword /> </ProtectRoute>
        } />

        {/* Admin Protected Role Route */}
        <Route exact path='/admin/profile' element={ 
          <ProtectedRoute> 
            <AdminRoute requiredRole={['admin']}>
              <AdminLayout> <AdminProfile /> </AdminLayout>
            </AdminRoute>
          </ProtectedRoute>
        } />
        <Route exact path='/admin/user-management' element={ 
          <ProtectedRoute> 
            <AdminRoute requiredRole={['admin']}>
              <AdminLayout> <AdminUserManagement /> </AdminLayout>
            </AdminRoute>
          </ProtectedRoute>
        } />
        <Route exact path='/admin/re-evaluation-requests' element={ 
          <ProtectedRoute> 
            <AdminRoute requiredRole={['admin']}>
              <AdminLayout> <AdminRequestManagement /> </AdminLayout>
            </AdminRoute>
          </ProtectedRoute>
        } />

        {/* Student Protected Role Route */}
        <Route exact path='/student/profile' element={ 
          <ProtectedRoute>
            <StudentRoute requiredRole={['student']}>
              <StudentLayout> <StudentProfile /> </StudentLayout>
            </StudentRoute>
          </ProtectedRoute>
        } />
        <Route exact path='/student/revaluation-request' element={ 
          <ProtectedRoute>
            <StudentRoute requiredRole={['student']}>
              <StudentLayout> <RevaluationForm /> </StudentLayout>
            </StudentRoute>
          </ProtectedRoute>
        } />
        <Route exact path='/student/revaluation-request/payment' element={ 
          <ProtectedRoute>
            <ProtectPaymentRoute>
              <StudentRoute requiredRole={['student']}>
                <StudentLayout> <PaymentForm /> </StudentLayout>
              </StudentRoute>
            </ProtectPaymentRoute>
          </ProtectedRoute>
        } />
        <Route exact path='/student/revaluation-payment-success' element={ 
          <ProtectedRoute>
            <ProtectSuccessRoute>
              <StudentRoute requiredRole={['student']}>
                <StudentLayout> <PaymentSuccess /> </StudentLayout>
              </StudentRoute>
            </ProtectSuccessRoute>
          </ProtectedRoute>
        } />
        <Route exact path='/student/revaluation-status' element={ 
          <ProtectedRoute>
            <StudentRoute requiredRole={['student']}>
              <StudentLayout> <RevaluationStatus /> </StudentLayout>
            </StudentRoute>
          </ProtectedRoute>
        } />

        {/* Evaluator Protected Role Route */}
        <Route exact path='/evaluator/profile' element={ 
          <ProtectedRoute> 
            <EvaluatorRoute requiredRole={['evaluator']}>
              <EvaluatorLayout> <EvaluatorProfile /> </EvaluatorLayout>
            </EvaluatorRoute>
          </ProtectedRoute>
        } />
        <Route exact path='/evaluator/view-assigned-request' element={ 
          <ProtectedRoute> 
            <EvaluatorRoute requiredRole={['evaluator']}>
              <EvaluatorLayout> <ViewAssignedRequest /> </EvaluatorLayout>
            </EvaluatorRoute>
          </ProtectedRoute>
        } />
        <Route exact path='/evaluator/assigned-requests-details/:requestId' element={ 
          <ProtectedRoute> 
              <EvaluatorRoute requiredRole={['evaluator']}>
                <EvaluatorLayout> <AssignedRequestDetails /> </EvaluatorLayout>
              </EvaluatorRoute>
          </ProtectedRoute>
        } />

        {/* Unauthorized Route */}
        <Route path='/unauthorized' element={ <Unauthorized /> } />

        {/* Page Not Found Route */}
        <Route path='*' element={ <NotFound /> } />
        
      </Routes>
      <Toaster />
    </>
  )
}

export default App
