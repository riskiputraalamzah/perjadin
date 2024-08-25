<template>
  <aside class="left-sidebar">
    <!-- Sidebar scroll-->
    <div>
      <div class="brand-logo d-flex align-items-center justify-content-between">
        <router-link class="text-nowrap logo-img d-flex align-items-center g-3" to="/">
          <img src="/assets/images/gmbr_3.png" width="80" alt="" />
          <span class="h3 text-dark">Perjadin</span></router-link
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
              class="sidebar-link"
              exact-active-class="active"
              active-class="active"
            >
              <span>
                <i class="ti ti-user"></i>
              </span>
              <span class="hide-menu">My Profile</span>
            </router-link>
            <router-link
              to="/init-db"
              class="sidebar-link"
              exact-active-class="active"
              active-class="active"
            >
              <span>
                <i class="ti ti-file-upload"></i>
              </span>
              <span class="hide-menu">Inisiasi Data</span>
            </router-link>
          </li>
          <li class="nav-small-cap">
            <i class="ti ti-dots nav-small-cap-icon fs-4"></i>
            <span class="hide-menu">Manajemen</span>
          </li>

          <li class="sidebar-item">
            <router-link to="/pegawai" class="sidebar-link" exact-active-class="active">
              <span>
                <i class="ti ti-users"></i>
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
          <li class="sidebar-item" title="Surat Perintah Perjalanan Dinas">
            <router-link :to="{ name: 'sppd' }" class="sidebar-link" exact-active-class="active">
              <span>
                <i class="ti ti-file-description"></i>
              </span>
              <span class="hide-menu">SPPD </span>
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
          </li>
        </ul>
      </nav>
      <!-- End Sidebar navigation -->
    </div>
    <!-- End Sidebar scroll-->
  </aside>
</template>
