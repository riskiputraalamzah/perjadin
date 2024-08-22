<script setup>
import { useAuthStore } from '@/stores/Auth'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { computed, ref } from 'vue'

const loginStore = useAuthStore()
const formData = computed(() => loginStore.loginForm)

const router = useRouter()

const handleSubmit = async () => {
  disabledSubmit.value = !disabledSubmit.value //ubah ke true
  const storeData = await loginStore.setLoginFormData(formData.value)
  if (!storeData.success) {
    Swal.fire(storeData.alert)
    disabledSubmit.value = !disabledSubmit.value //ubah ke false

    return loginStore.resetLoginForm()
  }
  disabledSubmit.value = !disabledSubmit.value //ubah ke true

  Swal.fire(storeData.alert)
  router.push('/')
}

const disabledSubmit = ref(false)
</script>
<template>
  <div class="card-body">
    <router-link class="text-nowrap logo-img text-center d-block py-3 w-100" to="/login"
      ><img src="/assets/images/gmbr_3.png" width="180" alt=""
    /></router-link>
    <p class="text-center fw-bold display-6 text-dark">Login</p>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Username</label>
        <input
          type="text"
          class="form-control"
          required
          id="exampleInputEmail1"
          v-model="formData.username"
          aria-describedby="emailHelp"
        />
        <!-- <span class="text-danger small">maaf</span> -->
      </div>
      <div class="mb-4">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input
          type="password"
          required
          class="form-control"
          v-model="formData.password"
          id="exampleInputPassword1"
        />
      </div>

      <button
        :disabled="disabledSubmit"
        type="submit"
        class="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2"
      >
        Sign In
      </button>
      <div class="d-flex align-items-center justify-content-center">
        <p class="fs-4 mb-0 fw-bold">Anda Belum Punya Akun?</p>

        <router-link class="text-primary fw-bold ms-2" to="/register">Daftar disini</router-link>
      </div>
    </form>
  </div>
</template>
