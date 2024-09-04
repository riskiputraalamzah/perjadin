<script setup>
import { RouterView } from 'vue-router'
import SidebarItem from '@/components/SidebarItem.vue'
import HeaderItem from '@/components/HeaderItem.vue'

const sources = [
  '/assets/libs/jquery/dist/jquery.min.js',
  '/assets/libs/bootstrap/dist/js/bootstrap.bundle.min.js',
  '/assets/js/app.min.js',
  '/assets/libs/apexcharts/dist/apexcharts.min.js',
  '/assets/libs/simplebar/dist/simplebar.js'
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
      // console.log(`Script loaded: ${script}`)
    }
    console.log('All Dashboard scripts loaded successfully')
    // Optionally, execute code that depends on the scripts
  } catch (error) {
    console.error('Error loading scripts:', error)
  }
}

loadScriptsSequentially()
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
    <!-- Sidebar Start -->
    <SidebarItem />
    <!--  Sidebar End -->
    <!--  Main wrapper -->
    <div class="body-wrapper">
      <!--  Header Start -->
      <HeaderItem />
      <!--  Header End -->
      <div class="container-fluid">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style>
table th {
  text-align: center;
}

table td {
  vertical-align: middle;
  text-wrap: nowrap;
  text-align: center;
}
table td * {
  margin: 10px !important;
}
</style>
