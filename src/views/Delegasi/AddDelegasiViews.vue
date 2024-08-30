<script setup>
import { ref, computed, onMounted, toRaw } from 'vue'
import { useIDBStore } from '@/stores/IDB'
import Swal from 'sweetalert2'
import { Toast } from '@/components/ToastAlert'
import { useRouter } from 'vue-router'
import { getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()

const router = useRouter()
const idbStore = useIDBStore()

const STData = ref([])
const SPPDData = ref([])
const PegawaiData = ref([])
const delegasiPegawai = ref([])

const loading = ref(true)
onMounted(async () => {
  try {
    STData.value = await idbStore.fetchData('suratTugas')
    SPPDData.value = await idbStore.fetchData('sppd')
    PegawaiData.value = await idbStore.fetchData('pegawai')
    delegasiPegawai.value = await idbStore.fetchData('delegasiPegawai')
    loading.value = !loading.value
  } catch (error) {
    console.error('Error fetching data from IDB:', error)
    loading.value = !loading.value
  }
})

// Search filter
const searchST = ref('')
const searchSPPD = ref('')
const searchPegawai = ref('')

// Selected data
const selectedST = ref(null)
const selectedSPPD = ref([])
const selectedPegawai = ref([])

// Computed properties for filtered lists with conditions
const filteredST = computed(() => {
  return STData.value.length
    ? STData.value
        .filter((st) => !delegasiPegawai.value.some((used) => used.noST.noST === st.noST))
        .filter((st) => st.noST.toLowerCase().includes(searchST.value.toLowerCase()))
    : []
})

const filteredSPPD = computed(() => {
  return SPPDData.value.length
    ? SPPDData.value
        .filter(
          (sppd) =>
            !delegasiPegawai.value.some((groupObj) =>
              groupObj.noSPPD.some((used) => used.noSPPD === sppd.noSPPD)
            )
        )
        .filter((sppd) => sppd.noSPPD.toLowerCase().includes(searchSPPD.value.toLowerCase()))
    : []
})

const filteredPegawai = computed(() => {
  return PegawaiData.value.length
    ? PegawaiData.value.filter((pegawai) =>
        pegawai.namaPegawai.toLowerCase().includes(searchPegawai.value.toLowerCase())
      )
    : []
})

// Selection methods
const selectST = (st) => {
  selectedST.value = st
}

const toggleSPPDSelection = (sppd) => {
  const index = selectedSPPD.value.indexOf(sppd)
  if (index > -1) {
    selectedSPPD.value.splice(index, 1)
  } else {
    selectedSPPD.value.push(sppd)
  }
}

const togglePegawaiSelection = (pegawai) => {
  const index = selectedPegawai.value.indexOf(pegawai)
  if (index > -1) {
    selectedPegawai.value.splice(index, 1)
  } else {
    selectedPegawai.value.push(pegawai)
  }
}

// Consolidate accommodation and travel details into one object
const expenseDetails = ref({
  hotelName: '',
  hotelVoucher: '',
  transportationType: '',
  bookingCode: '',
  seatNumber: '',
  pricePP: 0,
  priceDeparture: 0,
  priceReturn: 0,
  totalPrice: 0,
  rate: 0,
  numDays: 0,
  totalAccommodation: 0,
  dailyRate: 0,
  dailyNumDays: 0,
  totalDaily: 0,
  biayaLainnyaKeterangan: '',
  biayaLainnyaJumlah: 0
})

const autoResizeTextarea = ref(null) // Referensi ke textarea

// Fungsi untuk menyesuaikan tinggi textarea
const adjustHeight = () => {
  autoResizeTextarea.value.style.height = 'auto' // Reset tinggi untuk menghitung ulang
  autoResizeTextarea.value.style.height = `${autoResizeTextarea.value.scrollHeight}px` // Atur tinggi berdasarkan konten
}

const handleConfirm = async () => {
  try {
    // Konfirmasi dengan SweetAlert
    const confirmResult = await Swal.fire({
      title: 'Apakah data sudah betul?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak',
      cancelButtonColor: 'red'
    })

    // Jika pengguna mengonfirmasi
    if (!confirmResult.isConfirmed) return

    // SweetAlert untuk input dana
    const totalSemuaDana = await promptTotalDana()

    if (totalSemuaDana) {
      const originalValue = proxy.unformatRupiah(totalSemuaDana)
      updateExpenseDetails()

      // Gabungkan data secara efisien dengan spread operator
      const data = {
        totalSemuaDana: originalValue,
        ...expenseDetails.value
      }

      let rawData = {
        ...data,
        noST: toRaw(selectedST.value),
        noSPPD: selectedSPPD.value.map(toRaw),
        pegawai: selectedPegawai.value.map(toRaw)
      }

      // SweetAlert untuk input tambahan
      const additionalData = await promptAdditionalInfo()

      if (additionalData) {
        rawData = { ...rawData, ...additionalData }
      }

      // tambahkan ke idb
      await idbStore.addItem('delegasiPegawai', rawData)
      Toast.fire({ icon: 'success', title: 'Data Delegasi Berhasil dibuat ' })
      router.push({ name: 'delegasi' })
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error)
  }
}

// Fungsi untuk prompt total dana
const promptTotalDana = async () => {
  const { value: totalSemuaDana } = await Swal.fire({
    title: 'Total Dana Yang Diterima',
    input: 'text',
    inputValue: proxy.formatRupiah(0),
    inputValidator: (value) => {
      if (!value) return 'Input tidak boleh kosong'
      if (isNaN(proxy.unformatRupiah(value))) return 'Input harus berupa angka'
    },
    showCancelButton: true,
    confirmButtonText: 'Lanjut',
    cancelButtonText: 'Batal',
    cancelButtonColor: 'red',
    didOpen: () => {
      const input = Swal.getInput()
      input.addEventListener('input', (event) => {
        const cleanedValue = event.target.value.replace(/[^0-9,]/g, '')
        event.target.value = proxy.formatRupiah(proxy.unformatRupiah(cleanedValue))
      })
    }
  })

  return totalSemuaDana
}

// Fungsi untuk prompt informasi tambahan
const promptAdditionalInfo = async () => {
  const { value: additionalData } = await Swal.fire({
    title: 'Informasi Lanjuttan!',
    html: `
      <input id="input1" class="swal2-input" type="text" placeholder="Jumlah Pengembalian">
      <input id="input2" class="swal2-input" type="text" placeholder="Nomor Billing">
      <input id="input3" class="swal2-input" type="text" placeholder="NTPN">
    `,
    focusConfirm: false,
    preConfirm: () => {
      const input1 = document.getElementById('input1').value
      const input2 = document.getElementById('input2').value
      const input3 = document.getElementById('input3').value

      if (!input1 || !input2 || !input3) {
        Swal.showValidationMessage('Semua bidang harus diisi!')
        return false
      }
      if (isNaN(proxy.unformatRupiah(input1))) {
        Swal.showValidationMessage('Jumlah Kembalian harus berisikan angka !')
        return false
      }

      return {
        jumlahPengembalian: input1,
        nomorBilling: input2,
        ntpn: input3
      }
    },
    showCancelButton: true,
    confirmButtonText: 'Simpan',
    cancelButtonText: 'Lewati Saja',
    didOpen: () => {
      // Menambahkan event listener untuk input1
      const input1 = document.getElementById('input1')
      input1.addEventListener('input', (event) => {
        // Hanya izinkan angka dan koma
        const cleanedValue = event.target.value.replace(/[^0-9,]/g, '')
        // Format nilai menjadi Rupiah
        event.target.value = proxy.formatRupiah(proxy.unformatRupiah(cleanedValue))
      })
    }
  })

  return additionalData
}

// Utility function for calculation and formatting
function calculateAndFormat(amount, rate, days) {
  const total = rate * days
  return proxy.formatRupiah(total)
}

// Computed properties for each calculation
const sumTransport = computed(() => {
  const totalPrice =
    expenseDetails.value.pricePP +
    expenseDetails.value.priceDeparture +
    expenseDetails.value.priceReturn
  return proxy.formatRupiah(totalPrice)
})

const sumTotalAccommodation = computed(() =>
  calculateAndFormat(
    expenseDetails.value.totalAccommodation,
    expenseDetails.value.rate,
    expenseDetails.value.numDays
  )
)

const sumTotalDaily = computed(() =>
  calculateAndFormat(
    expenseDetails.value.totalDaily,
    expenseDetails.value.dailyRate,
    expenseDetails.value.dailyNumDays
  )
)

// Update expenseDetails with unformatted values
function updateExpenseDetails() {
  expenseDetails.value.totalPrice = proxy.unformatRupiah(sumTransport.value)
  expenseDetails.value.totalAccommodation = proxy.unformatRupiah(sumTotalAccommodation.value)
  expenseDetails.value.totalDaily = proxy.unformatRupiah(sumTotalDaily.value)
}

// Call updateExpenseDetails when needed, e.g., after data changes
</script>

<template>
  <div>
    <div class="card">
      <h4 class="card-header fw-bold text-dark">Form Pendelegasian Pegawai</h4>
      <div class="card-body">
        <div class="accordion accordion-flush" id="accordionFlushExample">
          <!-- Accordion ST -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button px-0 bg-transparent text-dark fw-bold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseOne"
                aria-expanded="true"
                aria-controls="flush-collapseOne"
              >
                <span
                  class="rounded-circle fs-1 text-bg-primary me-2 d-flex justify-content-center align-items-center"
                  style="width: 25px; height: 25px"
                  >1</span
                >
                Pilih Nomor ST
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              class="accordion-collapse collapse show"
              data-bs-parent="#accordionFlushExample"
            >
              <div class="accordion-body px-0">
                <input
                  v-model="searchST"
                  class="form-control mb-3"
                  type="text"
                  placeholder="Cari ST..."
                />
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
              </div>
            </div>
          </div>

          <!-- Accordion SPPD -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button px-0 bg-transparent text-dark fw-bold collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo"
                aria-expanded="false"
                aria-controls="flush-collapseTwo"
              >
                <span
                  class="rounded-circle fs-1 text-bg-primary me-2 d-flex justify-content-center align-items-center"
                  style="width: 25px; height: 25px"
                  >2</span
                >
                Pilih Nomor SPPD
                <sup class="text-info ms-1">*Opsional</sup>
              </button>
            </h2>
            <div
              id="flush-collapseTwo"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div class="accordion-body px-0">
                <input
                  v-model="searchSPPD"
                  class="form-control mb-3"
                  type="text"
                  placeholder="Cari SPPD..."
                />
                <ul class="list-group" v-if="filteredSPPD.length">
                  <li
                    v-for="sppd in filteredSPPD"
                    :key="sppd.id"
                    class="list-group-item d-flex justify-content-between align-items-center"
                    @click="toggleSPPDSelection(sppd)"
                    style="cursor: pointer"
                  >
                    {{ sppd.noSPPD }}
                    <span v-if="selectedSPPD.includes(sppd)">
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
                  {{ loading ? 'Loading' : 'Data SPPD masih kosong' }}
                </div>
              </div>
            </div>
          </div>

          <!-- Accordion Pegawai -->
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button px-0 bg-transparent text-dark fw-bold collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseThree"
                aria-expanded="false"
                aria-controls="flush-collapseThree"
              >
                <span
                  class="rounded-circle fs-1 text-bg-primary me-2 d-flex justify-content-center align-items-center"
                  style="width: 25px; height: 25px"
                  >3</span
                >
                Pilih Pegawai
              </button>
            </h2>
            <div
              id="flush-collapseThree"
              class="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div class="accordion-body px-0">
                <input
                  v-model="searchPegawai"
                  class="form-control mb-3"
                  type="text"
                  placeholder="Cari Pegawai..."
                />
                <ul class="list-group" v-if="filteredPegawai.length">
                  <li
                    v-for="pegawai in filteredPegawai"
                    :key="pegawai.id"
                    class="list-group-item d-flex justify-content-between align-items-center"
                    @click="togglePegawaiSelection(pegawai)"
                    style="cursor: pointer"
                  >
                    {{ pegawai.namaPegawai }}
                    <span v-if="selectedPegawai.includes(pegawai)">
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
                  {{ loading ? 'Loading' : 'Data Pegawai masih kosong' }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Card review hasil pilihan -->
    <div v-if="selectedST && selectedPegawai.length" class="card mt-4" ref="reviewSection">
      <h4 class="card-header fw-bold text-dark">Review Pilihan</h4>
      <div class="card-body">
        <p><strong>NO ST</strong> : {{ selectedST ? selectedST.noST : 'Belum ada' }}</p>
        <p>
          <strong>NO SPPD</strong> :
          {{
            selectedSPPD.length ? selectedSPPD.map((sppd) => sppd.noSPPD).join(', ') : 'Belum ada'
          }}
        </p>
        <p>
          <strong>Nama Pegawai</strong> :
          {{
            selectedPegawai.length
              ? selectedPegawai.map((pegawai) => pegawai.namaPegawai).join(', ')
              : 'Belum ada'
          }}
        </p>

        <!-- Input Biaya Sarana dan Prasarana -->
        <div class="mt-4">
          <h5 class="mb-3">Input Biaya Sarana dan Prasarana</h5>

          <!-- Group 1: Data Hotel -->
          <div class="card mb-3">
            <div class="card-header">Hotel/Penginapan</div>
            <div class="card-body">
              <div class="mb-3">
                <label for="hotelName" class="form-label">Nama Hotel/Penginapan</label>
                <input
                  v-model="expenseDetails.hotelName"
                  type="text"
                  class="form-control"
                  id="hotelName"
                  placeholder="Masukkan nama hotel/penginapan"
                />
              </div>
              <div class="mb-3">
                <label for="hotelVoucher" class="form-label">No Voucher/Invoice Hotel</label>
                <input
                  v-model="expenseDetails.hotelVoucher"
                  type="text"
                  class="form-control"
                  id="hotelVoucher"
                  placeholder="Masukkan no voucher/invoice hotel"
                />
              </div>
            </div>
          </div>

          <!-- Group 2: Data Transportasi -->
          <div class="card mb-3">
            <div class="card-header">Transportasi</div>
            <div class="card-body">
              <div class="mb-3">
                <label for="transportationType" class="form-label">Jenis Transportasi</label>
                <input
                  v-model="expenseDetails.transportationType"
                  type="text"
                  class="form-control"
                  id="transportationType"
                  placeholder="Masukkan jenis transportasi"
                />
              </div>
              <div class="mb-3">
                <label for="bookingCode" class="form-label">Kode Booking</label>
                <input
                  v-model="expenseDetails.bookingCode"
                  type="text"
                  class="form-control"
                  id="bookingCode"
                  placeholder="Masukkan kode booking"
                />
              </div>
              <div class="mb-3">
                <label for="seatNumber" class="form-label">Nomor Kursi</label>
                <input
                  v-model="expenseDetails.seatNumber"
                  type="text"
                  class="form-control"
                  id="seatNumber"
                  placeholder="Masukkan nomor kursi"
                />
              </div>
              <div class="mb-3">
                <label for="pricePP" class="form-label">Harga PP</label>
                <input
                  v-model="expenseDetails.pricePP"
                  type="number"
                  class="form-control"
                  id="pricePP"
                  placeholder="Masukkan harga PP"
                />
              </div>
              <div class="mb-3">
                <label for="priceDeparture" class="form-label">Harga Tiket Berangkat</label>
                <input
                  v-model="expenseDetails.priceDeparture"
                  type="number"
                  class="form-control"
                  id="priceDeparture"
                  placeholder="Masukkan harga tiket berangkat"
                />
              </div>
              <div class="mb-3">
                <label for="priceReturn" class="form-label">Harga Tiket Pulang</label>
                <input
                  v-model="expenseDetails.priceReturn"
                  type="number"
                  class="form-control"
                  id="priceReturn"
                  placeholder="Masukkan harga tiket pulang"
                />
              </div>
              <div class="mb-3">
                <label for="sumTransport" class="form-label">Jumlah Uang Transport</label>
                <input
                  v-model="sumTransport"
                  type="text"
                  class="form-control"
                  id="sumTransport"
                  readonly
                />
              </div>
            </div>
          </div>

          <!-- Group 3: Data Penginapan -->
          <div class="card mb-3">
            <div class="card-header">Penginapan</div>
            <div class="card-body">
              <div class="mb-3">
                <label for="rate" class="form-label">Tarif Satuan Penginapan</label>
                <input
                  v-model="expenseDetails.rate"
                  type="number"
                  class="form-control"
                  id="rate"
                  placeholder="Masukkan tarif satuan penginapan"
                />
              </div>
              <div class="mb-3">
                <label for="numDays" class="form-label">Jumlah Hari/Malam</label>
                <input
                  v-model="expenseDetails.numDays"
                  type="number"
                  class="form-control"
                  id="numDays"
                  placeholder="Masukkan jumlah hari/malam"
                />
              </div>
              <div class="mb-3">
                <label for="totalAccommodation" class="form-label">Jumlah Harga Penginapan</label>
                <input
                  v-model="sumTotalAccommodation"
                  type="text"
                  class="form-control"
                  id="totalAccommodation"
                  readonly
                  placeholder="Masukkan jumlah harga penginapan"
                />
              </div>
            </div>
          </div>

          <!-- Group 4: Uang Harian -->
          <div class="card mb-3">
            <div class="card-header">Uang Harian</div>
            <div class="card-body">
              <div class="mb-3">
                <label for="dailyRate" class="form-label">Satuan Uang Harian (Rp)</label>
                <input
                  v-model="expenseDetails.dailyRate"
                  type="number"
                  class="form-control"
                  id="dailyRate"
                  placeholder="Masukkan satuan uang harian"
                />
              </div>
              <div class="mb-3">
                <label for="dailyNumDays" class="form-label">Jumlah Hari</label>
                <input
                  v-model="expenseDetails.dailyNumDays"
                  type="number"
                  class="form-control"
                  id="dailyNumDays"
                  placeholder="Masukkan jumlah hari"
                />
              </div>
              <div class="mb-3">
                <label for="totalDaily" class="form-label">Total Uang Harian</label>
                <input
                  v-model="sumTotalDaily"
                  type="text"
                  class="form-control"
                  id="totalDaily"
                  readonly
                  placeholder="Masukkan total uang harian"
                />
              </div>
            </div>
          </div>
          <!-- Group 4: Uang Harian -->
          <div class="card mb-3">
            <div class="card-header">Biaya Lainnya (bila ada)</div>
            <div class="card-body">
              <div class="mb-3">
                <label for="uraian" class="form-label">Keterangan</label>

                <textarea
                  id="uraian"
                  v-model="expenseDetails.biayaLainnyaKeterangan"
                  class="form-control"
                  placeholder="Isikan Keterangan Biaya Lainnya disini..."
                  rows="1"
                  ref="autoResizeTextarea"
                  @input="adjustHeight"
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="dailyNumDays" class="form-label">Jumlah</label>
                <input
                  v-model="expenseDetails.biayaLainnyaJumlah"
                  type="number"
                  class="form-control"
                  id="dailyNumDays"
                  placeholder="Masukkan jumlah hari"
                />
              </div>
            </div>
          </div>

          <!-- Tombol Save -->
          <button type="button" @click="handleConfirm" class="btn-save mt-3">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.active {
  background-color: #e9f7ef;
}

.list-group-item {
  transition: background-color 0.3s ease;
}

.card-body {
  padding: 1.5rem; /* Menambah padding di dalam card */
}

.card {
  border-radius: 8px; /* Membulatkan sudut card */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Menambahkan bayangan pada card */
}

.form-control {
  padding: 10px; /* Menambah padding pada input field */
  border-radius: 5px; /* Membulatkan sudut input field */
  border: 1px solid #ced4da; /* Warna border input field */
}

.form-control:focus {
  border-color: #007bff; /* Warna border saat input field di klik */
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Menambahkan efek shadow pada input field saat di klik */
}

.label {
  font-weight: bold; /* Menebalkan label */
  color: #343a40; /* Warna label */
}

.mb-3 label {
  margin-bottom: 0.5rem; /* Menambahkan margin bawah pada label */
}

.mt-4 {
  margin-top: 2rem; /* Menambah margin atas */
}

.btn-save {
  background-color: #28a745; /* Warna tombol save */
  color: #fff; /* Warna teks tombol save */
  padding: 10px 20px; /* Padding tombol save */
  border-radius: 5px; /* Membulatkan sudut tombol */
  border: none; /* Menghilangkan border tombol */
  transition: background-color 0.3s ease; /* Efek transisi saat hover */
}

.btn-save:hover {
  background-color: #218838; /* Warna tombol saat hover */
}
</style>
