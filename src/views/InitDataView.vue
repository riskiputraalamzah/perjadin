<script setup>
import { ref } from 'vue'
import * as XLSX from 'xlsx'

const isDragging = ref(false)
const uploading = ref(false)
const progress = ref(0)

const handleDrop = (event) => {
  event.preventDefault()
  isDragging.value = false
  uploading.value = true

  const files = event.dataTransfer.files

  if (files.length) {
    const file = files[0]
    simulateUpload(file)
  }
}

const handleDragOver = (event) => {
  event.preventDefault()
  isDragging.value = true
}

const handleDragLeave = () => {
  isDragging.value = false
}

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    uploading.value = true
    simulateUpload(file)
  }
}

const simulateUpload = (file) => {
  const interval = setInterval(() => {
    if (progress.value < 100) {
      progress.value += 10 // Simulasi progres upload
    } else {
      clearInterval(interval)
      setTimeout(() => {
        uploading.value = false
        readFile(file)
      }, 500)
    }
  }, 500) // Simulasi kecepatan upload
}

const readFile = (file) => {
  const reader = new FileReader()

  reader.onload = (event) => {
    const data = new Uint8Array(event.target.result)
    const workbook = XLSX.read(data, { type: 'array' })

    // Mengambil sheet pertama
    const firstSheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[firstSheetName]

    // Konversi ke JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

    // Memproses data JSON ke format yang diinginkan
    const processedData = processData(jsonData)

    // Tampilkan data di konsol
    console.log('Data dari file Excel:', processedData)
  }

  reader.readAsArrayBuffer(file)
}

// Fungsi untuk memproses data ke format yang diinginkan
const processData = (data) => {
  // Asumsikan baris pertama adalah header
  const headers = data[0]
  const rows = data.slice(1)

  const formattedData = rows.map((row) => {
    return {
      user: {
        nama: row[headers.indexOf('nama')] || null,
        nip: row[headers.indexOf('nip')] || null,
        golongan: row[headers.indexOf('golongan')] || null,
        jabatan: row[headers.indexOf('jabatan')] || null
      },
      surat_tugas: {
        no_st: row[headers.indexOf('nomor_st')] || null,
        tgl_st: row[headers.indexOf('tanggal_st')] || null,
        uraian_st: row[headers.indexOf('uraian_tugas')] || null
      },
      sppd: {
        no: row[headers.indexOf('nomor_sppd')] || null,
        tgl: row[headers.indexOf('tanggal_sppd')] || null,
        tujuan: row[headers.indexOf('tujuan')] || null,
        tgl_berangkat: row[headers.indexOf('tanggal_berangkat')] || null,
        tgl_pulang: row[headers.indexOf('tanggal_pulang')] || null,
        lama_penugasan: row[headers.indexOf('lama_penugasan')] || null
      },
      spm: {
        nilai_spm: row[headers.indexOf('nilai_spm')] || null,
        nomor_spm: row[headers.indexOf('nomor_spm')] || null,
        tgl_spm: row[headers.indexOf('tanggal_spm')] || null,
        meta_anggaran: row[headers.indexOf('mata_anggaran')] || null
      },
      sp2d: {
        nomor_sp2d: row[headers.indexOf('nomor_sp2d')] || null,
        tgl_sp2d: row[headers.indexOf('tanggal_sp2d')] || null
      },
      transportasi: {
        namaSarana: row[headers.indexOf('nama_sarana')] || null,
        kode_booking: row[headers.indexOf('kode_booking')] || null,
        nomor_kursi: row[headers.indexOf('nomor_kursi')] || null
      },
      uang_transport: {
        id: row[headers.indexOf('id')] || null,
        idSppd: row[headers.indexOf('id_sppd')] || null,
        nota_transport: row[headers.indexOf('nota_transport')] || null,
        harga_tiket_berangkat: row[headers.indexOf('harga_tiket_berangkat')] || null,
        harga_tiket_pulang: row[headers.indexOf('harga_tiket_pulang')] || null,
        total_harga_tiket: row[headers.indexOf('total_harga_tiket')] || null
      },
      uang_penginapan: {
        id_sppd: row[headers.indexOf('id_sppd')] || null,
        tarif: row[headers.indexOf('tarif')] || null,
        jumlah_per_hari_malam: row[headers.indexOf('jumlah_per_hari_malam')] || null,
        jumlah_harga: row[headers.indexOf('jumlah_harga')] || null
      },
      uang_harian: {
        id_sppd: row[headers.indexOf('id_sppd')] || null,
        jumlah_hari: row[headers.indexOf('jumlah_hari')] || null,
        satuan: row[headers.indexOf('satuan')] || null,
        jumlah: row[headers.indexOf('jumlah')] || null
      },
      biaya_perjalanan_dinas: {
        id_sppd: row[headers.indexOf('id_sppd')] || null,
        keterangan: row[headers.indexOf('keterangan')] || null,
        jumlah: row[headers.indexOf('jumlah')] || null
      }
    }
  })

  return {
    tahun_anggaran: 2024, // Atau sesuai dengan data yang ada
    satker: '', // Atau sesuai dengan data yang ada
    rekap_perjalanan_dinas: formattedData
  }
}
</script>

<template>
  <div
    class="upload-container"
    @drop="handleDrop"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
  >
    <div v-if="uploading" class="upload-progress">
      <p>Uploading: {{ progress }}%</p>
      <div class="progress-bar">
        <div class="progress-bar-fill" :style="{ width: progress + '%' }"></div>
      </div>
    </div>

    <div v-else>
      <label class="file-upload-label">
        <input type="file" @change="handleFileSelect" accept=".xlsx, .xls" />
        <span class="upload-message"
          >Drag and drop an Excel file here, or click to select one.</span
        >
      </label>
    </div>
  </div>
</template>

<style scoped>
.upload-container {
  width: 100%;
  height: 80vh;
  border: 2px dashed #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
}

.upload-progress {
  text-align: center;
}

.progress-bar {
  width: 100%;
  height: 20px;
  background-color: #e0e0e0;
}

.progress-bar-fill {
  height: 100%;
  background-color: #007bff;
  transition: width 0.5s;
}

.file-upload-label {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: relative;
}

.file-upload-label input[type='file'] {
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
}

.upload-message {
  text-align: center;
  font-size: 18px;
  color: #000000;
  padding: 10px;
  background: rgba(255, 255, 255, 0.7); /* Optional background to make text more readable */
  border-radius: 5px;
}
</style>
