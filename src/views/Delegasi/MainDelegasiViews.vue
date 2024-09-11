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

const fetchAndCaching = async () => {
  const [stData, pegawaiData] = await Promise.all([
    idbStore.fetchData('suratTugas'),
    idbStore.fetchData(objectStore)
  ])

  // Menetapkan data ke reaktif variabel
  STData.value = stData
  delegasiPegawai.value = pegawaiData
  mainStore.dataST = stData
  mainStore.dataDelegasiPegawai = pegawaiData
}
onMounted(async () => {
  if (mainStore.dataST && mainStore.dataDelegasiPegawai) {
    loading.value = !loading.value
    STData.value = mainStore.dataST
    delegasiPegawai.value = mainStore.dataDelegasiPegawai
    return
  }
  await fetchAndCaching()
  loading.value = !loading.value
})

const handleDelete = async (id, noST) => {
  // Konfirmasi dengan SweetAlert
  const result = await Swal.fire({
    title: `Apakah Anda Yakin?`,
    icon: 'question',
    html: `No ST <strong>${noST}</strong> akan di hapus`,
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
        Toast.fire({ icon: 'success', title: `Data Delegasi Pegawai berhasil dihapus` })
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
// Selection methods
const selectST = (st) => {
  console.log({ st })
  selectedST.value = st
  console.log(selectedST.value)
}

const handleConfirm = async ({ actionType, data }) => {
  try {
    if (!selectedST.value) {
      return Swal.fire({ icon: 'error', title: 'Silahkan Pilih NO ST terlebih dahulu' })
    }

    const dataStore = { noST: toRaw(selectedST.value) }

    if (actionType === 'add') {
      const idData = await idbStore.addItem('delegasiPegawai', dataStore)
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

      if (confirmResult.isConfirmed) {
        await router.push({ name: 'manageDelegasi', params: { noST: selectedST.value.noST } })
      } else {
        await fetchAndCaching(objectStore)
      }

      setTimeout(() => document.body.removeAttribute('style'), 2000)
    } else if (actionType === 'edit') {
      await idbStore.updateData('delegasiPegawai', 'id', data.id, dataStore)
      await fetchAndCaching(objectStore)
      Toast.fire({ icon: 'success', title: 'NO ST berhasil diubah' })
    }

    // Menutup modal menggunakan Bootstrap Modal API
    const modalElement = document.getElementById('staticBackdrop')
    const modalInstance = window.bootstrap.Modal.getInstance(modalElement)
    modalInstance?.hide() // Tutup modal jika instance ada

    // Menghapus semua backdrop modal yang tersisa
    document.querySelectorAll('.modal-backdrop').forEach((modal) => modal.remove())
  } catch (error) {
    console.error('Terjadi kesalahan:', error)
  }
}

const manageData = (id, noST) => {
  mainStore.manageIdDelegasi = id
  router.push({ name: 'manageDelegasi', params: { noST } })
}

const openAddModal = () => {
  selectedST.value = null
  modalProps.value = {
    title: 'Pilih Nomor ST',
    confirmButtonText: 'Simpan',
    actionType: 'add',
    data: {}
  }
}

// Fungsi untuk menyiapkan modal edit
const openEditModal = (id, noST) => {
  selectedST.value = noST
  console.log(selectedST.value)
  console.log(id)
  modalProps.value = {
    title: 'Edit Data Pegawai',
    confirmButtonText: 'Update',
    actionType: 'edit',
    data: {
      id
    }
  }
}

const modalProps = ref({
  title: 'Tambah Data Pegawai',
  confirmButtonText: 'Simpan',
  actionType: 'add',
  data: {}
})

const encode = (value) => btoa(value)
</script>
<template>
  <div>
    <h1 class="text-dark fw-bold mb-4">List Delegasi Pegawai</h1>
    <button
      @click="openAddModal"
      :disabled="loading"
      data-bs-toggle="modal"
      data-bs-target="#staticBackdrop"
      class="btn btn-primary mb-4"
    >
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
            <td style="text-wrap: wrap">
              <div v-if="dlg.relation?.length">
                <span
                  :class="[`text-bg-dark py-2`, 'badge fs-1 ']"
                  v-for="(sppd, i) in dlg.relation"
                  :key="i"
                  >{{ sppd.noSPPD.noSPPD }}</span
                >
              </div>
              <div v-else>Kosong</div>
            </td>
            <td>
              <span v-if="dlg.relation?.length">
                <span class="me-2"> {{ dlg.relation?.length }}</span> orang
              </span>
              <span v-else>Kosong</span>
            </td>
            <td class="text-center">
              <button v-if="dlg.relation?.length" class="btn btn-primary">Aktif</button>
              <button v-else class="btn btn-danger">Non Aktif</button>
            </td>
            <td class="text-center">
              <button @click="manageData(dlg.id, dlg.noST.noST)" class="btn-success btn btn-sm">
                Manage Data
              </button>
              <button class="btn-danger btn btn-sm" @click="handleDelete(dlg.id, dlg.noST.noST)">
                Hapus
              </button>
              <button
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                @click="openEditModal(dlg.id, dlg.noST)"
                class="btn-sm btn-warning btn"
              >
                Edit
              </button>
              <router-link
                :to="{
                  name: 'detailDelegasi',
                  params: { noST: encode(`${dlg.noST.noST}___${dlg.id}`) }
                }"
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
      :title="modalProps.title"
      :confirmButtonText="modalProps.confirmButtonText"
      :actionType="modalProps.actionType"
      :data="modalProps.data"
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
