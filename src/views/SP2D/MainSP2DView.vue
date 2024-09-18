<script setup>
import { ref, onMounted } from 'vue'
import { useIDBStore } from '@/stores/IDB'
import Swal from 'sweetalert2'
import { Toast } from '@/components/ToastAlert'
// import jsPDF from 'jspdf'
// import html2canvas from 'html2canvas'
// import debounce from 'lodash/debounce'

// const { proxy } = getCurrentInstance()

const idbStore = useIDBStore()
const objectStore = 'sp2d'
const listSP2D = ref([])
const loading = ref(true)
// const isPrinting = ref(false)

import { useMainStore } from '@/stores/main'
const mainStore = useMainStore()

const fetchAndCaching = async () => {
  listSP2D.value = await idbStore.fetchData(objectStore)
  mainStore.dataSP2D = listSP2D.value
}

onMounted(async () => {
  if (mainStore.dataSP2D) {
    loading.value = !loading.value
    listSP2D.value = mainStore.dataSP2D
    return
  }
  await fetchAndCaching()
  loading.value = !loading.value
})

const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: `Hapus Data?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Ya',
    cancelButtonText: 'Tidak',
    cancelButtonColor: 'red'
  })

  if (result.isConfirmed) {
    try {
      const deleteItem = await idbStore.deleteItemById(objectStore, id)

      if (deleteItem) {
        Toast.fire({ icon: 'success', title: `Data berhasil dihapus` })
        await fetchAndCaching()
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
  <div>
    <h1 class="text-dark fw-bold mb-4">List Surat Perintah Pencairan Dana</h1>

    <router-link to="/sp2d/create" class="btn btn-primary mb-4" :disabled="loading">
      Tambah Data
    </router-link>

    <div class="table-responsive">
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">No SP2D</th>
            <th scope="col">Tanggal SP2D</th>
            <th scope="col">Meta Anggaran</th>
            <th scope="col">NO SPM</th>
            <th scope="col" class="text-center">Action</th>
          </tr>
        </thead>

        <tbody v-if="listSP2D.length > 0">
          <tr v-for="(row, key) in listSP2D" :key="key">
            <td v-text="row.noSP2D"></td>
            <td v-text="formatDate(row.tglSP2D)"></td>
            <td v-text="row.metaAnggaran"></td>
            <td v-text="row.spm.noSPM"></td>

            <td class="text-center">
              <button class="btn-danger btn btn-sm" @click="handleDelete(row.id)">Hapus</button>
              <button class="btn-sm btn-warning btn" @click="$router.push(`/sp2d/${row.id}/edit`)">
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
