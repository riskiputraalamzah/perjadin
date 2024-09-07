import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueApexCharts from 'vue3-apexcharts'

import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  locale: 'en-GB' // Locale yang menggunakan format dd/mm/yyyy
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueApexCharts)
app.use(i18n)
app.mixin({
  methods: {
    formatRupiah(value) {
      if (!value) return ''
      const formatted = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      return `Rp ${formatted}`
    },
    unformatRupiah(value) {
      if (!value) return ''
      return parseInt(value.replace(/[^0-9]/g, ''), 10)
    },
    formatDate(dateString) {
      if (!dateString) return ''

      const options = { day: 'numeric', month: 'long', year: 'numeric' }
      const date = new Date(dateString)

      return date.toLocaleDateString('id-ID', options) // 'id-ID' untuk format Indonesia
    },
    createAvatar(row) {
      const avatar =
        'file' in row
          ? URL.createObjectURL(row.file)
          : new URL('/assets/images/user-1.jpg', import.meta.url).href

      return avatar
    }
  }
})

app.mount('#app')
