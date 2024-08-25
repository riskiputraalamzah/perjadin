<template>
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
    ref="modalRef"
  >
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">{{ title }}</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <slot name="body">Default Body Content</slot>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="confirm">
            {{ confirmButtonText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Props untuk judul modal dan teks tombol konfirmasi
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  confirmButtonText: {
    type: String,
    default: 'Understood'
  }
})

// Ref untuk merujuk ke elemen modal
const modalRef = ref(null)

// Fungsi untuk menangani konfirmasi tombol
const confirm = () => {
  // Memancarkan event 'confirm' ke komponen induk
  emit('confirm')
}

// Memancarkan event ke komponen induk
const emit = defineEmits(['confirm'])
</script>
