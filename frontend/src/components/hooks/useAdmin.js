import { create } from 'zustand'
import axios from 'axios'

//const API_URL = import.meta.env.MODE === 'development' ? 'http://localhost:5000/api/admin' : '/api/admin'
//const API_URL = 'http://localhost:5000/api/admin'
const API_URL = 'https://re-evaluation-system.onrender.com'

axios.defaults.withCredentials = true

export const useAdmin  = create((set) => ({
  userList: null,
  error: null,
  isLoading: false,
  message: null,
  adminProfile: null,
  requestList: null,
  paymentList: null,
  
  // get users function
  getUsers: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.get(`${ API_URL }/get-users`)
      set({ userList: response.data, isLoading: false })
    } catch (error) {
      set({ error: error.message, isLoading: false })
      console.log(error)
    }
  },
  // delete user function
  deleteUser: async (userId) => {
    set({ isLoading: true, error: null })
    try {
      await axios.post(`${ API_URL }/delete-user/${ userId }`)
      set({ message: 'User deleted successfully', isLoading: false })
      set(state => ({
        ...state,
        userList: state.userList.filter(user => user._id !== userId)
      }))
    } catch (error) {
      set({ error: error.message, isLoading: false })
      console.log(error)
    }
  },
  // update user role function
  updateUserRole: async (userId, role) => {
    set({ isLoading: true, error: null })
    try {
      await axios.put(`${ API_URL }/update-user-role/${userId}`, { role })
      set({ message: 'User role updated successfully', isLoading: false })
      set(state => ({
        ...state,
        userList: state.userList.map(user => user._id === userId ? { ...user, role } : user)
      }))
    } catch (error) {
      set({ error: error.message, isLoading: false })
      console.log(error)
    }
  },
  // update user status function
  updateUserStatus: async (userId, status) => {
    set({ isLoading: true, error: null })
    try {
      await axios.put(`${ API_URL }/update-user-status/${userId}`, { status })
      set({ message: 'User status updated successfully', isLoading: false })
      set(state => ({
        ...state,
        userList: state.userList.map(user => user._id === userId ? { ...user, status } : user)
      }))
    } catch (error) {
      set({ error: error.message, isLoading: false })
      console.log(error)
    }
  },
  // get profile information function
  getAdminProfile: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.get(`${ API_URL }/get-profile`)
      set({ adminProfile: response.data, isLoading: false })
      console.log(response.data)
    } catch (error) {
      set({ error: error.message, isLoading: false })
      console.log(error)
    }
  },
  // update admin profile function
  updateAdminProfile: async (profile) => {
    set({ isLoading: true, error: null })
    try {
      await axios.put(`${ API_URL }/update-profile`, { ...profile })
      set({ message: 'Admin profile updated successfully', isLoading: false })
      set(state => ({
        ...state,
        adminProfile: {...state.adminProfile,...profile }
      }))
    } catch (error) {
      set({ error: error.message, isLoading: false })
      console.log(error)
    }
  },
  // get revaluation request function
  getRevaluationRequest: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.get(`${ API_URL }/get-revaluation-requests`)
      set({
        requestList: response.data,
        isLoading: false
      })
      console.log('Revaluation request fetched successfully')
    } catch (error) {
      set({ error: error.message, isLoading: false })
      console.log(error)
    }
  },
  // update user status function
  updateRequestStatus: async (requestId, status) => {
    set({ isLoading: true, error: null })
    try {
      await axios.put(`${ API_URL }/update-request-status/${requestId}`, { status })
      set({ message: 'Request status updated successfully', isLoading: false })
      set(state => ({
        ...state,
        requestList: state.requestList.map(each => each._id === requestId ? { ...each, status } : each)
      }))
    } catch (error) {
      set({ error: error.message, isLoading: false })
      console.log(error)
    }
  },
  // request assign to evaluator function
  assignEvaluator: async (requestId, evaluatorId) => {
    set({ isLoading: true, error: null })
    try {
      await axios.put(`${ API_URL}/assign-evaluator/${requestId}`, { evaluatorId })
      set({ message: 'Request assigned successfully', isLoading: false })
      set(state => ({
        ...state,
        requestList: state.requestList.map(each => each._id === requestId? {...each, evaluator: evaluatorId } : each)
      }))
    } catch (error) {
      set({ error: error.message, isLoading: false })
      console.log(error)
    }
  },
  // delete revaluation request function
  deleteRequest: async (requestId) => {
    set({ isLoading: true, error: null })
    try {
      await axios.delete(`${ API_URL }/revaluation-request-delete/${ requestId }`)
      set({ isLoading: false, message: 'Revaluation request deleted successfully' })
      set(state => ({
        ...state,
        requestList: state.requestList.filter(each => each._id !== requestId)
      }))
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false })
      console.log(error)
    }
  }
}))