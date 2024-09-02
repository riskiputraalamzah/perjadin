<script setup>
import { ref, onMounted } from 'vue'
import ModalItem from '@/components/ModalItem.vue'
import { useIDBStore } from '@/stores/IDB'
import Swal from 'sweetalert2'
import { Toast } from '@/components/ToastAlert'

const idbStore = useIDBStore()

const objectStore = 'pegawai'

const dataPegawai = ref({
  namaPegawai: '',
  nip: '',
  golongan: '',
  jabatan: ''
})

const pegawaiList = ref([])

const loading = ref(true)

// Fetch data dari IndexedDB ketika komponen di-mount
onMounted(async () => {
  console.log('onmounted pegawai')
  pegawaiList.value = await idbStore.fetchData(objectStore)
  loading.value = !loading.value
})

const validateForm = () => {
  if (!dataPegawai.value.namaPegawai) {
    Toast.fire({ icon: 'error', title: 'Nama Pegawai harus diisi' })
    return false
  }
  if (!dataPegawai.value.nip) {
    Toast.fire({ icon: 'error', title: 'NIP harus diisi' })
    return false
  }
  if (!dataPegawai.value.golongan) {
    Toast.fire({ icon: 'error', title: 'Golongan harus diisi' })
    return false
  }
  if (!dataPegawai.value.jabatan) {
    Toast.fire({ icon: 'error', title: 'Jabatan harus diisi' })
    return false
  }

  return true
}

// Fungsi untuk menyimpan data pegawai
const handleConfirm = async ({ actionType }) => {
  if (!validateForm()) return
  try {
    const jsonData = JSON.parse(JSON.stringify(dataPegawai.value))
    if (actionType === 'add') {
      await idbStore.addItem(objectStore, jsonData)
      Toast.fire({ icon: 'success', title: 'Data Pegawai berhasil ditambahkan' })
    } else if (actionType === 'edit') {
      await idbStore.updateData(objectStore, 'id', jsonData.id, jsonData)
      Toast.fire({ icon: 'success', title: 'Data Pegawai berhasil diubah' })
    }
    pegawaiList.value = await idbStore.fetchData(objectStore)
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
  dataPegawai.value = {
    namaPegawai: '',
    nip: '',
    golongan: '',
    jabatan: ''
  }
}

const handleDelete = async (id) => {
  // Konfirmasi dengan SweetAlert
  const result = await Swal.fire({
    title: `Hapus Data ${objectStore}?`,
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
        Toast.fire({ icon: 'success', title: `Data ${objectStore} berhasil dihapus` })
        pegawaiList.value = await idbStore.fetchData(objectStore)
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
    title: 'Tambah Data Pegawai',
    confirmButtonText: 'Simpan',
    actionType: 'add',
    data: dataPegawai.value
  }
}

// Fungsi untuk menyiapkan modal edit
const openEditModal = (pegawai) => {
  dataPegawai.value = { ...pegawai }
  modalProps.value = {
    title: 'Edit Data Pegawai',
    confirmButtonText: 'Update',
    actionType: 'edit',
    data: dataPegawai.value
  }
}

const modalProps = ref({
  title: 'Tambah Data Pegawai',
  confirmButtonText: 'Simpan',
  actionType: 'add',
  data: {}
})
</script>

<template>
  <div>
    <h1 class="text-dark fw-bold mb-4">List Pegawai</h1>

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
            <th scope="col">No</th>
            <th scope="col">Nama</th>
            <th scope="col">NIP</th>
            <th scope="col">Golongan</th>
            <th scope="col">Jabatan</th>
            <th scope="col" class="text-center">Action</th>
          </tr>
        </thead>
        <tbody v-if="pegawaiList.length > 0">
          <tr v-for="(pegawai, key) in pegawaiList" :key="key">
            <td v-text="key + 1"></td>
            <td v-text="pegawai.namaPegawai"></td>
            <td v-text="pegawai.nip"></td>
            <td v-text="pegawai.golongan"></td>
            <td v-text="pegawai.jabatan"></td>
            <td class="text-center">
              <button class="btn-danger btn btn-sm" @click="handleDelete(pegawai.id)">Hapus</button>
              <button
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                class="btn-sm btn-warning btn"
                @click="openEditModal(pegawai)"
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
            <label for="namaPegawai" class="form-label">Nama Pegawai</label>
            <input
              v-model="dataPegawai.namaPegawai"
              type="text"
              class="form-control"
              id="namaPegawai"
            />
          </div>
          <div class="mb-3">
            <label for="NIP" class="form-label">NIP</label>
            <input v-model="dataPegawai.nip" type="text" class="form-control" id="NIP" />
          </div>
          <div class="mb-3">
            <label for="Golongan" class="form-label">Golongan</label>
            <input v-model="dataPegawai.golongan" type="text" class="form-control" id="Golongan" />
          </div>
          <div class="mb-3">
            <label for="jabatan" class="form-label">Jabatan</label>
            <input v-model="dataPegawai.jabatan" type="text" class="form-control" id="jabatan" />
          </div>
        </form>
      </template>
    </ModalItem>
  </div>
</template>
