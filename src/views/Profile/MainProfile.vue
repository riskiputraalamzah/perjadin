<script setup>
import Swal from 'sweetalert2'
import { ref, onMounted } from 'vue'
import { useIDBStore } from '@/stores/IDB'
import { useAuthStore } from '@/stores/Auth'

const idbStore = useIDBStore()
const authStore = useAuthStore()

const userData = ref({})
const imageSrc = ref(null)

const authentication = ref({
  passwordLama: '',
  passwordBaru: '',
  confirmPasswordBaru: ''
})

const resetAuthentication = () => {
  authentication.value = {
    passwordBaru: '',
    confirmPasswordBaru: '',
    passwordLama: ''
  }
}

const handledSubmit = async () => {
  if (
    authentication.value.passwordLama == '' ||
    authentication.value.passwordBaru == '' ||
    authentication.value.confirmPasswordBaru == ''
  ) {
    resetAuthentication()
    return Swal.fire({
      title: 'Lengkapi Form terlebih dahulu',
      icon: 'error'
    })
  }

  if (authentication.value.passwordLama != userData.value.password) {
    resetAuthentication()
    return Swal.fire({
      title: 'Password Lama Anda salah',
      icon: 'error'
    })
  }

  if (authentication.value.passwordBaru != authentication.value.confirmPasswordBaru) {
    resetAuthentication()
    return Swal.fire({
      title: 'Password Baru Anda tidak sama',
      icon: 'error'
    })
  }

  const newData = {
    password: authentication.value.passwordBaru
  }

  await idbStore.updateData('users', 'id', userData.value.id, newData)

  resetAuthentication()
  return Swal.fire({
    title: 'Autentikasi Anda berhasil diubah',
    icon: 'success'
  })
}

onMounted(async () => {
  // Menunggu hingga getUser resolve
  const { row, avatar } = await authStore.getUser()

  userData.value = row
  imageSrc.value = avatar
})
</script>
<template>
  <div class="row g-4">
    <div class="col-lg-4">
      <div class="card">
        <h4 class="card-header text-dark fw-bold d-flex justify-content-between align-items-center">
          <span>My Profile</span>
          <span class="badge text-bg-success text-uppercase fs-1" v-text="userData.role"></span>
        </h4>

        <img :src="imageSrc" class="card-img-top ratio ratio-1x1 object-fit-fill img-thumbnail" />
        <div class="card-body text-center">
          <h5 class="card-title fw-bold mb-5" v-text="userData.name"></h5>

          <router-link to="/profile/edit" class="btn btn-warning">Edit</router-link>
        </div>
      </div>
    </div>
    <div class="col-lg-8">
      <div class="card">
        <h4 class="card-header text-dark fw-bold">Authentication</h4>

        <div class="card-body">
          <form @submit.prevent="handledSubmit">
            <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                :value="userData.username"
                disabled
              />
            </div>
            <div class="mb-3">
              <label for="passwordLama" class="form-label">Password Lama</label>
              <input
                type="password"
                class="form-control"
                id="passwordLama"
                v-model="authentication.passwordLama"
              />
            </div>
            <div class="mb-3">
              <label for="passwordbaru" class="form-label">Password Baru</label>
              <input
                type="password"
                class="form-control"
                id="passwordbaru"
                v-model="authentication.passwordBaru"
              />
            </div>
            <div class="mb-3">
              <label for="confirmPasswordBaru" class="form-label">Konfirmasi Password Baru</label>
              <input
                type="password"
                class="form-control"
                id="confirmPasswordBaru"
                v-model="authentication.confirmPasswordBaru"
              />
            </div>
            <button type="submit" class="btn btn-primary float-end">Simpan</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
