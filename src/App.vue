<script setup>
import { defineAsyncComponent, computed } from 'vue'
import { useRoute } from 'vue-router'

// Lazy load komponen secara dinamis
const DashboardTemplateView = defineAsyncComponent(
  () => import('./views/DashboardTemplateView.vue')
)
const AuthTemplateView = defineAsyncComponent(() => import('./views/Auth/AuthTemplateView.vue'))

const route = useRoute()

const layoutComponent = computed(() =>
  route.meta.mustLogin ? DashboardTemplateView : AuthTemplateView
)
</script>

<template>
  <component :is="layoutComponent" />
</template>
