<script setup>
import { ref, onMounted } from 'vue'

import { useIDBStore } from '@/stores/IDB'
import Swal from 'sweetalert2'
import { Toast } from '@/components/ToastAlert'

const idbStore = useIDBStore()

const objectStore = 'spm'

const listSPM = ref([])

const loading = ref(true)

import { useMainStore } from '@/stores/main'
const mainStore = useMainStore()
const fetchAndCaching = async () => {
  listSPM.value = await idbStore.fetchData(objectStore)
  mainStore.dataSPM = listSPM.value
}
onMounted(async () => {
  console.log(mainStore)
  if (mainStore.dataSPM) {
    loading.value = !loading.value
    listSPM.value = mainStore.dataSPM
    return
  }
  await fetchAndCaching()
  loading.value = !loading.value
})

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
        Toast.fire({ icon: 'success', title: `Data berhasil dihapus` })
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

// Fungsi untuk memeriksa apakah data digunakan di object store lain
const checkIfDataInUse = async (id) => {
  try {
    const otherStores = ['sp2d']

    for (const store of otherStores) {
      const data = await idbStore.fetchData(store) // Mendapatkan semua data dari object store

      // Jika object store adalah 'delegasiPegawai'

      const isUsed = data.some((item) => item.spm.id === id)
      if (isUsed) return { status: true, message: 'Data sedang digunakan pada menu SP2D' } // Jika ditemukan, data sedang digunakan
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
  </div>
</template>
