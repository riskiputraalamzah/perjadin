<script setup>
import { ref, onMounted } from 'vue'
import ModalItem from '@/components/ModalItem.vue'
import { useIDBStore } from '@/stores/IDB'
import Swal from 'sweetalert2'

const idbStore = useIDBStore()

const dataPegawai = ref({
  namaPegawai: '',
  nip: '',
  golongan: '',
  jabatan: ''
})

const pegawaiList = ref([])

// Fetch data dari IndexedDB ketika komponen di-mount
onMounted(async () => {
  pegawaiList.value = await idbStore.fetchData('pegawai')
})

// Fungsi untuk menyimpan data pegawai
const handleConfirm = async () => {
  const data = JSON.parse(JSON.stringify(dataPegawai.value))
  await idbStore.addItem('pegawai', data)
  pegawaiList.value = await idbStore.fetchData('pegawai')
  resetForm()
  Swal.fire({ icon: 'success', title: 'Data Pegawai berhasil di tambahkan' })
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
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h4 class="card-title mb-4">List Pegawai</h4>
      <!-- Tombol untuk membuka modal -->
      <button
        type="button"
        class="btn btn-primary mb-4"
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
              <th scope="col">Gologan</th>
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
                <button class="btn-danger btn me-2 btn-sm">Hapus</button
                ><button class="btn-sm btn-warning btn">Edit</button>
              </td>
            </tr>
          </tbody>

          <tbody v-else>
            <tr>
              <td colspan="6" class="text-center">Data masih kosong</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Tambah data -->
    <ModalItem title="Tambah Data Pegawai" confirmButtonText="Simpan" @confirm="handleConfirm">
      <template #body>
        <!-- Konten Modal yang Dinamis -->
        <form>
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
