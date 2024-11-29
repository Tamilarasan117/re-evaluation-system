import { create } from 'zustand'
import axios from 'axios'

//const API_URL = import.meta.env.MODE === 'development' ? 'http://localhost:5000/api/auth' : '/api/auth'
//const API_URL = 'http://localhost:5000/api/auth'
const API_URL = 'https://re-evaluation-system.onrender.com'

axios.defaults.withCredentials = true

export const useAuth  = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  // register function
  register: async (username, email, password) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.post(`${ API_URL }/register`, {username, email, password})
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      })
      console.log(response.data)
    } catch (error) {
      set({
        error: error.response.data.message || 'Error in register',
        isLoading: false
      })
      throw error
    }
  },
  // login function
  login: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.post(`${ API_URL }/login`, { email, password })
      set({
        user: response.data.user,
        isAuthenticated: true,
        error: null,
        isLoading: false,
      })
      console.log('Login user details: ', response.data.user)
    } catch (error) {
      set({
        error: error.response.data.message || 'Error in login',
        isLoading: false
      })
      throw error
    }
  },
  // logout function
  logout: async () => {
    set({ isLoading: true, error: null })

    try {
      await axios.post(`${ API_URL }/logout`)
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false
      })
    } catch (error) {
      set({ error: 'Error logging out', isLoading: false })
    }
  },
  // email verification function
  verifyEmail: async (code) => {
    set({ isLoading: true, error: null })
    try {
      const response = await axios.post(`${ API_URL }/verify-email`, { code })
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      })
      console.log(response.data)
    } catch (error) {
      set({
        error: error.response.data.message || 'Error in verifying email',
        isLoading: false,
      })
      throw error
    }
  },
  //forgot password function
  forgotPassword: async (email) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${ API_URL }/forgot-password`, { email });
      set({ message: response.data.message, isLoading: false })
      console.log(response.data)
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error sending reset password email",
			});
			throw error;
		}
	},
  // reset password function
  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null })

    try {
      const response = await axios.post(`${ API_URL }/reset-password/${ token }`, { password })

      set({ message: response.data.message, isLoading: false })
      console.log(response.data)
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || 'Error resetting password'
      })
      throw error
    }
  },
  // check authentication function
  checkAuth: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    set({ isCheckingAuth: true, error: null })

    try {
      const response = await axios.get(`${ API_URL }/check-auth`)
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      })
      console.log(response.data)
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false })
      console.log(error)
    }
  },
}))