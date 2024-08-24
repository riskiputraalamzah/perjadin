<script setup>
import { useIDBStore } from '@/stores/IDB'
import { RouterView } from 'vue-router'
import dbUser from '@/data/users.json'

const idbStore = useIDBStore()

const sources = [
  '/assets/libs/jquery/dist/jquery.min.js',
  '/assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js'
]
// Function to load a script
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

// Load scripts sequentially
const loadScriptsSequentially = async () => {
  try {
    for (const script of sources) {
      await loadScript(script)
      console.log(`Script loaded: ${script}`)
    }
    console.log('All scripts loaded successfully')
    // Optionally, execute code that depends on the scripts
  } catch (error) {
    console.error('Error loading scripts:', error)
  }
}

loadScriptsSequentially()

const initDB = async () => {
  const exist = await idbStore.checkDB()
  if (!exist) {
    await idbStore.storeToDB('users', dbUser)
    return console.log('Seeder data berhasil')
  }
}

initDB()
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
      <div class="d-flex align-items-center justify-content-center w-100">
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
