// importing modules
import { create } from 'zustand'
import axios from 'axios'

//const API_URL = import.meta.env.MODE === 'development' ? 'http://localhost:5000/api/student' : '/api/student'
//const API_URL = 'http://localhost:5000/api/student'
const API_URL = 'https://re-evaluation-system.onrender.com/api/student'

axios.defaults.withCredentials = true

export const useStudent  = create((set) => ({
  error: null,
  isLoading: false,
  message: null,
  requested: false,
  isPaid: false,
  requestCart: null,
  studentProfile: null,
  paymentDetails: null,
  allRequestList: null,
  
  // get student profile information function
  getStudentProfile: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.get(`${ API_URL }/get-profile`)
      set({ studentProfile: response.data, isLoading: false })
      console.log('Profile: ', response.data)
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false })
      console.log(error)
    }
  },
  // update student profile function
  updateStudentProfile: async (profile) => {
    set({ isLoading: true, error: null })
    try {
      await axios.put(`${ API_URL }/update-profile`, { ...profile })
      set({ message: 'Admin profile updated successfully', isLoading: false })
      set(state => ({
        ...state,
        studentProfile: {...state.studentProfile,...profile }
      }))
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false })
      console.log(error)
    }
  },
  // re evaluation request function
  revaluationRequest: async (requestData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.post(`${ API_URL }/revaluation-request`, { ...requestData })
      
      set({
        message: 'Revaluation request sent successfully',
        isLoading: false,
        requested: true
      })
      console.log('Revaluation request sent successfully')
      console.log(response.data.data)
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false, requested: false })
      console.log('Error: ', error.response.data.message)
      throw error.response.data.message
    }
  },
  // get revaluation request function
  getRevaluationRequest: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.get(`${ API_URL }/get-revaluation-request`)
      set({ requestCart: response.data.data, isLoading: false })
      console.log('revaluation request: ', response.data.data)
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false })
      console.log(error)
    }
  },
  // request payment function
  requestPayment: async (requestData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.post(`${ API_URL }/request-payment/${ requestData.revaluationRequestId }`, { ...requestData })
      set({
        paymentDetails: response.data.data,
        message: 'Payment requested successfully',
        isLoading: false,
        requested: false,
        isPaid: true,
      })
      console.log('Payment requested successfully')
      console.log('payment success data: ', response.data.data)
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false, requested: false, isPaid: false })
      console.log(error)
    }  
  },
  // get all revaluation request function
  getAllRevaluationRequest: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.get(`${ API_URL }/get-all-revaluation-request` )
      set({ allRequestList: response.data.data, isLoading: false })
      console.log('useStudent request list: ', response.data.data)
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false })
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
        allRequestList: state.allRequestList.filter(each => each._id !== requestId)
      }))
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false })
      console.log(error)
    }
  }
}))
