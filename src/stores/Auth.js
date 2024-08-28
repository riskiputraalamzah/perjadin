import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useMainStore } from './main'
import { useIDBStore } from './IDB'
import Swal from 'sweetalert2'

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

    // membuat expired time
    const now = new Date()

    // Menentukan waktu kedaluwarsa, milidetik
    // 1 hari

    const hari = 1
    const expiryTime = now.getTime() + hari * 24 * 60 * 60 * 1000

    localStorage.setItem('login', expiryTime)
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
    try {
      const loggedIn = parseInt(localStorage.getItem('login'))
      const storeUser = JSON.parse(localStorage.getItem('user'))

      // Memeriksa apakah data login dan user ada
      if (loggedIn && storeUser) {
        const now = new Date().getTime()

        // Memeriksa apakah waktu kedaluwarsa sudah lewat
        if (now > loggedIn) {
          // Jika data sudah expired, hapus dari localStorage
          localStorage.removeItem('login')
          localStorage.removeItem('user')
          Swal.fire({
            icon: 'error',
            title: 'Login Kembali!',
            text: 'Data Login Anda sudah usang, silakan login kembali!'
          })
          return false
        }

        // Set status login dan data user
        mainStore.login = true
        loginForm.value = storeUser
        return true
      }
    } catch (error) {
      // Jika terjadi error, data di localStorage mungkin tidak valid
      console.error('Error parsing data from localStorage:', error)
      localStorage.removeItem('login')
      localStorage.removeItem('user')
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

    // apakah ada username yang sama
    const dbUser = await idbStore.fetchData('users')
    const usernameIsExist = dbUser.find((item) => item.username == data.username)

    if (usernameIsExist) {
      return {
        success: false,
        alert: {
          icon: 'error',
          title: 'Username telah terpakai',
          text: `Username [${data.username}] telah digunakan oleh orang lain, Harap ganti !!!`
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

  const getUser = async () => {
    const userLogin = JSON.parse(localStorage.getItem('user'))
    const allUser = await idbStore.fetchData('users')

    const row = allUser.find((data) => data.username === userLogin.username)

    const avatar =
      'file' in row
        ? idbStore.createObjectURL(row.file)
        : new URL('/assets/images/user-1.jpg', import.meta.url).href

    return {
      row,
      avatar
    }
  }

  return {
    loginForm,
    setLoginFormData,
    resetLoginForm,
    checkLoginStatus,
    postDataRegistrasi,
    getUser
  }
})
