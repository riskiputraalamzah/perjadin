<script setup>
import { ref, onMounted } from 'vue'
import ModalItem from '@/components/ModalItem.vue'
import { useIDBStore } from '@/stores/IDB'
import Swal from 'sweetalert2'
import { Toast } from '@/components/ToastAlert'
import { useMainStore } from '@/stores/main'

const idbStore = useIDBStore()

const mainStore = useMainStore()

const objectStore = 'suratTugas'

const dataSuratTugas = ref({
  noST: '',
  tgl: '',
  uraian: ''
})

const suratTugasList = ref([])

const loading = ref(true)

// Fetch data dari IndexedDB ketika komponen di-mount
onMounted(async () => {
  if (mainStore.dataST) {
    loading.value = !loading.value
    suratTugasList.value = mainStore.dataST
    return
  }
  console.log('onmounted surat tugas')
  await fetchAndCaching()
  loading.value = !loading.value
  adjustHeight()
})

const fetchAndCaching = async () => {
  suratTugasList.value = await idbStore.fetchData(objectStore)
  mainStore.dataST = suratTugasList.value
}

const validateForm = () => {
  if (!dataSuratTugas.value.noST) {
    Toast.fire({ icon: 'error', title: 'Nomor Surat Tugas harus diisi' })
    return false
  }
  if (!dataSuratTugas.value.tgl) {
    Toast.fire({ icon: 'error', title: 'Tanggal Surat Tugas harus diisi' })
    return false
  }
  if (!dataSuratTugas.value.uraian.trim()) {
    Toast.fire({ icon: 'error', title: 'Uraian harus diisi' })
    return false
  }

  return true
}

// Fungsi untuk menyimpan data pegawai
const handleConfirm = async ({ actionType }) => {
  if (!validateForm()) return
  try {
    const jsonData = JSON.parse(JSON.stringify(dataSuratTugas.value))
    if (actionType === 'add') {
      await idbStore.addItem(objectStore, jsonData)
      Toast.fire({ icon: 'success', title: 'Data Surat Tugas berhasil ditambahkan' })
    } else if (actionType === 'edit') {
      await idbStore.updateData(objectStore, 'id', jsonData.id, jsonData)
      Toast.fire({ icon: 'success', title: 'Data Surat Tugas berhasil diubah' })
    }
    await fetchAndCaching(objectStore)
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
  dataSuratTugas.value = {
    noST: '',
    tgl: '',
    uraian: ''
  }
}

const handleDelete = async (id) => {
  // Konfirmasi dengan SweetAlert
  const result = await Swal.fire({
    title: `Hapus Data Surat Tugas?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Ya',
    cancelButtonText: 'Tidak',
    cancelButtonColor: 'red'
  })

  // Jika pengguna mengonfirmasi
  if (result.isConfirmed) {
    try {
      // Memeriksa apakah data sedang dipakai di object store lain
      const isInUse = await checkIfDataInUse(id)
      // return console.log({ isInUse })
      if (isInUse?.status) {
        // Jika data digunakan di object store lain, tampilkan notifikasi error
        Swal.fire({ icon: 'error', title: `Data gagal dihapus`, text: isInUse.message })
        return
      }

      // Menghapus item dari IndexedDB
      const deleteItem = await idbStore.deleteItemById(objectStore, id)
      // Menampilkan notifikasi sukses
      if (deleteItem) {
        Toast.fire({ icon: 'success', title: `Data ${objectStore} berhasil dihapus` })
        await fetchAndCaching(objectStore)
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
    title: 'Tambah Data Surat Tugas',
    confirmButtonText: 'Simpan',
    actionType: 'add',
    data: dataSuratTugas.value
  }
  // document.getElementById('staticBackdrop').click()
}

// Fungsi untuk menyiapkan modal edit
const openEditModal = (data) => {
  dataSuratTugas.value = { ...data }
  modalProps.value = {
    title: 'Edit Data Surat Tugas',
    confirmButtonText: 'Update',
    actionType: 'edit',
    data: dataSuratTugas.value
  }

  // document.getElementById('staticBackdrop').click()
}

const modalProps = ref({
  title: 'Tambah Data Surat Tugas',
  confirmButtonText: 'Simpan',
  actionType: 'add',
  data: {}
})

const autoResizeTextarea = ref(null) // Referensi ke textarea

// Fungsi untuk menyesuaikan tinggi textarea
const adjustHeight = () => {
  autoResizeTextarea.value.style.height = 'auto' // Reset tinggi untuk menghitung ulang
  autoResizeTextarea.value.style.height = `${autoResizeTextarea.value.scrollHeight}px` // Atur tinggi berdasarkan konten
}

// Mengambil tanggal hari ini dalam format YYYY-MM-DD
// const today = new Date()
// const year = today.getFullYear()
// const month = String(today.getMonth() + 1).padStart(2, '0') // Menambah 0 jika kurang dari 10
// const day = String(today.getDate()).padStart(2, '0') // Menambah 0 jika kurang dari 10
// const minDate = ref(`${year}-${month}-${day}`) // Format: YYYY-MM-DD

// Fungsi untuk memformat tanggal ke format Day Month Year
const formatDate = (dateString) => {
  if (!dateString) return ''

  const options = { day: 'numeric', month: 'long', year: 'numeric' }
  const date = new Date(dateString)

  return date.toLocaleDateString('id-ID', options) // 'id-ID' untuk format Indonesia
}

// Fungsi untuk memeriksa apakah data digunakan di object store lain
const checkIfDataInUse = async (id) => {
  try {
    const otherStores = ['delegasiPegawai', 'spm']

    for (const store of otherStores) {
      const data = await idbStore.fetchData(store) // Mendapatkan semua data dari object store

      // Jika object store adalah 'delegasiPegawai'
      if (store === 'delegasiPegawai') {
        const isUsed = data.some((item) => item.noST.id === id)
        if (isUsed)
          return { status: true, message: 'Data sedang digunakan pada menu Delegasi Pegawai' } // Jika ditemukan, data sedang digunakan
      }

      // Jika object store adalah 'spm'
      if (store === 'spm') {
        const isUsed = data.some((item) =>
          item.selectedST.some((selectedItemSt) => selectedItemSt.noST.id === id)
        )
        if (isUsed) return { status: true, message: 'Data sedang digunakan pada menu SPM' } // Jika ditemukan, data sedang digunakan
      }
    }

    // Jika tidak ditemukan di object store lain, berarti data tidak digunakan
    return false
  } catch (error) {
    console.error('Error checking if data is in use:', error)
    return false // Jika terjadi error, anggap data tidak sedang digunakan
  }
}
</script>

<template>
  <div>
    <h1 class="text-dark fw-bold mb-4">List Surat Tugas</h1>

    <!-- Tombol untuk membuka modal -->
    <button
      type="button"
      class="btn btn-primary mb-4"
      @click="openAddModal"
      :disabled="loading"
      data-bs-toggle="modal"
      data-bs-target="#staticBackdrop"
    >
      Tambah Data
    </button>
    <div class="table-responsive">
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">No ST</th>
            <th scope="col">Tanggal ST</th>
            <th scope="col">Uraian ST</th>

            <th scope="col" class="text-center">Action</th>
          </tr>
        </thead>
        <tbody v-if="suratTugasList.length > 0">
          <tr v-for="(st, key) in suratTugasList" :key="key">
            <td v-text="st.noST"></td>
            <td v-text="formatDate(st.tgl)"></td>
            <td v-text="st.uraian" style="text-wrap: wrap; text-align: left"></td>

            <td class="text-center">
              <button class="btn-danger btn btn-sm" @click="handleDelete(st.id)">Hapus</button>
              <button
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                class="btn-sm btn-warning btn"
                @click="openEditModal(st)"
              >
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
            <label for="noST" class="form-label">Nomor Surat Tugas</label>
            <input v-model="dataSuratTugas.noST" type="text" class="form-control" id="noST" />
          </div>
          <div class="mb-3">
            <label for="tgl" class="form-label">Tanggal Surat Tugas</label>
            <input v-model="dataSuratTugas.tgl" type="date" class="form-control" id="tgl" />
          </div>
          <div class="mb-3">
            <label for="uraian" class="form-label">Uraian</label>

            <textarea
              id="uraian"
              v-model="dataSuratTugas.uraian"
              class="form-control"
              placeholder="Isikan detail uraian penugasannya..."
              rows="1"
              ref="autoResizeTextarea"
              @input="adjustHeight"
            ></textarea>
          </div>
        </form>
      </template>
    </ModalItem>
  </div>
</template>
<style scoped>
textarea {
  overflow: hidden; /* Menghilangkan scrollbar */
  resize: none; /* Menonaktifkan resize manual */
}
</style>
