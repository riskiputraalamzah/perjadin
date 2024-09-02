<script setup>
import { ref } from 'vue'

const chartOptions = ref({
  chart: {
    height: 350,
    type: 'bar',
    toolbar: {
      show: false // Nonaktifkan toolbar
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth'
  },
  title: {
    text: 'Sales Trends',
    align: 'left'
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
  }
})

const chartSeries = ref([
  {
    name: 'Sales',
    data: [30, 40, 35, 50, 49, 60, 70]
  }
])
</script>

<template>
  <div>
    <apexchart :options="chartOptions" :series="chartSeries" />
  </div>
</template>
