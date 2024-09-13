<script setup>
import { ref, onMounted } from 'vue'
import { useIDBStore } from '@/stores/IDB'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

import VueQrcode from '@chenfengyuan/vue-qrcode'
import { useRouter } from 'vue-router'

const router = useRouter()

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

  const pdf = new jsPDF('p', 'mm', 'a4')
  const pageWidth = 210
  const pageHeight = 297
  const childs = document.querySelectorAll('#content .content-child')

  for (let i = 0; i < childs.length; i++) {
    const child = childs[i]
    child.classList.add('printed')

    // Ubah konten child menjadi canvas
    const canvas = await html2canvas(child, { scale: 2 })
    const imgData = canvas.toDataURL('image/png')

    const imgWidth = pageWidth
    const imgHeight = (canvas.height * pageWidth) / canvas.width

    if (imgHeight > pageHeight) {
      // Jika gambar lebih tinggi dari satu halaman, bagi konten menjadi beberapa halaman
      let heightLeft = imgHeight
      let position = 0

      while (heightLeft > 0) {
        // Tambahkan bagian gambar pada posisi yang tepat
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)

        heightLeft -= pageHeight
        if (heightLeft > 0) {
          // Tambahkan halaman baru jika masih ada bagian yang belum tercetak
          pdf.addPage()
          position = -pageHeight // Atur posisi agar halaman berikutnya mulai dari bagian atas
        }
      }
    } else {
      // Jika gambar cukup untuk satu halaman, langsung tambahkan
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
    }

    // Tambahkan halaman baru jika bukan child terakhir
    if (i < childs.length - 1) {
      pdf.addPage()
    }

    // Hapus kelas 'printed' setelah selesai
    child.classList.remove('printed')
  }

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

const urlQrCode = (noST) => {
  return `${window.location.origin}${
    router.resolve({
      name: 'detailDelegasi',
      params: { noST }
    }).href
  }`
}
</script>
<template>
  <div>
    <h1 class="text-dark fw-bold">Laporan</h1>
    <h4 class="mb-4">Surat Tugas, Surat Perintah Perjalanan Dinas</h4>
    <div class="card">
      <h5 class="card-header text-dark">Pilih Nomor Surat Tugas</h5>
      <div class="card-body">
        <ul class="list-group" v-if="dataST.length">
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
        <div class="text-center" v-else-if="loading">Loading</div>
        <div class="text-center" v-else>Data ST (delegasi pegawai) Masih Kosong</div>
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
      <div class="card-body overflow-auto">
        <div id="content" class="content-to-pdf">
          <div class="content-child">
            <div class="row g-0 py-1 align-items-center border-black border-bottom border-3">
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
                    Jalan Raya Kebaron No.1 Kel.Kebaron, Kec.Tulangan, Kab.Sidoarjo, Jawa Timur
                    61273, Telepon (031)99622626
                  </p>
                  <p class="m-0 fs-2">Laman : https://www.kemnaker.go.id</p>
                </div>
              </div>
            </div>
            <!-- Tambahkan elemen lainnya sesuai kebutuhan -->
            <div class="text-center my-1 lh-1">
              <h5>
                <span class="title-surat border-bottom border-black border-3">SURAT TUGAS</span>
              </h5>
              <h5>
                <span class="no-surat">NOMOR {{ selectedItem.noST }}</span>
              </h5>
            </div>
            <table class="table table-sm table-borderless">
              <tbody>
                <tr>
                  <td class="text-start">Menimbang</td>
                  <td>:</td>
                  <td class="ps-4">
                    <div class="d-flex">
                      <div class="pe-2">a.</div>
                      <div class="text-justify">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi, voluptate
                        repellendus!
                      </div>
                    </div>
                    <div class="d-flex">
                      <div class="pe-2">b.</div>
                      <div class="text-justify">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat incidunt,
                        eos mollitia quisquam provident illo!
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td class="text-start">Dasar</td>
                  <td>:</td>
                  <td class="ps-4">
                    <div class="d-flex">
                      <div class="pe-2">1.</div>
                      <div class="text-justify">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi, voluptate
                        repellendus!
                      </div>
                    </div>
                    <div class="d-flex">
                      <div class="pe-2">2.</div>
                      <div class="text-justify">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat incidunt,
                        eos mollitia quisquam provident illo!
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="3" class="text-center">Menugaskan :</td>
                </tr>
                <tr>
                  <td class="text-start">Kepada</td>
                  <td>:</td>
                  <td class="ps-4">
                    <table class="table table-sm table-borderless">
                      <tbody>
                        <tr>
                          <td style="padding: 0">Nama</td>
                          <td style="padding: 0">:</td>
                          <td style="padding: 0">Risna Amalia, A.Md</td>
                        </tr>
                        <tr>
                          <td style="padding: 0">NIP</td>
                          <td style="padding: 0">:</td>
                          <td style="padding: 0">121213213</td>
                        </tr>
                        <tr>
                          <td style="padding: 0">Pangkat/Gol</td>
                          <td style="padding: 0">:</td>
                          <td style="padding: 0">Penata Muda Tk.I/III B</td>
                        </tr>
                        <tr>
                          <td style="padding: 0">Jabatan</td>
                          <td style="padding: 0">:</td>
                          <td style="padding: 0">Instruktur Mahir</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td class="text-start">Untuk</td>
                  <td>:</td>
                  <td class="ps-4">
                    <div class="d-flex">
                      <div class="pe-2">1.</div>
                      <div class="text-justify">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi, voluptate
                        repellendus!
                      </div>
                    </div>
                    <div class="d-flex">
                      <div class="pe-2">2.</div>
                      <div class="text-justify">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat incidunt,
                        eos mollitia quisquam provident illo! Voluptatem reprehenderit quisquam,
                      </div>
                    </div>
                    <div class="d-flex">
                      <div class="pe-2">3.</div>
                      <div class="text-justify">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat incidunt,
                        eos mollitia quisquam provident illo!
                      </div>
                    </div>
                    <div class="d-flex">
                      <div class="pe-2">4.</div>
                      <div class="text-justify">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat incidunt,
                        eos mollitia quisquam provident illo! Voluptatem reprehenderit quisquam,
                        eaque tempora architecto possimus a rem odit eos provident ducimus assumenda
                        ipsa!
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="3">
                    Dengan Surat Tugas ini dibuat untuk dilaksanakan dengan penuh tanggung jawab
                  </td>
                </tr>
                <tr>
                  <td colspan="3">
                    <div class="d-inline-block text-center float-end">
                      <div>Sidoarjo, 17 April 2024</div>
                      <div>Kepala Balai</div>
                      <div>
                        <VueQrcode :value="urlQrCode(selectedItem.noST)" :level="'H'" />
                      </div>
                      <div>Muhammad Aiza Akbar</div>
                      <div>NIP 3293289328</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="content-child">
            <div class="row justify-content-between">
              <div class="col-6 pt-1">
                <div>Kementrian Ketenagakerjaan R.I</div>
                <div>Direktorat Jenderal Pembinaan Pelatihan</div>
                <div>Vokasi dan Produktivitas</div>
              </div>
              <div class="col-6">
                <table class="table-sm">
                  <tbody>
                    <tr>
                      <td class="pe-4">Lembar ke</td>
                      <td>:</td>
                      <td class="ps-2"></td>
                    </tr>
                    <tr>
                      <td class="pe-4">Kode NO</td>
                      <td>:</td>
                      <td class="ps-2"></td>
                    </tr>
                    <tr>
                      <td class="pe-4">Nomor</td>
                      <td>:</td>
                      <td class="ps-2">232763726</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <h5 class="text-center my-5">
              <span class="title-surat border-bottom border-black border-3"
                >SURAT PERJALANAN DINAS (SPD)</span
              >
            </h5>
            <table class="table table-bordered table-sm border-dark spd lh-md">
              <tbody>
                <tr>
                  <td>1.</td>
                  <td>Pejabat Pembuat Komitmen</td>
                  <td>Balai Pelatihan Vokasi dan Produktivitas Sidoarjo</td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>Nama / NIP Pegawai yang melaksanakan Perjalanan Dinas</td>
                  <td>
                    <strong>Risna Amalia A.Md.</strong>
                    <strong class="px-3">/</strong>
                    <strong> 213234243244</strong>
                  </td>
                </tr>
                <tr>
                  <td>3.</td>
                  <td>
                    <div class="d-flex">
                      <span class="pe-2">a.</span> <span>Pangkat dan Golongan</span>
                    </div>
                    <div class="d-flex">
                      <span class="pe-2">b.</span> <span>Jabatan / Instansi</span>
                    </div>
                    <div class="d-flex">
                      <span class="pe-2">c.</span>
                      <span>Tingkat menurut peraturan perjalanan dinas</span>
                    </div>
                  </td>
                  <td>
                    <div class="d-flex">
                      <span class="pe-2">a.</span> <span>Penata Muda Tk I/III b</span>
                    </div>
                    <div class="d-flex">
                      <span class="pe-2">b.</span> <span>Infrastruktur Mahir</span>
                    </div>
                    <div class="d-flex">
                      <span class="pe-2">c.</span>
                      <span>C</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>4.</td>
                  <td>Maksud Perjalanan Dinas</td>
                  <td>Dalam rangka koordinasi</td>
                </tr>
                <tr>
                  <td>5.</td>
                  <td>Alat angkutan yang dipergunakan</td>
                  <td>Pesawat, DLL</td>
                </tr>
                <tr>
                  <td>6.</td>
                  <td>
                    <div class="d-flex">
                      <span class="pe-2">a.</span> <span>Tempat berangkat</span>
                    </div>
                    <div class="d-flex">
                      <span class="pe-2">b.</span> <span>Tempat tujuan</span>
                    </div>
                  </td>
                  <td>
                    <div class="d-flex"><span class="pe-2">a.</span> <span>Sidoarjo</span></div>
                    <div class="d-flex"><span class="pe-2">b.</span> <span>Ternate</span></div>
                  </td>
                </tr>
                <tr>
                  <td>7.</td>
                  <td>
                    <div class="d-flex">
                      <span class="pe-2">a.</span> <span>Lamanya perjalanan dinas</span>
                    </div>
                    <div class="d-flex">
                      <span class="pe-2">b.</span> <span>Tanggal berangkat</span>
                    </div>
                    <div class="d-flex">
                      <span class="pe-2">c.</span>
                      <span>Tanggal harus kembali/tiba di tempat baru</span>
                    </div>
                  </td>
                  <td>
                    <div class="d-flex">
                      <span class="pe-2">a.</span> <span>3 (tiga) hari</span>
                    </div>
                    <div class="d-flex">
                      <span class="pe-2">b.</span> <span>19 April 2024</span>
                    </div>
                    <div class="d-flex">
                      <span class="pe-2">c.</span> <span>21 April 2024</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>8.</td>
                  <td>Pengikut</td>
                  <td>
                    <table class="table table-sm border-dark">
                      <thead>
                        <tr class="text-dark">
                          <th>No</th>
                          <th>Nama</th>
                          <th>Tanggal Lahir</th>
                          <th>Keterangan</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td>9.</td>
                  <td>
                    <div class="d-flex">
                      <span class="pe-2">a.</span> <span>Pembebanan Anggaran</span>
                    </div>
                    <div class="d-flex">
                      <span class="pe-2">b.</span> <span>Mata Anggaran</span>
                    </div>
                  </td>
                  <td>
                    <div class="d-flex">
                      <span class="pe-2">a.</span> <span>BPVP Sidoarjo</span>
                    </div>
                    <div class="d-flex"><span class="pe-2">b.</span> <span>32243232</span></div>
                  </td>
                </tr>
                <tr>
                  <td>10.</td>
                  <td>Keterangan lain-lain</td>
                  <td>SPD Tugas Nomor 243232/MP/D4.04/2024 tanggal 17 April 2024</td>
                </tr>
              </tbody>
            </table>

            <div class="d-flex justify-content-end mt-4">
              <div class="text-center">
                <div class="mb-4">
                  <div>Dikeluarkan di: <strong>Sidoarjo</strong></div>
                  <div>Pada Tanggal: <strong>17 April 2024</strong></div>
                </div>
                <div>Pejabat Pembuat Komitmen</div>
                <div class="mt-5 pt-4">[Nama Pejabat]</div>
                <div>NIP 1234567890 123</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tombol untuk menampilkan PDF -->

    <!-- Tombol untuk mengunduh PDF -->
    <!-- <button class="btn btn-secondary mt-2" v-if="pdfData" @click="downloadPdf">Unduh PDF</button> -->
  </div>
</template>

<style scoped>
.content-to-pdf {
  width: 210mm; /* Sesuaikan dengan ukuran halaman A4 */
  /* padding: 20px 60px; */
  background-color: #fff;
  color: #000;
  font-family: Arial, sans-serif;
  box-sizing: border-box;
  margin: 0 auto;
}
.content-to-pdf .content-child {
  margin-bottom: 50px;
  padding: 20px 60px;
  /* border: 1px solid #eee; */
}
.content-to-pdf table td * {
  margin: 0 !important;
}
.printed {
  /* height: 290mm !important; */
  border: none !important;
  margin-bottom: 0 !important;
}
.content-to-pdf table td {
  text-wrap: wrap !important;
  vertical-align: top;
  color: black !important;
  text-align: justify;
}
.content-to-pdf table.spd td {
  vertical-align: middle !important;
}
.content-to-pdf table.spd td:nth-child(2) {
  max-width: 250px;
}
.content-to-pdf .title {
  color: black;
}
.content-to-pdf canvas {
  width: 100px !important;
  height: 100px !important;
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

.text-justify {
  text-align: justify !important;
}
</style>
