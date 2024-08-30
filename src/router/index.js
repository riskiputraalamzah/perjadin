import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/Auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { mustLogin: true },
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/init-db',
      name: 'initDB',
      meta: { mustLogin: true },
      component: () => import('../views/InitDataView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      meta: { mustLogin: true },
      component: () => import('../views/Profile/MainProfile.vue')
    },
    {
      path: '/profile/edit',
      name: 'profileEdit',
      meta: { mustLogin: true },
      component: () => import('../views/Profile/EditProfile.vue')
    },
    {
      path: '/pegawai',
      name: 'pegawai',
      meta: { mustLogin: true },
      component: () => import('../views/Pegawai/MainPegawaiView.vue')
    },
    {
      path: '/surat-tugas',
      name: 'suratTugas',
      meta: { mustLogin: true },
      component: () => import('../views/ST/MainSTView.vue')
    },
    {
      path: '/surat-perintah-perjalanan-dinas',
      name: 'sppd',
      meta: { mustLogin: true },
      component: () => import('../views/SPPD/MainSPPDView.vue')
    },
    {
      path: '/delegasi-pegawai',
      name: 'delegasi',
      meta: { mustLogin: true },
      component: () => import('../views/Delegasi/MainDelegasiViews.vue')
    },
    {
      path: '/delegasi-pegawai/add',
      name: 'addDelegasi',
      meta: { mustLogin: true },
      component: () => import('../views/Delegasi/AddDelegasiViews.vue')
    },
    {
      path: '/delegasi-pegawai/:noST',
      name: 'detailDelegasi',
      meta: { mustLogin: true },
      component: () => import('../views/Delegasi/DetailDelegasiViews.vue')
    },
    {
      path: '/laporan',
      name: 'laporan',
      meta: { mustLogin: true },
      component: () => import('../views/LaporanView.vue')
    },
    {
      path: '/cek-surat-perintah',
      name: 'cekSp',
      meta: { mustLogin: true },
      component: () => import('../views/SuratPerintahView.vue')
    },
    {
      path: '/kwitansi',
      name: 'kwitansi',
      meta: { mustLogin: true },
      component: () => import('../views/KwitansiView.vue')
    },
    {
      path: '/rekap-data',
      name: 'rekap',
      meta: { mustLogin: true },
      component: () => import('../views/RekapDataView.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: { mustLogin: false },
      component: () => import('../views/Auth/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: { mustLogin: false },
      component: () => import('../views/Auth/RegisterView.vue')
    }
  ]
})
// router/index.js atau router.js
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isLoggedIn = authStore.checkLoginStatus()

  if (to.meta.mustLogin) {
    return isLoggedIn ? next() : next('/login')
  }

  if (isLoggedIn && ['login', 'register'].includes(to.name)) {
    return next('/')
  }

  next()
})

export default router
