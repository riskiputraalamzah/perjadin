<script setup>
import { ref } from 'vue'
const user = ref(JSON.parse(localStorage.getItem('user')))
</script>

<template>
  <h1>Hai, {{ user.name }}</h1>
</template>
