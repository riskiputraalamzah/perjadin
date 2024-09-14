<script setup>
import { ref, onMounted, computed, toRaw } from 'vue'
import { useIDBStore } from '@/stores/IDB'
import { Toast } from '@/components/ToastAlert'
import { useRouter } from 'vue-router'
import { useMainStore } from '@/stores/main'
const mainStore = useMainStore()
const idbStore = useIDBStore()

const router = useRouter()

const listSPM = ref([])
const listSP2D = ref([])
const form = ref({
  noSP2D: '',
  tglSP2D: '',
  metaAnggaran: '', // diubah ke angka agar bisa dijumlahkan,
  spm: {}
})

const touched = ref({
  noSP2D: false,
  tglSP2D: false,
  metaAnggaran: false,
  spm: false
})

onMounted(async () => {
  listSP2D.value = await idbStore.fetchData('sp2d')
  listSPM.value = await idbStore.fetchData('spm')
})

const filteredSPM = computed(() => {
  return listSPM.value.filter((spm) => {
    return !listSP2D.value.some((sp2d) => sp2d.spm.noSPM === spm.noSPM)
  })
})

const isFormValid = ref(false) // Variabel untuk menyimpan status validasi form
const isValidForm = computed({
  get() {
    return (
      form.value.noSP2D !== '' &&
      form.value.tglSP2D !== '' &&
      form.value.metaAnggaran !== '' &&
      Object.keys(form.value.spm).length !== 0
    )
  },
  set(newValue) {
    isFormValid.value = newValue
  }
})

// Update method untuk menyimpan selectedST bersama data SP2D
const handleForm = async () => {
  if (!isValidForm.value) return
  isFormValid.value = true
  form.value.spm = toRaw(form.value.spm)
  const data = {
    ...toRaw(form.value)
  }
  await idbStore.addItem('sp2d', data)
  isFormValid.value = false
  Toast.fire({ icon: 'success', title: 'Data Berhasil ditambahkan' })
  mainStore.dataSP2D = null
  router.push('/sp2d')
}
</script>

<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'sp2d' }">SP2D</router-link>
        </li>
        <li class="breadcrumb-item" aria-current="page">Tambah Data</li>
      </ol>
    </nav>
    <h1 class="text-dark fw-bold mb-4">Tambah Data SP2D</h1>
    <div class="row gy-3">
      <div class="col-md-6 col-lg-4">
        <div>
          <label for="noSP2D" class="form-label">No SP2D</label>
          <input
            type="text"
            class="form-control"
            v-model="form.noSP2D"
            id="noSP2D"
            @focus="touched.noSP2D = true"
            :class="{ 'is-invalid': touched.noSP2D && form.noSP2D === '' }"
          />
          <div v-if="touched.noSP2D && form.noSP2D === ''" class="invalid-feedback">
            No SP2D wajib diisi.
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div>
          <label for="tglSP2D" class="form-label">Tanggal SP2D</label>
          <input
            type="date"
            class="form-control"
            v-model="form.tglSP2D"
            id="tglSP2D"
            @focus="touched.tglSP2D = true"
            :class="{ 'is-invalid': touched.tglSP2D && form.tglSP2D === '' }"
          />
          <div v-if="touched.tglSP2D && form.tglSP2D === ''" class="invalid-feedback">
            Tanggal SP2D wajib diisi.
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div>
          <label for="metaAnggaran" class="form-label">Meta Anggaran</label>
          <input
            type="text"
            class="form-control"
            v-model="form.metaAnggaran"
            id="metaAnggaran"
            @focus="touched.metaAnggaran = true"
            :class="{ 'is-invalid': touched.metaAnggaran && form.metaAnggaran === '' }"
          />
          <div v-if="touched.metaAnggaran && form.metaAnggaran === ''" class="invalid-feedback">
            Meta Anggaran wajib diisi.
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4">
        <div>
          <label for="noSPM" class="form-label">NO SPM</label>
          <select class="form-select" id="noSPM" v-model="form.spm">
            <option selected disabled>Pilih Salah Satu</option>
            <option
              v-for="(spm, i) in filteredSPM"
              :key="i"
              v-text="spm.noSPM"
              :value="spm"
            ></option>
          </select>
          <div
            v-if="touched.spm && Object.keys(form.value.spm).length === 0"
            class="invalid-feedback"
          >
            No SPM wajib dipilih.
          </div>
        </div>
      </div>
    </div>
    <button @click="handleForm" class="btn btn-primary mt-4" :disabled="!isValidForm">
      Simpan
    </button>
  </div>
</template>
