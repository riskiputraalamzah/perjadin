<template>
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
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
          <button
            type="button"
            :class="[`btn btn-${actionType == 'add' ? 'primary' : 'warning'}`]"
            @click="handleAction"
          >
            {{ confirmButtonText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Props untuk judul modal, teks tombol konfirmasi, dan tipe aksi
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  confirmButtonText: {
    type: String,
    default: 'Understood'
  },
  actionType: {
    type: String,
    default: 'add' // 'add' atau 'edit'
  },
  data: {
    type: Object,
    default: () => ({})
  }
})

// Ref untuk merujuk ke elemen modal
const modalRef = ref(null)

// Emit event 'confirm' dengan payload aksi dan data
const handleAction = () => {
  emit('confirm', { actionType: props.actionType, data: props.data })
}

// Memancarkan event ke komponen induk
const emit = defineEmits(['confirm'])
</script>
