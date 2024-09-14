<script setup>
import { onMounted } from 'vue'
import { useIDBStore } from '@/stores/IDB'
import { RouterView } from 'vue-router'
import dbUser from '@/data/users.json'

const idbStore = useIDBStore()

const sources = [
  '/assets/libs/jquery/dist/jquery.min.js',
  '/assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js'
]

const loadScript = (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.async = true
    script.onload = () => resolve(url)
    script.onerror = () => reject(new Error(`Failed to load script: ${url}`))

    document.body.appendChild(script)
  })
}

const loadScriptsSequentially = async () => {
  try {
    for (const script of sources) {
      await loadScript(script)
    }
    console.log('All Auth scripts loaded successfully')
  } catch (error) {
    console.error('Error loading scripts:', error)
  }
}

const initDBSeeder = async () => {
  try {
    console.log('Checking database existence...')
    const dbExist = await idbStore.checkDB()
    if (!dbExist) {
      console.log('Database does not exist. Initializing...')

      // Inisialisasi object stores lainnya
      const otherStores = ['users', 'pegawai', 'suratTugas', 'sppd', 'delegasiPegawai', 'sp2d']
      for (const store of otherStores) {
        console.log(`Initializing ${store}...`)

        if (store == 'users') {
          await idbStore.storeToDB(store, dbUser) // Simpan data kosong atau data awal
        } else {
          await idbStore.storeToDB(store, []) // Simpan data kosong atau data awal
        }
      }

      console.log('Seeder data berhasil')
    } else {
      console.log('Database already exists. Skipping initialization.')
    }
  } catch (error) {
    console.error('Error initializing database:', error)
  }
}

// Gunakan onMounted untuk memastikan initDB hanya dipanggil saat komponen di-mount
onMounted(() => {
  console.log('Auth mounted')
  loadScriptsSequentially()
  initDBSeeder()
})
</script>

<template>
  <div
    class="page-wrapper"
    id="main-wrapper"
    data-layout="vertical"
    data-navbarbg="skin6"
    data-sidebartype="full"
    data-sidebar-position="fixed"
    data-header-position="fixed"
  >
    <div
      class="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center"
    >
      <div class="d-flex align-items-center justify-content-center w-100 py-5">
        <div class="row justify-content-center w-100">
          <div class="col-md-8 col-lg-6 col-xxl-3">
            <div class="card mb-0">
              <RouterView />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.parent-toggle-password {
  position: relative;
}
.parent-toggle-password .icon {
  position: absolute;
  right: 0;
  top: calc(50% + 3px);
  transform: translateX(-50%);
  font-size: 20px;
  cursor: pointer;
}
</style>
