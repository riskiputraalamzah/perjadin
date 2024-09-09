<script setup>
import { ref, onMounted, computed, toRaw } from 'vue'
import { useIDBStore } from '@/stores/IDB'
import { Toast } from '@/components/ToastAlert'
import { useRouter } from 'vue-router'
const idbStore = useIDBStore()
const router = useRouter()

const listST = ref([])
const form = ref({
  noSPM: '',
  tglSPM: '',
  nilaiSPM: 0 // diubah ke angka agar bisa dijumlahkan
})

const touched = ref({
  noSPM: false,
  tglSPM: false,
  nilaiSPM: false
})

const selectedST = ref([]) // Menyimpan ST yang dipilih

onMounted(async () => {
  listST.value = await idbStore.fetchData('delegasiPegawai')
})

const jumlahTotalSemuaDana = (st) => {
  return st.relation?.reduce((total, item) => {
    return total + item.totalSemuaDana
  }, 0)
}

// Watcher untuk update nilai SPM ketika checkbox berubah
const updateNilaiSPM = () => {
  const totalNilai = selectedST.value.reduce((total, st) => {
    return total + jumlahTotalSemuaDana(st)
  }, 0)
  form.value.nilaiSPM = totalNilai
}

const toggleSTSelection = (st) => {
  const index = selectedST.value.indexOf(st)
  if (index === -1) {
    selectedST.value.push(st)
  } else {
    selectedST.value.splice(index, 1)
  }
  updateNilaiSPM()
}

const isFormValid = ref(false) // Variabel untuk menyimpan status validasi form
const isValidForm = computed({
  get() {
    return form.value.noSPM !== '' && form.value.tglSPM !== '' && form.value.nilaiSPM > 0
  },
  set(newValue) {
    isFormValid.value = newValue
  }
})

// Update method untuk menyimpan selectedST bersama data SPM
const handleForm = async () => {
  if (!isValidForm.value) return
  isFormValid.value = true
  const data = {
    ...toRaw(form.value),
    selectedST: toRaw(selectedST.value) // Simpan ST yang dipilih
  }
  await idbStore.addItem('spm', data)
  isFormValid.value = false
  Toast.fire({ icon: 'success', title: 'Data Berhasil ditambahkan' })
  router.push('/spm')
}
</script>

<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'spm' }">SPM</router-link>
        </li>
        <li class="breadcrumb-item" aria-current="page">Tambah Data</li>
      </ol>
    </nav>
    <h1 class="text-dark fw-bold mb-4">Tambah Data SPM</h1>
    <div class="row">
      <div class="col-md-6 col-lg-4">
        <div>
          <label for="noSPM" class="form-label">No SPM</label>
          <input
            type="text"
            class="form-control"
            v-model="form.noSPM"
            id="noSPM"
            @focus="touched.noSPM = true"
            :class="{ 'is-invalid': touched.noSPM && form.noSPM === '' }"
          />
          <div v-if="touched.noSPM && form.noSPM === ''" class="invalid-feedback">
            No SPM wajib diisi.
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div>
          <label for="tglSPM" class="form-label">Tanggal SPM</label>
          <input
            type="date"
            class="form-control"
            v-model="form.tglSPM"
            id="tglSPM"
            @focus="touched.tglSPM = true"
            :class="{ 'is-invalid': touched.tglSPM && form.tglSPM === '' }"
          />
          <div v-if="touched.tglSPM && form.tglSPM === ''" class="invalid-feedback">
            Tanggal SPM wajib diisi.
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div>
          <label for="nilai" class="form-label">Nilai SPM</label>
          <input
            type="text"
            class="form-control"
            :value="formatRupiah(form.nilaiSPM)"
            readonly
            id="nilai"
            @focus="touched.nilaiSPM = true"
            :class="{ 'is-invalid': touched.nilaiSPM && form.nilaiSPM <= 0 }"
          />
          <div v-if="touched.nilaiSPM && form.nilaiSPM <= 0" class="invalid-feedback">
            Nilai SPM wajib diisi.
          </div>
          <span class="fs-1 text-info">
            Untuk mengisi Nilai SPM, Silahkan pilih ST dari tabel di bawah
          </span>
        </div>
      </div>
      <div class="col-12">
        <div class="card">
          <div class="card-header">Pilih NO ST</div>
          <div class="card-body">
            <table class="table-striped table table-bordered">
              <thead>
                <tr>
                  <th>Pilih</th>
                  <th>No ST</th>
                  <th>Total Dana Seluruhnya</th>
                </tr>
              </thead>
              <tbody>
                <div class="text-center" v-if="listST.length < 0">Data Masih Kosong</div>
                <tr v-for="(st, i) in listST" :key="i">
                  <td>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      style="width: 20px; height: 20px"
                      @change="toggleSTSelection(st)"
                    />
                  </td>
                  <td>
                    {{ st.noST.noST }}
                  </td>
                  <td>
                    {{ formatRupiah(jumlahTotalSemuaDana(st)) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <button @click="handleForm" class="btn btn-primary mt-4" :disabled="!isValidForm">
      Simpan
    </button>
  </div>
</template>
