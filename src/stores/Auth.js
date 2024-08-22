import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('authStore', () => {
  const loginForm = ref({
    username: '',
    password: ''
  })

  const setLoginFormData = (data) => (loginForm.value = data)
  const resetLoginForm = () => {
    loginForm.value = {
      username: '',
      password: ''
    }
  }

  return { loginForm, setLoginFormData, resetLoginForm }
})
