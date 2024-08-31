<script setup>
import { ref, onMounted, computed, toRaw } from 'vue'

import { useIDBStore } from '@/stores/IDB'
import ModalItem from '@/components/ModalItem.vue'
import Swal from 'sweetalert2'
import { Toast } from '@/components/ToastAlert'
import { useRouter } from 'vue-router'
import { useMainStore } from '@/stores/main'

const router = useRouter()

const mainStore = useMainStore()

const idbStore = useIDBStore()

const objectStore = 'delegasiPegawai'

const delegasiPegawai = ref([])

const loading = ref(true)
// Search filter
const searchST = ref('')
const STData = ref([])

const filteredST = computed(() => {
  return STData.value.length
    ? STData.value
        .filter((st) => !delegasiPegawai.value.some((used) => used.noST.noST === st.noST))
        .filter((st) => st.noST.toLowerCase().includes(searchST.value.toLowerCase()))
    : []
})

// Selected data
const selectedST = ref(null)

// Fetch data dari IndexedDB ketika komponen di-mount
onMounted(async () => {
  console.log('onmounted delegasi')
  STData.value = await idbStore.fetchData('suratTugas')
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
// Selection methods
const selectST = (st) => {
  selectedST.value = st
}

const handleConfirm = async () => {
  try {
    if (selectedST.value == null) {
      return Swal.fire({ icon: 'error', title: 'Silahkan Pilih NO ST terlebih dahulu' })
    }

    const data = { noST: toRaw(selectedST.value) }

    const idData = await idbStore.addItem('delegasiPegawai', data)

    mainStore.manageIdDelegasi = idData

    const confirmResult = await Swal.fire({
      title: 'NO ST berhasil dipilih',
      icon: 'success',
      text: 'Lanjutkan Penginputan Data',
      showCancelButton: true,
      confirmButtonText: 'Oke',
      cancelButtonText: 'Nanti Aja',
      cancelButtonColor: 'red',
      backdrop: true,
      allowOutsideClick: false,
      allowEscapeKey: false
    })

    // Menutup modal menggunakan Bootstrap Modal API
    const modalElement = document.getElementById('staticBackdrop')
    const modalInstance = window.bootstrap.Modal.getInstance(modalElement)
    if (modalInstance) {
      await modalInstance.hide() // Pastikan modal ditutup sebelum lanjut
    }
    document.querySelectorAll('.modal-backdrop').forEach((modal) => modal.remove())

    if (confirmResult.isConfirmed) {
      await router.push({ name: 'manageDelegasi', params: { noST: selectedST.value.noST } })
    } else {
      delegasiPegawai.value = await idbStore.fetchData(objectStore)
    }

    setTimeout(() => {
      document.body.removeAttribute('style')
    }, 2000)
  } catch (error) {
    console.error('Terjadi kesalahan:', error)
  }
}

const manageData = (id, noST) => {
  mainStore.manageIdDelegasi = id
  router.push({ name: 'manageDelegasi', params: { noST } })
}
</script>
<template>
  <div>
    <h1 class="text-dark fw-bold mb-4">List Delegasi Pegawai</h1>
    <button data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="btn btn-primary mb-4">
      Tambah Data
    </button>
    <div class="table-responsive">
      <table class="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">NO ST</th>
            <th scope="col">NO SPPD</th>
            <th scope="col">Jumlah Pegawai</th>
            <th scope="col" class="text-center">Status</th>

            <th scope="col" class="text-center">Action</th>
          </tr>
        </thead>
        <tbody v-if="delegasiPegawai.length > 0">
          <tr v-for="(dlg, key) in delegasiPegawai" :key="key">
            <td v-text="dlg.noST.noST"></td>
            <td>
              <div v-if="dlg.relation?.length">
                <span
                  :class="[`text-bg-dark py-2`, 'badge fs-1 me-2']"
                  v-for="(sppd, i) in dlg.relation"
                  :key="i"
                  >{{ sppd.noSPPD.noSPPD }}</span
                >
              </div>
              <div v-else>Kosong</div>
            </td>
            <td>
              <span v-if="dlg.relation?.length">
                {{ dlg.relation?.length + ' Orang' }}
              </span>
              <span v-else>Kosong</span>
            </td>
            <td class="text-center">
              <button v-if="dlg.hasOwnProperty('relation')" class="btn btn-primary">Aktif</button>
              <button v-else class="btn btn-danger">Non Aktif</button>
            </td>
            <td class="text-center">
              <button
                @click="manageData(dlg.id, dlg.noST.noST)"
                class="btn-success btn me-2 btn-sm"
              >
                Manage Data
              </button>
              <button class="btn-danger btn me-2 btn-sm" @click="handleDelete(dlg.id)">
                Hapus
              </button>
              <button class="btn-sm btn-warning me-2 btn">Edit</button>
              <router-link
                :to="{ name: 'detailDelegasi', params: { noST: dlg.noST.noST } }"
                class="btn-sm btn-info btn"
                >Detail</router-link
              >
            </td>
          </tr>
        </tbody>

        <tbody v-else>
          <tr>
            <td colspan="5" class="text-center">
              {{ loading ? 'Loading Data...' : 'Data masih kosong' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ModalItem
      title="Pilih Nomor ST"
      confirmButtonText="Simpan"
      actionType="add"
      @confirm="handleConfirm"
    >
      <template #body>
        <input v-model="searchST" class="form-control mb-3" type="text" placeholder="Cari ST..." />
        <ul class="list-group" v-if="filteredST.length">
          <li
            v-for="st in filteredST"
            :key="st.id"
            class="list-group-item d-flex justify-content-between align-items-center"
            @click="selectST(st)"
            style="cursor: pointer"
          >
            {{ st.noST }}
            <span v-if="selectedST === st">
              <!-- Icon centang -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="icon icon-tabler icons-tabler-filled icon-tabler-circle-check text-success"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                />
              </svg>
            </span>
          </li>
        </ul>
        <div class="text-center" v-else>
          {{ loading ? 'Loading' : 'Data ST masih kosong' }}
        </div>
      </template>
    </ModalItem>
  </div>
</template>
