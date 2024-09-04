<script setup>
import { ref, onMounted } from 'vue'
import { useIDBStore } from '@/stores/IDB'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

// State management
const dataST = ref([])
const selectedItem = ref(null)
const pdfData = ref(null)
const loading = ref(true)

// IndexedDB store
const idbStore = useIDBStore()

// Fetch data on component mount
onMounted(async () => {
  dataST.value = await idbStore.fetchData('suratTugas')
  console.log(dataST.value)
  loading.value = false
})

// Handle selection
const selectItem = (index) => {
  selectedItem.value = selectedItem.value === index ? null : index
}
const debounce = (func, delay) => {
  let timeoutId
  return function (...args) {
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// Generate PDF
const loadingPdf = ref(false)
const generatePdf = debounce(async () => {
  if (loadingPdf.value) return
  loadingPdf.value = !loadingPdf.value
  const content = document.getElementById('content')
  const canvas = await html2canvas(content, { scale: 2 })
  const imgData = canvas.toDataURL('image/png')

  const pdf = new jsPDF('p', 'mm', 'a4')
  const pageWidth = 210
  const imgWidth = pageWidth
  const imgHeight = (canvas.height * pageWidth) / canvas.width

  pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)

  const pdfBlob = pdf.output('blob')

  pdfData.value = URL.createObjectURL(pdfBlob)
  window.open(pdfData.value, '_blank')
  loadingPdf.value = !loadingPdf.value
}, 500)

// Download PDF
// const downloadPdf = () => {
//   const link = document.createElement('a')
//   link.href = pdfData.value
//   link.download = 'laporan.pdf'
//   link.click()

//   URL.revokeObjectURL(pdfData.value)
// }
</script>
<template>
  <div>
    <h1 class="text-dark fw-bold">Laporan</h1>
    <h4 class="mb-4">Surat Tugas, Surat Perintah Perjalanan Dinas</h4>
    <div class="card">
      <h5 class="card-header text-dark">Pilih Nomor Surat Tugas</h5>
      <div class="card-body">
        <div class="text-center" v-if="loading">Loading Data</div>
        <ul class="list-group" v-else>
          <li
            v-for="(data, index) in dataST"
            :key="index"
            class="list-group-item d-flex justify-content-between align-items-center"
            @click="selectItem(data)"
          >
            {{ data.noST }}
            <input class="form-check-input" type="checkbox" :checked="selectedItem === data" />
          </li>
        </ul>
      </div>
    </div>

    <!-- Elemen yang ingin dicetak -->
    <div class="card" v-if="selectedItem != null">
      <div class="card-header d-flex align-items-center justify-content-between">
        <h5 class="text-dark">Preview Laporan</h5>
        <button :disabled="loadingPdf" class="btn btn-warning btn-sm" @click="generatePdf">
          {{ loadingPdf ? 'Proses...' : 'Cetak PDF' }}
        </button>
      </div>
      <div class="card-body">
        <div id="content" class="content-to-pdf">
          <div class="row g-0 align-items-center border-black border-bottom border-5">
            <div class="col-2">
              <img src="/assets/images/logo.png" class="img-fluid" alt="" />
            </div>
            <div class="col-10">
              <div class="text-center title">
                <p class="m-0">KEMENTRIAN KETENAGAKERJAAN REPUBLIK INDONESIA</p>
                <h5 class="m-0">DIREKTORAL JENDERAL</h5>
                <h5 class="m-0">PEMBINAAN PELATIHAN VOKASI DAN PRODUKTIVITAS</h5>
                <h4 class="m-0">BALAI PELATIHAN VOKASI DAN PRODUKTIVITAS</h4>
                <p class="m-0 fs-2">
                  Jalan Raya Kebaron No.1 Kel.Kebaron, Kec.Tulangan, Kab.Sidoarjo, Jawa Timur 61273,
                  Telepon (031)99622626
                </p>
                <p class="m-0 fs-2">Laman : https://www.kemnaker.go.id</p>
              </div>
            </div>
          </div>
          <!-- Tambahkan elemen lainnya sesuai kebutuhan -->
          <div class="text-center mt-4 lh-1">
            <h5>
              <span class="title-surat border-bottom border-black border-3">SURAT TUGAS</span>
            </h5>
            <h5>
              <span class="no-surat">NOMOR {{ selectedItem.noST }}</span>
            </h5>
          </div>
          <p class="mt-4">
            Pada Hari <b>Senin</b> tanggal <b>Dua</b> bulan <b>September</b>tahun
            <b>Dua Ribu Dua Puluh Empat</b> ,kami yang bertanda tangan dibawah ini :
          </p>
          <div class="d-flex">
            <span class="me-4">I.</span>
            <table>
              <tr>
                <td class="kolompertama">Nama</td>
                <td class="pe-2">:</td>
                <td>Karsono</td>
              </tr>
              <tr>
                <td class="kolompertama">Jabatan</td>
                <td class="pe-2">:</td>
                <td>Pejabat Penandatanganan Kontrak BPVP Sidoarjo</td>
              </tr>
              <tr>
                <td class="kolompertama">Alamat</td>
                <td class="pe-2">:</td>
                <td>Jalan raya kebaron</td>
              </tr>
              <tr>
                <td colspan="3" class="text-start">
                  Untuk Selanjutnya disebut..... <b>PIHAK PERTAMA</b>......
                </td>
              </tr>
            </table>
          </div>
          <div class="d-flex mt-4">
            <span class="me-4">II.</span>
            <table>
              <tr>
                <td class="kolompertama">Nama</td>
                <td class="pe-2">:</td>
                <td>sholehiddin ST., MT.</td>
              </tr>
              <tr>
                <td class="kolompertama">Jabatan</td>
                <td class="pe-2">:</td>
                <td>Direktur</td>
              </tr>
              <tr>
                <td class="kolompertama">Perusahaan</td>
                <td class="pe-2">:</td>
                <td>CV.Makarya Engineering</td>
              </tr>
              <tr>
                <td class="kolompertama">Alamat</td>
                <td class="pe-2">:</td>
                <td>Jl. Banyu Urip Kidul I No.6 Surabaya, Jawa Timur</td>
              </tr>
              <tr>
                <td colspan="3" class="text-start">
                  Untuk Selanjutnya disebut..... <b>PIHAK KEDUA</b>......
                </td>
              </tr>
            </table>
          </div>
          <div class="d-flex mt-4">
            <span class="me-4">A.</span>
            <table>
              <tr>
                <td class="text-start">Pada Kegiatan/Proyek :</td>
                <!-- <td class="pe-2">:</td> -->
                <td></td>
              </tr>
              <tr>
                <td class="kolompertama">Surat Perjanjian Pekerjaan</td>
                <td class="pe-2">:</td>
                <td>2.21/3015/UM.02.03/V/2024 <br />tanggal 07 mei 2024</td>
              </tr>
              <tr>
                <td class="kolompertama">Pekerjaan</td>
                <td class="pe-2">:</td>
                <td>Pengawasan Revitalisasi jalan Keliling Seksi Belakang BPVP Sidoarjo</td>
              </tr>
              <tr>
                <td class="kolompertama">Tahun Anggaran</td>
                <td class="pe-2">:</td>
                <td>2024</td>
              </tr>
              <tr>
                <td class="kolompertama">Lokasi</td>
                <td class="pe-2">:</td>
                <td>
                  Jalan Raya Kebaron No. 1, Kebaron, Tulangan, Kabupaten Sidoarjo, Jawa Timur 61273
                </td>
              </tr>
              <tr>
                <td colspan="3" class="text-start">
                  Untuk Selanjutnya disebut..... <b>PIHAK PERTAMA</b>......
                </td>
              </tr>
            </table>
          </div>
          <div class="d-flex my-4">
            <span class="me-4">B.</span>
            <div style="text-align: justify">
              Dengan ini menyatakan bahwa Pekerjaan Pengawasan Revitalisasi Jalan Keliling Seksi
              Belakang BPVP Sidoarjo Tahun Anggaran 2024 telah mencapai prestasi pekerjaan fisik
              sebesar 91,89% sesuai Laporan Periode 12 s/d 18 Agustus (Minggu Ke-15) yang disusun
              oleh Penyedia/Pelaksana Konstruksi, kemudian telah diperiksa oleh Konsultan Pengawas
              Konstruksi dan disetujui oleh Pejabat Pembuat Komitmen (PPK) sebagaimana terlampir.
            </div>
          </div>
          <div style="text-align: justify">
            Demikian Berita Acara Kemajuan Pekerjaan ini dibuat dalam rangkap secukupnya untuk dapat
            dipergunakan sebagaimana mestinya.
          </div>
        </div>
      </div>
    </div>

    <!-- Tombol untuk menampilkan PDF -->

    <!-- Tombol untuk mengunduh PDF -->
    <!-- <button class="btn btn-secondary mt-2" v-if="pdfData" @click="downloadPdf">Unduh PDF</button> -->
  </div>
</template>

<style>
.content-to-pdf {
  width: 210mm; /* Sesuaikan dengan ukuran halaman A4 */
  padding: 20px 60px;
  background-color: #fff;
  color: #000;
  font-family: Arial, sans-serif;
}
.content-to-pdf .title {
  color: black;
}
.content-to-pdf h5,
.content-to-pdf h4 {
  font-weight: bold !important;
  margin: 0;
  color: black !important;
}

/* Mengatur tampilan checkbox agar terlihat lebih besar */
.form-check-input {
  width: 1.5em;
  height: 1.5em;
}
.border-black {
  border-color: black !important;
}
.color-black {
  color: black !important;
}

/* Hilangkan checkbox default jika dicentang, ganti dengan warna background */
.list-group-item.active {
  background-color: #0d6efd;
  color: white;
}

.kolompertama {
  padding-right: 90px;
  text-align: left;
}
table td:nth-child(3) {
  text-align: left;
}
</style>
