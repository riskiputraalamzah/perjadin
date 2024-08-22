import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useMainStore } from '@/stores/main'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { mustLogin: true },
      component: HomeView
    },
    {
      path: '/pegawai',
      name: 'pegawai',
      meta: { mustLogin: true },
      component: () => import('../views/PegawaiView.vue')
    },
    {
      path: '/surat-tugas',
      name: 'suratTugas',
      meta: { mustLogin: true },
      component: () => import('../views/SuratTugasView.vue')
    },
    {
      path: '/surat-perintah-perjalanan-dinas',
      name: 'sppd',
      meta: { mustLogin: true },
      component: () => import('../views/SPPDView.vue')
    },
    {
      path: '/laporan',
      name: 'laporan',
      meta: { mustLogin: true },
      component: () => import('../views/LaporanView.vue')
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
      component: () => import('../views/Auth/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Auth/RegisterView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = useMainStore()
  to.meta.mustLogin && !store.login ? next({ name: 'login' }) : next()
})
export default router
