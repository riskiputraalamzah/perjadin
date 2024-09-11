import { defineStore } from 'pinia'
export const useMainStore = defineStore('main', {
  state: () => ({
    login: false,
    manageIdDelegasi: null,
    dataPegawai: null,
    dataST: null,
    dataSPM: null,
    dataSP2D: null,
    dataSPPD: null,
    dataDelegasiPegawai: null
  })
})
