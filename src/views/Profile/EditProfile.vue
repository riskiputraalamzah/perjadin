<script setup>
const imageSrc = new URL('/assets/images/user-1.jpg', import.meta.url).href
</script>
<template>
  <div class="card">
    <h4 class="card-header text-dark fw-bold">Edit Profile</h4>

    <div class="card-body">
      <form>
        <div class="row g-4 align-items-center">
          <div class="col-md-3 col-4">
            <img
              :src="imageSrc"
              class="card-img-top ratio ratio-1x1 object-fit-fill img-thumbnail"
            />
          </div>
          <div class="col-md-9 col-8">
            <div>
              <label for="formFile" class="form-label">Pilih Foto</label>
              <input class="form-control" type="file" id="formFile" />
            </div>
          </div>

          <div class="col-12">
            <div>
              <label for="namaLengkap" class="form-label">Nama Lengkap</label>
              <input type="text" class="form-control" id="namaLengkap" />
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-end mt-4">
          <router-link class="btn btn-outline-primary me-3" to="/profile">Back</router-link>
          <button @submit.prevent type="submit" class="btn btn-warning">Update</button>
        </div>
      </form>
    </div>
  </div>
</template>
