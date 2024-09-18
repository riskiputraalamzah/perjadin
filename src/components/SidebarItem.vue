<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const isActive = (path) => {
  return route.path.startsWith(path)
}
</script>
<template>
  <aside class="left-sidebar">
    <!-- Sidebar scroll-->
    <div>
      <div class="brand-logo d-flex align-items-center justify-content-between">
        <router-link class="text-nowrap logo-img d-flex mx-auto align-items-center" to="/">
          <!-- <img src="/assets/images/logo.png" width="80" alt="" /> -->
          <div
            class="h1 m-0"
            style="font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif"
          >
            <span>PER - </span>
            <span class="text-primary">JADIN</span>
          </div></router-link
        >

        <div class="close-btn d-xl-none d-block sidebartoggler cursor-pointer" id="sidebarCollapse">
          <i class="ti ti-x fs-8"></i>
        </div>
      </div>
      <!-- Sidebar navigation-->
      <nav class="sidebar-nav scroll-sidebar" data-simplebar="">
        <ul id="sidebarnav">
          <li class="nav-small-cap">
            <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
            <span class="hide-menu">Home</span>
          </li>
          <li class="sidebar-item">
            <router-link
              to="/"
              class="sidebar-link"
              exact-active-class="active"
              active-class="active"
            >
              <span>
                <i class="ti ti-layout-dashboard"></i>
              </span>
              <span class="hide-menu">Dashboard</span>
            </router-link>
            <router-link
              to="/profile"
              :class="['sidebar-link', isActive('/profile') ? 'active' : '']"
            >
              <span>
                <i class="ti ti-user"></i>
              </span>
              <span class="hide-menu">My Profile</span>
            </router-link>
            <!-- <router-link
              to="/init-db"
              class="sidebar-link"
              exact-active-class="active"
              active-class="active"
            >
              <span>
                <i class="ti ti-file-upload"></i>
              </span>
              <span class="hide-menu">Inisiasi Data</span>
            </router-link> -->
          </li>
          <li class="nav-small-cap">
            <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
            <span class="hide-menu">Manajemen</span>
          </li>

          <li class="sidebar-item">
            <router-link to="/pegawai" class="sidebar-link" exact-active-class="active">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="icon icon-tabler icons-tabler-outline icon-tabler-users-group"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                  <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" />
                  <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                  <path d="M17 10h2a2 2 0 0 1 2 2v1" />
                  <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                  <path d="M3 13v-1a2 2 0 0 1 2 -2h2" />
                </svg>
              </span>
              <span class="hide-menu">Pegawai</span>
            </router-link>
          </li>

          <li class="sidebar-item">
            <router-link to="/surat-tugas" class="sidebar-link" exact-active-class="active">
              <span>
                <i class="ti ti-file-description"></i>
              </span>
              <span class="hide-menu">Surat Tugas</span>
            </router-link>
          </li>

          <li class="sidebar-item">
            <router-link :to="{ name: 'sppd' }" class="sidebar-link" exact-active-class="active">
              <span>
                <i class="ti ti-file-description"></i>
              </span>
              <span class="hide-menu">SPPD </span>
            </router-link>
          </li>
          <li class="sidebar-item">
            <router-link
              :to="{ name: 'delegasi' }"
              :class="['sidebar-link', isActive('/delegasi-pegawai') ? 'active' : '']"
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="icon icon-tabler icons-tabler-outline icon-tabler-calendar-user"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 21h-6a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v4.5" />
                  <path d="M16 3v4" />
                  <path d="M8 3v4" />
                  <path d="M4 11h16" />
                  <path d="M19 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                  <path d="M22 22a2 2 0 0 0 -2 -2h-2a2 2 0 0 0 -2 2" />
                </svg>
              </span>
              <span class="hide-menu">Delegasi Pegawai</span>
            </router-link>
          </li>

          <li class="sidebar-item">
            <router-link to="/spm" :class="['sidebar-link', isActive('/spm') ? 'active' : '']">
              <span>
                <i class="ti ti-file-description"></i>
              </span>
              <span class="hide-menu">SPM</span>
            </router-link>
          </li>
          <li class="sidebar-item">
            <router-link to="/sp2d" class="sidebar-link" exact-active-class="active">
              <span>
                <i class="ti ti-file-description"></i>
              </span>
              <span class="hide-menu">SP2D</span>
            </router-link>
          </li>
          <li class="nav-small-cap">
            <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
            <span class="hide-menu">PAPER</span>
          </li>
          <li class="sidebar-item">
            <router-link to="/laporan" class="sidebar-link" exact-active-class="active">
              <span>
                <i class="ti ti-file"></i>
              </span>
              <span class="hide-menu">Laporan ST/SPPD</span>
            </router-link>
          </li>
          <!-- <li class="sidebar-item">
            <router-link :to="{ name: 'cekSp' }" class="sidebar-link" exact-active-class="active">
              <span>
                <i class="ti ti-file-dollar"></i>
              </span>
              <span class="hide-menu">Data SPM/SP2D</span>
            </router-link>
          </li>
          <li class="sidebar-item">
            <router-link to="/kwitansi" class="sidebar-link" exact-active-class="active">
              <span>
                <i class="ti ti-file-invoice"></i>
              </span>
              <span class="hide-menu">Kwitansi</span>
            </router-link>
          </li>
          <li class="sidebar-item">
            <router-link to="/rekap-data" class="sidebar-link" exact-active-class="active">
              <span>
                <i class="ti ti-notebook"></i>
              </span>
              <span class="hide-menu">Rekap Data</span>
            </router-link>
          </li> -->
        </ul>
      </nav>
      <!-- End Sidebar navigation -->
    </div>
    <!-- End Sidebar scroll-->
  </aside>
</template>
