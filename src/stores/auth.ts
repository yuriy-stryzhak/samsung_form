import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export interface User {
  id: number
  email: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const loading = ref(false)

  const isAuthenticated = computed(() => !!token.value)

  // Set auth token and user
  const setAuth = (authToken: string, userData: User) => {
    token.value = authToken
    user.value = userData
    localStorage.setItem('token', authToken)
    
    // Set axios default header
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
  }

  // Login user
  const login = async (email: string, password: string) => {
    try {
      loading.value = true
      const response = await axios.post('/api/auth/login', { email, password })
      const { token: authToken, user: userData } = response.data
      
      setAuth(authToken, userData)
      return { success: true }
    } catch (error: any) {
      console.error('Login error:', error)
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      }
    } finally {
      loading.value = false
    }
  }

  // Logout user
  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    // Redirect to home page after logout
    window.location.href = '/'
  }

  // Initialize auth state from localStorage
  const initAuth = () => {
    if (token.value) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
      // Optionally verify token with backend
      // For now, we'll assume the token is valid if it exists
    }
  }

  return {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    logout,
    initAuth
  }
})
