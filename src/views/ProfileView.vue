<script setup>
import { ref } from 'vue'

const userData = JSON.parse(localStorage.getItem('user'))

const data = ref({
  name: userData.name,
  role: userData.role,
  username: userData.username
})
</script>
<template>
  <div class="row g-4">
    <div class="col-lg-4">
      <div class="card">
        <h4 class="card-header text-dark fw-bold d-flex justify-content-between align-items-center">
          <span>My Profile</span>
          <span class="badge text-bg-success text-uppercase fs-1" v-text="data.role"></span>
        </h4>

        <img
          src="/assets/images/profile/user-1.jpg"
          class="card-img-top ratio ratio-1x1 object-fit-fill img-thumbnail"
          alt="..."
        />
        <div class="card-body text-center">
          <h5 class="card-title fw-bold mb-5" v-text="data.name"></h5>

          <a href="#" class="btn btn-warning">Edit</a>
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
              <input
                type="text"
                class="form-control"
                id="username"
                v-model="data.username"
                readonly
              />
            </div>
            <div class="mb-3">
              <label for="passwordLama" class="form-label">Password Lama</label>
              <input type="password" class="form-control" id="passwordLama" autofocus />
            </div>
            <div class="mb-3">
              <label for="passwordbaru" class="form-label">Password Baru</label>
              <input type="password" class="form-control" id="passwordbaru" />
            </div>
            <div class="mb-3">
              <label for="confirmPasswordBaru" class="form-label">Konfirmasi Password Baru</label>
              <input type="password" class="form-control" id="confirmPasswordBaru" />
            </div>
            <button @submit.prevent type="submit" class="btn btn-primary float-end">Simpan</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
