<script setup>
import Swal from 'sweetalert2'
import { ref, watch, onMounted } from 'vue'
import { useIDBStore } from '@/stores/IDB'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/Auth'

const authStore = useAuthStore()

const router = useRouter()
const idbStore = useIDBStore()

const userData = ref({})
const defaultUrl = ref(null)

const imageSrc = ref(null)
const namaLengkap = ref(null)

const disabledSubmit = ref(true)

const errorMessage = ref(null)
const selectedImage = ref(null)

// Fungsi yang dipanggil saat file dipilih
const onFileChange = (event) => {
  errorMessage.value = null
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    // Cek apakah ukuran file lebih besar dari 2MB (2 * 1024 * 1024 bytes)
    if (file.size > 2 * 1024 * 1024) {
      errorMessage.value = 'Ukuran file terlalu besar. Maksimal 2MB.'
      imageSrc.value = defaultUrl.value
      return (event.target.value = null)
    }
    errorMessage.value = null
    imageSrc.value = URL.createObjectURL(file)

    selectedImage.value = file
  } else {
    // Reset preview jika file bukan gambar

    imageSrc.value = defaultUrl.value
  }
}
watch([imageSrc, namaLengkap], () => {
  if (imageSrc.value == defaultUrl.value && namaLengkap.value == userData.value.name) {
    return (disabledSubmit.value = true)
  }
  disabledSubmit.value = false
})

const handleSubmit = async () => {
  if (namaLengkap.value == '') {
    namaLengkap.value = userData.value.name
    return Swal.fire({ icon: 'error', title: 'Nama Lengkap tidak boleh kosong' })
  }

  const data = {
    ...(selectedImage.value ? { file: selectedImage.value } : {}),
    name: namaLengkap.value
  }

  // console.log({ data })
  const userUpdated = await idbStore.updateData('users', 'id', userData.value.id, data)
  // console.log(userUpdated)
  delete userUpdated.file
  idbStore.updateUserLocalStorage(userUpdated)

  Swal.fire({
    icon: 'success',
    title: 'Profile Anda berhasil di ubah'
  })
  router.push('/profile')
}

onMounted(async () => {
  // Menunggu hingga getUser resolve
  const { row, avatar } = await authStore.getUser()

  userData.value = row
  defaultUrl.value = avatar

  imageSrc.value = avatar
  namaLengkap.value = row.name
})
</script>
<template>
  <div class="card">
    <h4 class="card-header text-dark fw-bold">Edit Profile</h4>

    <div class="card-body">
      <form @submit.prevent="handleSubmit">
        <div class="row g-4 align-items-center">
          <div class="col-md-3 col-4">
            <img
              :src="imageSrc"
              class="card-img-top ratio ratio-1x1 object-fit-fill img-thumbnail"
            />
            <!-- Tampilkan pesan jika file terlalu besar -->
            <p v-if="errorMessage" class="text-danger fs-3">{{ errorMessage }}</p>
          </div>
          <div class="col-md-9 col-8">
            <div>
              <label for="formFile" class="form-label">Pilih Foto</label>
              <input
                @change="onFileChange"
                accept="image/*"
                class="form-control"
                type="file"
                id="formFile"
              />
            </div>
          </div>

          <div class="col-12">
            <div>
              <label for="namaLengkap" class="form-label">Nama Lengkap</label>
              <input type="text" v-model="namaLengkap" class="form-control" id="namaLengkap" />
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-end mt-4">
          <router-link class="btn btn-outline-primary me-3" to="/profile">Back</router-link>
          <button type="submit" class="btn btn-warning" :disabled="disabledSubmit">Update</button>
        </div>
      </form>
    </div>
  </div>
</template>
