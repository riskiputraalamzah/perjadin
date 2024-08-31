<script setup>
import { useIDBStore } from '@/stores/IDB'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const idbStore = useIDBStore()
const route = useRoute()
const noST = route.params.noST

const detailDelegasi = ref({})

onMounted(async () => {
  const delegasi = await idbStore.fetchData('delegasiPegawai')
  detailDelegasi.value = delegasi.find((data) => data.noST.noST == noST)
})
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
  </div>
</template>
