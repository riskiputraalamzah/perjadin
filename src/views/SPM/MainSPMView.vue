<script setup>
import { ref, onMounted } from 'vue'
import ModalItem from '@/components/ModalItem.vue'
import { useIDBStore } from '@/stores/IDB'
import Swal from 'sweetalert2'
import { Toast } from '@/components/ToastAlert'

const idbStore = useIDBStore()

const objectStore = 'spm'

const dataSPM = ref({
  noSPM: '',
  tgl: '',
  nilaiSPM: ''
})

const listSPM = ref([])

const loading = ref(true)

// Fetch data dari IndexedDB ketika komponen di-mount
onMounted(async () => {
  console.log('onmounted spm')
  listSPM.value = await idbStore.fetchData(objectStore)
  loading.value = !loading.value
})

const validateForm = () => {
  if (!dataSPM.value.noSPM) {
    Toast.fire({ icon: 'error', title: 'Nomor SPM harus diisi' })
    return false
  }
  if (!dataSPM.value.tgl) {
    Toast.fire({ icon: 'error', title: 'Tanggal SPM harus diisi' })
    return false
  }
  if (!dataSPM.value.nilaiSPM) {
    Toast.fire({ icon: 'error', title: 'Nilai SPM harus diisi' })
    return false
  }

  return true
}

// Fungsi untuk menyimpan data pegawai
const handleConfirm = async ({ actionType }) => {
  if (!validateForm()) return
  try {
    const jsonData = JSON.parse(JSON.stringify(dataSPM.value))
    if (actionType === 'add') {
      await idbStore.addItem(objectStore, jsonData)
      Toast.fire({ icon: 'success', title: 'Data Surat Tugas berhasil ditambahkan' })
    } else if (actionType === 'edit') {
      await idbStore.updateData(objectStore, 'id', jsonData.id, jsonData)
      Toast.fire({ icon: 'success', title: 'Data Surat Tugas berhasil diubah' })
    }
    listSPM.value = await idbStore.fetchData(objectStore)
    resetForm()

    // Menutup modal menggunakan Bootstrap Modal API
    const modalElement = document.getElementById('staticBackdrop')
    const modalInstance = window.bootstrap.Modal.getInstance(modalElement)
    if (modalInstance) {
      modalInstance.hide() // Menutup modal
    }

    // Hapus backdrop secara manual jika masih ada
    const backdrop = document.querySelector('.modal-backdrop')
    if (backdrop) {
      backdrop.remove()
    }
  } catch (error) {
    console.error('Error:', error)
    Toast.fire({ icon: 'error', title: 'Terjadi kesalahan' })
  }
}

// Reset form setelah data disimpan
const resetForm = () => {
  dataSPM.value = {
    noSPM: '',
    tgl: '',
    nilaiSPM: ''
  }
}

const handleDelete = async (id) => {
  // Konfirmasi dengan SweetAlert
  const result = await Swal.fire({
    title: `Hapus Data?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Ya',
    cancelButtonText: 'Tidak',
    cancelButtonColor: 'red'
  })

  // Jika pengguna mengonfirmasi
  if (result.isConfirmed) {
    try {
      // Menghapus item dari IndexedDB
      const deleteItem = await idbStore.deleteItemById(objectStore, id)

      // Menampilkan notifikasi sukses
      if (deleteItem) {
        Toast.fire({ icon: 'success', title: `Data berhasil dihapus` })
        listSPM.value = await idbStore.fetchData(objectStore)
      } else {
        Toast.fire({ icon: 'error', title: 'Gagal menghapus data' })
      }
    } catch (error) {
      console.error('Error deleting item:', error)
      Toast.fire({ icon: 'error', title: 'Terjadi kesalahan saat menghapus data' })
    }
  }
}

const openAddModal = () => {
  resetForm()
  modalProps.value = {
    title: 'Tambah Data',
    confirmButtonText: 'Simpan',
    actionType: 'add',
    data: dataSPM.value
  }
  // document.getElementById('staticBackdrop').click()
}

// Fungsi untuk menyiapkan modal edit
const openEditModal = (data) => {
  dataSPM.value = { ...data }
  modalProps.value = {
    title: 'Edit Data',
    confirmButtonText: 'Update',
    actionType: 'edit',
    data: dataSPM.value
  }

  // document.getElementById('staticBackdrop').click()
}

const modalProps = ref({
  title: 'Tambah Data',
  confirmButtonText: 'Simpan',
  actionType: 'add',
  data: {}
})
</script>

<template>
  <div>
    <h1 class="text-dark fw-bold mb-4">List Surat Perintah Membayar</h1>

    <!-- Tombol untuk membuka modal -->
    <router-link to="/spm/create" class="btn btn-primary mb-4" :disabled="loading">
      Tambah Data
    </router-link>
    <div class="table-responsive">
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">No SPM</th>
            <th scope="col">Tanggal SPM</th>
            <th scope="col">Nilai ST</th>
            <th scope="col" class="text-center">Action</th>
          </tr>
        </thead>
        <tbody v-if="listSPM.length > 0">
          <tr v-for="(st, key) in listSPM" :key="key">
            <td v-text="st.noSPM"></td>
            <td v-text="formatDate(st.tglSPM)"></td>
            <td v-text="formatRupiah(st.nilaiSPM)"></td>

            <td class="text-center">
              <button class="btn-danger btn btn-sm" @click="handleDelete(st.id)">Hapus</button>
              <button class="btn-sm btn-warning btn" @click="$router.push(`/spm/${st.id}/edit`)">
                Edit
              </button>
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td colspan="6" class="text-center">
              {{ loading ? 'Loading Data...' : 'Data masih kosong' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Tambah/Edit data -->
    <ModalItem
      :title="modalProps.title"
      :confirmButtonText="modalProps.confirmButtonText"
      :actionType="modalProps.actionType"
      :data="modalProps.data"
      @confirm="handleConfirm"
    >
      <template #body>
        <form @submit.prevent="handleConfirm">
          <div class="mb-3">
            <label for="noST" class="form-label">Nomor SPM</label>
            <input v-model="dataSPM.noSPM" type="text" class="form-control" id="noST" />
          </div>
          <div class="mb-3">
            <label for="tgl" class="form-label">Tanggal SPM</label>
            <input v-model="dataSPM.tgl" type="date" class="form-control" id="tgl" />
          </div>
          <div class="mb-3">
            <label for="nilaiSPM" class="form-label">Nilai SPM</label>
            <input
              v-model="dataSPM.noSPM"
              readonly
              type="text"
              class="form-control"
              id="nilaiSPM"
            />
          </div>
        </form>
      </template>
    </ModalItem>
  </div>
</template>
