<script setup>
import { ref, onMounted } from 'vue'

import { useIDBStore } from '@/stores/IDB'
import Swal from 'sweetalert2'
import { Toast } from '@/components/ToastAlert'

const idbStore = useIDBStore()

const objectStore = 'delegasiPegawai'

const delegasiPegawai = ref([])

const loading = ref(true)

// Fetch data dari IndexedDB ketika komponen di-mount
onMounted(async () => {
  console.log('onmounted delegasi')
  delegasiPegawai.value = await idbStore.fetchData(objectStore)
  loading.value = !loading.value
})

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
        delegasiPegawai.value = await idbStore.fetchData(objectStore)
      } else {
        Toast.fire({ icon: 'error', title: 'Gagal menghapus data' })
      }
    } catch (error) {
      console.error('Error deleting item:', error)
      Toast.fire({ icon: 'error', title: 'Terjadi kesalahan saat menghapus data' })
    }
  }
}
</script>
<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title mb-4">List Pendelegasian Pegawai</h4>
      <!-- Tombol untuk membuka modal -->
      <router-link :to="{ name: 'addDelegasi' }" class="btn btn-primary mb-4"
        >Tambah Data</router-link
      >
      <div class="table-responsive">
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">NO ST</th>
              <th scope="col">NO SPPD</th>
              <th scope="col">Jumlah Pegawai</th>

              <th scope="col" class="text-center">Action</th>
            </tr>
          </thead>
          <tbody v-if="delegasiPegawai.length > 0">
            <tr v-for="(pegawai, key) in delegasiPegawai" :key="key">
              <td v-text="pegawai.noST"></td>
              <td v-text="pegawai.noSPPD"></td>
              <td v-text="pegawai.jumlahPegawai"></td>

              <td class="text-center">
                <button class="btn-danger btn me-2 btn-sm" @click="handleDelete(pegawai.id)">
                  Hapus
                </button>
                <button class="btn-sm btn-warning btn">Edit</button>
                <button class="btn-sm btn-info btn">Detail</button>
              </td>
            </tr>
          </tbody>

          <tbody v-else>
            <tr>
              <td colspan="4" class="text-center">
                {{ loading ? 'Loading Data...' : 'Data masih kosong' }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
