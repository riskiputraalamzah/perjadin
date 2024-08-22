<script setup>
import { useMainStore } from './stores/main'
const store = useMainStore()

import DashboardTemplateView from './views/DashboardTemplateView.vue'
import AuthTemplateView from './views/Auth/AuthTemplateView.vue'
</script>

<template>
  <DashboardTemplateView v-if="store.login" />
  <AuthTemplateView v-else />
</template>
