<script setup>
import { ref, computed, onMounted } from 'vue'
import { useIDBStore } from '@/stores/IDB'

const idbStore = useIDBStore()

const STData = ref([])
const SPPDData = ref([])
const PegawaiData = ref([])

onMounted(async () => {
  try {
    STData.value = await idbStore.fetchData('suratTugas')
    SPPDData.value = await idbStore.fetchData('sppd')
    PegawaiData.value = await idbStore.fetchData('pegawai')
  } catch (error) {
    console.error('Error fetching data from IDB:', error)
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
    ? STData.value.filter((st) => st.noST.toLowerCase().includes(searchST.value.toLowerCase()))
    : []
})

const filteredSPPD = computed(() => {
  return SPPDData.value.length
    ? SPPDData.value.filter((sppd) =>
        sppd.noSPPD.toLowerCase().includes(searchSPPD.value.toLowerCase())
      )
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
  totalDaily: 0
})

// Watch for selectedST and selectedPegawai changes to auto-scroll
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
                <div class="text-center" v-else>Loading</div>
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
                <div class="text-center" v-else>Loading</div>
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
                <div class="text-center" v-else>Loading</div>
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

          <div class="mb-3">
            <label for="transportationType" class="form-label">Transportasi</label>
            <input
              v-model="expenseDetails.transportationType"
              type="text"
              class="form-control"
              id="transportationType"
              placeholder="Masukkan jenis transportasi"
            />
          </div>

          <div class="mb-3">
            <label for="bookingCode" class="form-label">Kode Booking Transportasi</label>
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
            <label for="totalPrice" class="form-label">Total Harga</label>
            <input
              v-model="expenseDetails.totalPrice"
              type="number"
              class="form-control"
              id="totalPrice"
              placeholder="Masukkan total harga"
            />
          </div>

          <!-- Uang Penginapan -->
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
              v-model="expenseDetails.totalAccommodation"
              type="number"
              class="form-control"
              id="totalAccommodation"
              placeholder="Masukkan jumlah harga penginapan"
            />
          </div>

          <!-- Uang Harian -->
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
              v-model="expenseDetails.totalDaily"
              type="number"
              class="form-control"
              id="totalDaily"
              placeholder="Masukkan total uang harian"
            />
          </div>
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
</style>
