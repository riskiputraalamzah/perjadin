<script setup>
import { ref } from 'vue'
import * as XLSX from 'xlsx'
import { Toast } from '@/components/ToastAlert' // Import komponen toast alert

const isDragging = ref(false)
const uploading = ref(false)

const progress = ref(0)

const handleDrop = (event) => {
  event.preventDefault()
  isDragging.value = false

  const files = event.dataTransfer.files
  if (files.length) {
    const file = files[0]
    if (validateFile(file)) {
      uploading.value = true
      simulateUpload(file)
    }
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
    if (validateFile(file)) {
      uploading.value = true
      simulateUpload(file)
    }
  }
}

// Fungsi validasi file, hanya memperbolehkan file Excel
const validateFile = (file) => {
  const allowedExtensions = /(\.xls|\.xlsx)$/i
  if (!allowedExtensions.exec(file.name)) {
    showToast('Please upload a valid Excel file (.xls or .xlsx).')
    return false
  }
  return true
}

// Fungsi untuk menampilkan toast alert
const showToast = (message) => {
  // Menampilkan toast alert dengan pesan error
  Toast.fire({
    icon: 'error',
    title: message
  })
}

// Fungsi simulasi upload file
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

// Fungsi untuk membaca dan memproses file Excel
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
  console.log(data)
}

// objek spm
</script>

<template>
  <div
    class="upload-container"
    @drop="handleDrop"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop.stop.prevent
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
        <div class="d-flex flex-column align-items-center">
          <i class="ti ti-upload icon text-dark display-6"></i>
          <span class="upload-message"
            >Drag and drop an Excel file here, or click to select one.</span
          >
        </div>
      </label>
    </div>
  </div>
</template>

<style scoped>
.upload-container {
  width: 100%;
  height: 80vh;
  border: 2px dashed #6e6e6e;
  border-radius: 10px;
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
