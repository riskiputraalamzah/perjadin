<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/Auth'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { Toast } from '@/components/ToastAlert'

const authStore = useAuthStore()

const router = useRouter()

const disabledSubmit = ref(false)

const formData = ref({
  name: '',
  username: '',
  password: '',
  confirm_password: ''
})

const resetFormData = () => {
  formData.value = {
    name: '',
    username: '',
    password: '',
    confirm_password: ''
  }
}

const handleSubmit = async () => {
  disabledSubmit.value = !disabledSubmit.value
  const storeDataRegistrasi = await authStore.postDataRegistrasi(formData.value)

  if (!storeDataRegistrasi.success) {
    Swal.fire(storeDataRegistrasi.alert)
    disabledSubmit.value = !disabledSubmit.value //ubah ke false

    return resetFormData()
  }
  disabledSubmit.value = !disabledSubmit.value //ubah ke true

  Toast.fire(storeDataRegistrasi.alert)
  router.push('/login')
}

const togglePassword = ref(false)
const toggleConfirmPassword = ref(false)
</script>

<template>
  <div class="card-body">
    <router-link class="text-nowrap logo-img d-block text-center" to="/login">
      <!-- <img src="/assets/images/logo.png" width="80" alt="" /> -->
      <div class="display-4 m-0 font-neue">
        <span class="text-dark">PER - </span>
        <span class="text-primary">JADIN</span>
      </div></router-link
    >

    <p class="text-center fw-bold h1 text-dark">Register</p>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="exampleInputtext1" class="form-label">Nama</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputtext1"
          v-model="formData.name"
          aria-describedby="textHelp"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Username</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          v-model="formData.username"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="mb-4 parent-toggle-password">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input
          :type="togglePassword ? 'text' : 'password'"
          class="form-control"
          id="exampleInputPassword1"
          v-model="formData.password"
        />
        <i
          :class="['ti icon', togglePassword ? 'ti-eye' : 'ti-eye-off']"
          @click="togglePassword = !togglePassword"
        ></i>
      </div>
      <div class="mb-4 parent-toggle-password">
        <label for="confirm_password" class="form-label">Konfirmasi Password</label>
        <input
          :type="toggleConfirmPassword ? 'text' : 'password'"
          v-model="formData.confirm_password"
          class="form-control"
          id="confirm_password"
        />
        <i
          :class="['ti icon', toggleConfirmPassword ? 'ti-eye' : 'ti-eye-off']"
          @click="toggleConfirmPassword = !toggleConfirmPassword"
        ></i>
      </div>
      <button
        :disabled="disabledSubmit"
        type="submit"
        class="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2"
      >
        Sign Up
      </button>
      <div class="d-flex align-items-center justify-content-center">
        <p class="fs-4 mb-0 fw-bold">Sudah Punya Akun?</p>
        <router-link class="text-primary fw-bold ms-2" to="/login">Login</router-link>
      </div>
    </form>
  </div>
</template>
