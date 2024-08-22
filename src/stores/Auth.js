import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useMainStore } from './main'

import dbUser from '@/data/users.json'

export const useAuthStore = defineStore('authStore', () => {
  const mainStore = useMainStore()

  // data login user
  const loginForm = ref({
    username: '',
    password: ''
  })

  const setLoginFormData = (data) => {
    // cek apakah data kosong

    if (data.username == '' || data.password == '') {
      return {
        success: false,
        alert: {
          icon: 'error',
          title: 'Lengkapi form terlebih dahulu'
        }
      }
    }

    // cek apakah data ada pada database
    const isAvailable = dbUser.find(
      (item) => item.username == data.username && item.password == data.password
    )
    console.log(isAvailable)

    if (!isAvailable) {
      return {
        success: false,
        alert: {
          icon: 'error',
          title: 'Data tidak ditemukan',
          text: 'Data yang anda masukkan tidak ada di sistem kami'
        }
      }
    }

    // data success
    loginForm.value = data

    localStorage.setItem('login', 'true')
    localStorage.setItem('user', JSON.stringify(data))

    // mengubah state login menjadi true

    mainStore.login = true

    return {
      success: true,
      alert: {
        icon: 'success',
        title: 'Login Berhasil'
      }
    }
  }

  const resetLoginForm = () => {
    loginForm.value = {
      username: '',
      password: ''
    }
    console.log('reset')
  }

  const checkLoginStatus = () => {
    const loggedIn = localStorage.getItem('login')
    const storeUser = localStorage.getItem('user')

    if (loggedIn && storeUser) {
      mainStore.login = true
      loginForm.value = JSON.parse(storeUser)
      return true
    }
    return false
  }

  const postDataRegistrasi = (data) => {
    if (
      data.name == '' ||
      data.username == '' ||
      data.password == '' ||
      data.confirm_password == ''
    ) {
      return {
        success: false,
        alert: {
          icon: 'error',
          title: 'Lengkapi form terlebih dahulu'
        }
      }
    }

    return {
      success: false,
      alert: {
        icon: 'info',
        title: 'Maaf, masih dalam proses develop'
      }
    }
  }

  return { loginForm, setLoginFormData, resetLoginForm, checkLoginStatus, postDataRegistrasi }
})
