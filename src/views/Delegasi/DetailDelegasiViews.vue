<script setup>
import { useIDBStore } from '@/stores/IDB'
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const idbStore = useIDBStore()
const route = useRoute()
const router = useRouter()
const idDelegasi = parseInt(atob(route.params.noST).split('___')[1])
console.log(idDelegasi)

const detailDelegasi = ref({})

onMounted(async () => {
  detailDelegasi.value = await idbStore.findData('delegasiPegawai', idDelegasi)

  console.log(detailDelegasi.value)
  if (!detailDelegasi.value) return router.push({ name: 'delegasi' })
})

const jumlahTotalSemuaDana = computed(() => {
  return detailDelegasi.value.relation?.reduce((total, item) => {
    return total + item.totalSemuaDana
  }, 0)
})
const handleDragScroll = (e) => {
  const container = e.currentTarget
  let isDown = false
  let startX
  let scrollLeft

  container.addEventListener('mousedown', (e) => {
    isDown = true
    container.classList.add('active')
    startX = e.pageX - container.offsetLeft
    scrollLeft = container.scrollLeft
  })

  container.addEventListener('mouseleave', () => {
    isDown = false
    container.classList.remove('active')
  })

  container.addEventListener('mouseup', () => {
    isDown = false
    container.classList.remove('active')
  })

  container.addEventListener('mousemove', (e) => {
    if (!isDown) return
    e.preventDefault()
    const x = e.pageX - container.offsetLeft
    const walk = (x - startX) * 3 // Kecepatan scroll
    container.scrollLeft = scrollLeft - walk
  })
}
</script>
<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'delegasi' }">Delegasi Pegawai</router-link>
        </li>
        <li class="breadcrumb-item" aria-current="page">Detail</li>
      </ol>
    </nav>
    <h1 class="text-dark fw-bold mb-4">Detail Delegasi</h1>
    <div class="card">
      <h5 class="card-header text-dark">Surat Tugas</h5>
      <div class="card-body">
        <ul class="list-group list-group-flush">
          <li class="list-group-item px-0 flex-wrap justify-content-between d-flex">
            <span class="fw-bold me-3 text-dark mb-2">Nomor</span>
            <span class="mb-2">{{ detailDelegasi?.noST?.noST }}</span>
          </li>
          <li class="list-group-item px-0 flex-wrap justify-content-between d-flex">
            <span class="fw-bold me-3 text-dark mb-2">Tanggal</span>
            <span class="mb-2">{{ formatDate(detailDelegasi?.noST?.tgl) }}</span>
          </li>
          <li class="list-group-item px-0 flex-wrap justify-content-between d-flex">
            <span class="fw-bold me-3 text-dark mb-2">Uraian</span>
            <span class="mb-2">{{ detailDelegasi?.noST?.uraian }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="card shadow-none">
      <h5 class="card-header text-dark">Didelegasikan Kepada :</h5>
      <div
        class="card-body px-2 py-0 container-scroll"
        v-if="detailDelegasi.relation?.length"
        @mousedown="handleDragScroll"
      >
        <div
          class="card"
          style="width: calc(70vmin)"
          v-for="(dlg, i) in detailDelegasi.relation"
          :key="i"
        >
          <img
            :src="createAvatar(dlg.pegawai)"
            class="card-img-top ratio ratio-1x1 object-fit-fill img-thumbnail"
          />
          <div class="card-body px-0">
            <h4 class="text-center fw-bold mb-4">{{ dlg.pegawai.namaPegawai }}</h4>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <p class="fw-bold text-dark me-3">No SPPD</p>
                <p>{{ dlg.noSPPD.noSPPD }}</p>
              </li>
              <li class="list-group-item">
                <p class="fw-bold text-dark me-3">Tujuan SPPD</p>
                <p>{{ dlg.noSPPD.tujuan }}</p>
              </li>
              <li class="list-group-item">
                <p class="fw-bold text-dark me-3">Tgl Berangkat</p>
                <p>{{ formatDate(dlg.noSPPD.tglBerangkat) }}</p>
              </li>
              <li class="list-group-item">
                <p class="fw-bold text-dark me-3">Tgl Pulang</p>
                <p>{{ formatDate(dlg.noSPPD.tglPulang) }}</p>
              </li>
              <li class="list-group-item">
                <p class="fw-bold text-dark me-3">Lama Penugasan</p>
                <p>{{ dlg.noSPPD.lamaPenugasan }} Hari</p>
              </li>
              <li class="list-group-item">
                <p class="fw-bold text-dark me-3">Nama Hotel/Penginapan</p>
                <p>{{ dlg.hotelName }}</p>
              </li>
              <li class="list-group-item">
                <p class="fw-bold text-dark me-3">No Voucher/Invoice Hotel</p>
                <p>{{ dlg.hotelVoucher }}</p>
              </li>
              <li class="list-group-item">
                <p class="fw-bold text-dark me-3">Jenis Transportasi</p>
                <p>{{ dlg.transportationType }}</p>
              </li>
              <li class="list-group-item">
                <p class="fw-bold text-dark me-3">Kode Booking</p>
                <p>{{ dlg.bookingCode }}</p>
              </li>
              <li class="list-group-item">
                <p class="fw-bold text-dark me-3">Nomor Kursi</p>
                <p>{{ dlg.seatNumber }}</p>
              </li>
              <li class="list-group-item">
                <p class="fw-bold text-dark me-3">Harga PP</p>
                <p>{{ formatRupiah(dlg.pricePP) }}</p>
              </li>
              <li class="list-group-item">
                <p class="fw-bold text-dark me-3">Harga Tiket Berangkat</p>
                <p>{{ formatRupiah(dlg.priceDeparture) }}</p>
              </li>
              <li class="list-group-item">
                <p class="fw-bold text-dark me-3">Harga Tiket Pulang</p>
                <p>{{ formatRupiah(dlg.priceReturn) }}</p>
              </li>
              <li class="list-group-item">
                <p class="fw-bold text-dark me-3">Jumlah Uang Transport</p>
                <p>{{ formatRupiah(dlg.totalPrice) }}</p>
              </li>
              <li class="list-group-item">
                <p class="fw-bold text-dark me-3">Tarif Satuan Penginapan</p>
                <p>{{ formatRupiah(dlg.rate) }}</p>
              </li>
              <li class="list-group-item">
                <p class="fw-bold text-dark me-3">Jumlah Hari/Malam</p>
                <p>{{ dlg.numDays }} Hari</p>
              </li>
              <li class="list-group-item">
                <p class="fw-bold text-dark me-3">Jumlah Harga Penginapan</p>
                <p>{{ formatRupiah(dlg.totalAccommodation) }}</p>
              </li>
              <li class="list-group-item">
                <p class="fw-bold text-dark me-3">Uang Harian</p>
                <p>{{ formatRupiah(dlg.dailyRate) }}</p>
              </li>
              <li class="list-group-item">
                <p class="fw-bold text-dark me-3">Jumlah Hari</p>
                <p>{{ dlg.dailyNumDays }} Hari</p>
              </li>
              <li class="list-group-item">
                <p class="fw-bold text-dark me-3">Total Uang Harian</p>
                <p>{{ formatRupiah(dlg.totalDaily) }}</p>
              </li>
              <li class="list-group-item">
                <p class="fw-bold text-dark me-3">Biaya Lainnya</p>
                <p>{{ dlg.biayaLainnyaKeterangan }}</p>
              </li>
              <li class="list-group-item">
                <p class="fw-bold text-dark me-3">Jumlah Biaya Lainnya</p>
                <p>{{ formatRupiah(dlg.biayaLainnyaJumlah) }}</p>
              </li>
              <li class="list-group-item">
                <p class="fw-bold text-dark me-3">Total Dana Semuanya</p>
                <p>{{ formatRupiah(dlg.totalSemuaDana) }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="text-center h4" v-else>Data Masih Kosong</div>
    </div>
    <div class="card" v-if="detailDelegasi.relation?.length">
      <h5 class="card-header text-dark">Total Biaya Keseluruhan</h5>
      <div class="card-body">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <p class="fw-bold text-dark me-3">Jumlah Pendelegasian Pegawai</p>
            <p>{{ detailDelegasi.relation.length }} Orang</p>
          </li>
          <li class="list-group-item">
            <p class="fw-bold text-dark me-3">Jumlah Total Dana Semuanya</p>
            <p>{{ formatRupiah(jumlahTotalSemuaDana) }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style scoped>
.list-group-item {
  display: flex;
  justify-content: space-between;
  vertical-align: center;
  flex-wrap: wrap;
}
.list-group-item p {
  margin-bottom: 0.5rem;
}
.container-scroll {
  display: grid;
  grid-auto-flow: column;
  scroll-behavior: auto;
  gap: 1.2rem;
  overflow-y: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}
.container-scroll.active {
  cursor: grabbing;
  user-select: none; /* Mencegah elemen di dalam kontainer diseleksi */
}
.container-scroll > * {
  user-select: none;
}
</style>
