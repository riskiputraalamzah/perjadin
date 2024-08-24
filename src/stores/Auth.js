import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useMainStore } from './main'
import { useIDBStore } from './IDB'

export const useAuthStore = defineStore('authStore', () => {
  const mainStore = useMainStore()
  const idbStore = useIDBStore()

  // data login user
  const loginForm = ref({
    username: '',
    password: ''
  })

  const setLoginFormData = async (data) => {
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
    const dbUser = await idbStore.fetchData('users')
    const isAvailable = dbUser.find(
      (item) => item.username == data.username && item.password == data.password
    )

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
    localStorage.setItem('user', JSON.stringify(isAvailable))

    // mengubah state login menjadi true

    mainStore.login = true

    return {
      success: true,
      alert: {
        icon: 'success',
        title: 'Login Berhasil',
        showConfirmButton: false
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

  const postDataRegistrasi = async (data) => {
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
    if (data.confirm_password != data.password) {
      return {
        success: false,
        alert: {
          icon: 'error',
          title: 'Password tidak sama'
        }
      }
    }
    const setRole = {
      role: 'petugas'
    }

    // hapus objek confirm password
    let copyData = { ...data, ...setRole }

    delete copyData.confirm_password

    // store data ke objek
    await idbStore.addItem('users', copyData)
    console.log('data berhasil di tambahkan')

    return {
      success: true,
      alert: {
        icon: 'success',
        title: 'Registrasi Berhasil',
        text: 'Silahkan login menggunakan akun yang baru Anda buat'
      }
    }
  }

  return { loginForm, setLoginFormData, resetLoginForm, checkLoginStatus, postDataRegistrasi }
})
