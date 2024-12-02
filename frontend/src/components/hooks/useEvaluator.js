// importing packages
import { create } from 'zustand'
import axios from 'axios'

//const API_URL = import.meta.env.MODE === 'development' ? 'http://localhost:5000/api/evaluator' : '/api/evaluator'
//const API_URL = 'http://localhost:5000/api/evaluator'
const API_URL = 'https://re-evaluation-system.onrender.com/api/evaluator'

axios.defaults.withCredentials = true

export const useEvaluator  = create((set) => ({
  error: null,
  isLoading: false,
  message: null,
  evaluatorProfile: null,
  requestList: null,
  requestDetails: null,
  
  // get profile information function
  getEvaluatorProfile: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.get(`${ API_URL }/get-profile`)
      set({ evaluatorProfile: response.data, isLoading: false })
      console.log('Evaluator profile fetched successfully')
    } catch (error) {
      set({ error: error.message, isLoading: false })
      console.log(error)
      throw error
    }
  },
  // update evaluator profile function
  updateEvaluatorProfile: async (profile) => {
    set({ isLoading: true, error: null })
    try {
      await axios.put(`${ API_URL }/update-profile`, { ...profile })
      set({ message: 'Evaluator profile updated successfully', isLoading: false })
      set(state => ({
        ...state,
        evaluatorProfile: {...state.evaluatorProfile,...profile }
      }))
    } catch (error) {
      set({ error: error.message, isLoading: false })
      console.log(error)
      throw error
    }
  },
  // get all assigned request function
  getAssignedRequests: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.get(`${ API_URL }/get-assigned-requests`)
      set({ requestList: response.data.assignedRequests, isLoading: false })
      console.log('Assigned request fetched successfully')
    } catch (error) {
      set({ requestList: [], error: error.message, isLoading: false })
      console.log(error.message)
      throw error
    }
  },
  // get specific request function
  getRequestDetails: async (requestId) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.get(`${ API_URL }/get-specific-request-details/${ requestId }`)
      set({
        requestDetails: response.data.assignedRevaluation,
        isLoading: false,
      })
      console.log('Request details fetched successfully')
    } catch (error) {
      set({ requestDetails: null, error: error.message, isLoading: false })
      console.log(error.message)
      throw error
    }
  },
  // update user status function
  updateRequestStatus: async (requestId, status) => {
    set({ isLoading: true, error: null })
    try {
      await axios.put(`${ API_URL }/update-request-status/${requestId}`, { status })
      set(state => ({
        requestDetails: {...state.requestDetails, status },
        isLoading: false
      }))
      set(state => ({
        ...state,
        requestList: state.requestList.map(each => each._id === requestId ? { ...each, status } : each)
      }))
      set({ message: 'Request status updated successfully', isLoading: false })
      console.log('Request status updated successfully')
    } catch (error) {
      set({ error: error.message, isLoading: false })
      console.log(error)
      throw error
    }
  },
  // update request function
  updateRequestDetails: async (evaluatedData) => {
    set({ isLoading: true, error: null })
    try {
      await axios.put(`${ API_URL }/update-request-details/${ evaluatedData.id }`, { ...evaluatedData })
      set({ message: 'Request details updated successfully', isLoading: false })
      set(state => ({
        requestDetails: {...state.requestDetails,...evaluatedData },
        isLoading: false
      }))
      console.log('Request details updated successfully')
    } catch (error) {
      set({ error: error.message, isLoading: false })
      console.log(error)
      throw error
    }
  },
  // change password
  changePassword: async (oldPassword, newPassword, confirmPassword) => {
    set({ isLoading: true, error: null })
    try {
      await axios.post(`${ API_URL }/change-password`, { oldPassword, newPassword, confirmPassword })
      set({ isLoading: false, message: 'Password changed successfully' })
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false })
      console.log(error.response.data.message)
      throw error
    }
  },
}))
