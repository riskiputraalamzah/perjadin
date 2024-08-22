<script setup>
import { useAuthStore } from '@/stores/Auth'

const loginStore = useAuthStore()
const formData = loginStore.loginForm

const handleSubmit = () => {
  loginStore.setLoginFormData(loginStore.formData)

  loginStore.resetLoginForm()
}
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
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          required
          v-model="formData.username"
          aria-describedby="emailHelp"
        />
        <!-- <span class="text-danger small">maaf</span> -->
      </div>
      <div class="mb-4">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          required
          v-model="formData.password"
          id="exampleInputPassword1"
        />
      </div>
      <div class="d-flex align-items-center justify-content-between mb-4">
        <div class="form-check">
          <input
            class="form-check-input primary"
            type="checkbox"
            value=""
            id="flexCheckChecked"
            checked
          />
          <label class="form-check-label text-dark" for="flexCheckChecked">
            Remeber this Device
          </label>
        </div>
        <a class="text-primary fw-bold" href="./index.html">Forgot Password ?</a>
      </div>
      <button type="submit" class="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">Sign In</button>
      <div class="d-flex align-items-center justify-content-center">
        <p class="fs-4 mb-0 fw-bold">Anda Belum Punya Akun?</p>

        <router-link class="text-primary fw-bold ms-2" to="/register">Daftar disini</router-link>
      </div>
    </form>
  </div>
</template>
