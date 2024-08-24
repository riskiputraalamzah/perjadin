<script setup>
import { ref } from 'vue'
const imageSrc = new URL('/assets/images/user-1.jpg', import.meta.url).href
const userData = ref(JSON.parse(localStorage.getItem('user')))

const authentication = ref({
  passwordLama: '',
  passwordBaru: '',
  confirmPasswordBaru: ''
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
          <form>
            <div class="mb-3">
              <label for="username" class="form-label">Username</label>
              <input type="text" class="form-control" id="username" :value="userData.username" />
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
