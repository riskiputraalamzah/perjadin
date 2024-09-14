<script setup>
import { ref, onMounted } from 'vue'
import ModalItem from '@/components/ModalItem.vue'
import { useIDBStore } from '@/stores/IDB'
import Swal from 'sweetalert2'
import { Toast } from '@/components/ToastAlert'

const idbStore = useIDBStore()

const objectStore = 'sppd'

const dataSPPD = ref({
  noSPPD: '',
  tgl: '',
  tujuan: '',
  tglBerangkat: '',
  tglPulang: '',
  lamaPenugasan: ''
})

// Reset form setelah data disimpan
const resetForm = () => {
  dataSPPD.value = {
    noSPPD: '',
    tgl: '',
    tujuan: '',
    tglBerangkat: '',
    tglPulang: '',
    lamaPenugasan: ''
  }
}

const openAddModal = () => {
  resetForm()
  modalProps.value = {
    title: 'Tambah Data SPPD',
    confirmButtonText: 'Simpan',
    actionType: 'add',
    data: dataSPPD.value
  }
}

// Fungsi untuk menyiapkan modal edit
const openEditModal = (data) => {
  dataSPPD.value = { ...data }
  modalProps.value = {
    title: 'Edit Data SPPD',
    confirmButtonText: 'Update',
    actionType: 'edit',
    data: dataSPPD.value
  }
}

const modalProps = ref({
  title: 'Tambah Data SPPD',
  confirmButtonText: 'Simpan',
  actionType: 'add',
  data: {}
})

const SPPDList = ref([])
const loading = ref(true)

import { useMainStore } from '@/stores/main'
const mainStore = useMainStore()
const fetchAndCaching = async () => {
  SPPDList.value = await idbStore.fetchData(objectStore)
  mainStore.dataSPPD = SPPDList.value
}
onMounted(async () => {
  if (mainStore.dataSPPD) {
    loading.value = !loading.value
    SPPDList.value = mainStore.dataSPPD
    return
  }
  await fetchAndCaching()
  loading.value = !loading.value
})
const validateForm = () => {
  if (!dataSPPD.value.noSPPD) {
    Toast.fire({ icon: 'error', title: 'Nomor SPPD harus diisi' })
    return false
  }
  if (!dataSPPD.value.tgl) {
    Toast.fire({ icon: 'error', title: 'Tanggal SPPD harus diisi' })
    return false
  }
  if (!dataSPPD.value.tujuan.trim()) {
    Toast.fire({ icon: 'error', title: 'Tujuan harus diisi' })
    return false
  }
  if (!dataSPPD.value.tglBerangkat) {
    Toast.fire({ icon: 'error', title: 'Tanggal keberangkatan harus diisi' })
    return false
  }
  if (!dataSPPD.value.tglPulang) {
    Toast.fire({ icon: 'error', title: 'Tanggal pulang harus diisi' })
    return false
  }
  if (new Date(dataSPPD.value.tglPulang) <= new Date(dataSPPD.value.tglBerangkat)) {
    Toast.fire({
      icon: 'error',
      title: 'Tanggal pulang harus lebih besar dari tanggal keberangkatan'
    })
    return false
  }
  if (!dataSPPD.value.lamaPenugasan) {
    Toast.fire({ icon: 'error', title: 'Lama penugasan harus diisi' })
    return false
  }
  return true
}

const handleConfirm = async ({ actionType }) => {
  if (!validateForm()) return
  try {
    const jsonData = JSON.parse(JSON.stringify(dataSPPD.value))
    if (actionType === 'add') {
      await idbStore.addItem(objectStore, jsonData)
      Toast.fire({ icon: 'success', title: 'Data SPPD berhasil ditambahkan' })
    } else if (actionType === 'edit') {
      await idbStore.updateData(objectStore, 'id', jsonData.id, jsonData)
      Toast.fire({ icon: 'success', title: 'Data SPPD berhasil diubah' })
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

const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: `Hapus Data SPPD?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Ya',
    cancelButtonText: 'Tidak',
    cancelButtonColor: 'red'
  })

  if (result.isConfirmed) {
    try {
      const isInUse = await checkIfDataInUse(id)

      // return console.log({ isInUse })
      if (isInUse?.status) {
        // Jika data digunakan di object store lain, tampilkan notifikasi error
        Swal.fire({ icon: 'error', title: `Data gagal dihapus`, text: isInUse.message })
        return
      }

      const deleteItem = await idbStore.deleteItemById(objectStore, id)
      if (deleteItem) {
        Toast.fire({ icon: 'success', title: `Data SPPD berhasil dihapus` })
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

const checkIfDataInUse = async (id) => {
  try {
    // Misal ada beberapa object store lain seperti 'otherStore1' dan 'otherStore2'
    const otherStores = ['delegasiPegawai']

    for (const store of otherStores) {
      const data = await idbStore.fetchData(store) // Mendapatkan semua data dari object store

      // Periksa apakah data di dalam object store berbentuk array of objects

      console.log({ dataarray: data, id })
      // Jika array, periksa apakah ada object di dalam array yang memiliki ID yang sama
      const isUsed = data.some((item) =>
        item.relation?.some((relationItem) => relationItem.noSPPD?.id === id)
      )
      if (isUsed)
        return { status: true, message: 'Data sedang digunakan pada menu Delegasi Pegawai' } // Jika ditemukan, data sedang digunakan
    }

    // Jika tidak ditemukan di object store lain, berarti data tidak digunakan
    return false
  } catch (error) {
    console.error('Error checking if data is in use:', error)
    return false // Jika terjadi error, anggap data tidak sedang digunakan
  }
}
// Menentukan tanggal minimal untuk tanggal pulang
const handleTglBerangkatChange = () => {
  if (dataSPPD.value.tglBerangkat) {
    minTglPulang.value = new Date(dataSPPD.value.tglBerangkat)
    minTglPulang.value.setDate(minTglPulang.value.getDate() + 1)
    minTglPulang.value = minTglPulang.value.toISOString().split('T')[0]

    // Jika tanggal pulang sebelumnya lebih kecil dari tanggal berangkat yang baru dipilih
    if (
      dataSPPD.value.tglPulang &&
      new Date(dataSPPD.value.tglPulang) <= new Date(dataSPPD.value.tglBerangkat)
    ) {
      dataSPPD.value.tglPulang = '' // Kosongkan tanggal pulang
      dataSPPD.value.lamaPenugasan = '' // Kosongkan lama penugasan
    }
  } else {
    dataSPPD.value.tglPulang = ''
    dataSPPD.value.lamaPenugasan = ''
  }
}

// Menghitung lama penugasan berdasarkan selisih tanggal pulang dan tanggal keberangkatan
const calculateLamaPenugasan = () => {
  if (dataSPPD.value.tglBerangkat && dataSPPD.value.tglPulang) {
    const tglBerangkat = new Date(dataSPPD.value.tglBerangkat)
    const tglPulang = new Date(dataSPPD.value.tglPulang)
    const diffTime = Math.abs(tglPulang - tglBerangkat)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    dataSPPD.value.lamaPenugasan = diffDays
  } else {
    dataSPPD.value.lamaPenugasan = ''
  }
}

// Fungsi untuk memformat tanggal ke format Day Month Year
const formatDate = (dateString) => {
  if (!dateString) return ''

  const options = { day: 'numeric', month: 'long', year: 'numeric' }
  const date = new Date(dateString)

  return date.toLocaleDateString('id-ID', options) // 'id-ID' untuk format Indonesia
}

// const minDate = new Date().toISOString().split('T')[0]
const minTglPulang = ref('')
</script>

<template>
  <div>
    <h1 class="text-dark fw-bold mb-4">List Surat Perintah Perjalanan Dinas</h1>

    <!-- Tombol untuk membuka modal -->
    <button
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
            <th scope="col">No SPPD</th>
            <th scope="col">Tanggal SPPD</th>
            <th scope="col">Tujuan</th>
            <th scope="col">Tgl Berangkat</th>
            <th scope="col">Tgl Pulang</th>
            <th scope="col">Lama Penugasan</th>
            <th scope="col" class="text-center">Action</th>
          </tr>
        </thead>
        <tbody v-if="SPPDList.length > 0">
          <tr v-for="(st, key) in SPPDList" :key="key">
            <td v-text="st.noSPPD"></td>
            <td v-text="formatDate(st.tgl)"></td>
            <td v-text="st.tujuan"></td>
            <td v-text="formatDate(st.tglBerangkat)"></td>
            <td v-text="formatDate(st.tglPulang)"></td>
            <td v-text="st.lamaPenugasan + ' Hari'"></td>

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
            <td colspan="7" class="text-center">
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
            <label for="noSPPD" class="form-label">Nomor SPPD</label>
            <input v-model="dataSPPD.noSPPD" type="text" class="form-control" id="noSPPD" />
          </div>
          <div class="mb-3">
            <label for="tgl" class="form-label">Tanggal SPPD</label>
            <input v-model="dataSPPD.tgl" type="date" class="form-control" id="tgl" />
          </div>
          <div class="mb-3">
            <label for="uraian" class="form-label">Tujuan</label>
            <input id="uraian" v-model="dataSPPD.tujuan" class="form-control" type="text" />
          </div>
          <div class="mb-3">
            <label for="tglBerangkat" class="form-label">Tanggal Keberangkatan</label>
            <input
              v-model="dataSPPD.tglBerangkat"
              type="date"
              class="form-control"
              id="tglBerangkat"
              @change="handleTglBerangkatChange"
            />
          </div>
          <div class="mb-3">
            <label for="tglPulang" class="form-label">Tanggal Pulang</label>
            <input
              v-model="dataSPPD.tglPulang"
              type="date"
              :min="minTglPulang"
              class="form-control"
              id="tglPulang"
              :disabled="!dataSPPD.tglBerangkat"
              @change="calculateLamaPenugasan"
            />
          </div>
          <div class="mb-3">
            <label for="lamaPenugasan" class="form-label">Lama Penugasan (Hari)</label>
            <input
              v-model="dataSPPD.lamaPenugasan"
              type="text"
              class="form-control"
              id="lamaPenugasan"
              readonly
            />
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
