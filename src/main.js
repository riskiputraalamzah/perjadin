import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

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
    }
  }
})

app.mount('#app')
