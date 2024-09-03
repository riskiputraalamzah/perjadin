<script setup>
import { ref } from 'vue'

const chartOptions = ref({
  chart: {
    type: 'bar',
    toolbar: {
      show: false
    },
    animations: {
      enabled: true, // Mengaktifkan animasi
      easing: 'easeinout', // Pengaturan easing untuk animasi
      speed: 800, // Durasi animasi dalam milidetik
      animateGradually: {
        enabled: true,
        delay: 150 // Penundaan antar bar
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350 // Durasi animasi ketika data diperbarui
      }
    }
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded'
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
  },
  yaxis: {
    title: {
      text: '$ (thousands)'
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return '$ ' + val + ' thousands'
      }
    }
  }
})

const chartSeries = ref([
  {
    name: 'Net Profit',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
  },
  {
    name: 'Revenue',
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
  },
  {
    name: 'Free Cash Flow',
    data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
  }
])

const piechartOptions = ref({
  chart: {
    type: 'pie'
  },
  title: {
    text: 'Sales Trends',
    align: 'left'
  },
  labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom'
        }
      }
    }
  ]
})

const series = ref([44, 55, 13, 43, 22])
</script>

<template>
  <div>
    <div class="row gy-4">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <apexchart type="bar" :options="chartOptions" :series="chartSeries" />
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <apexchart type="pie" :options="piechartOptions" :series="series" />
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="card w-100">
          <div class="card-body p-4">
            <h5 class="card-title fw-semibold mb-4">Recent Transactions</h5>
            <div class="table-responsive">
              <table class="table text-nowrap mb-0 align-middle">
                <thead class="text-dark fs-4">
                  <tr>
                    <th class="border-bottom-0">
                      <h6 class="fw-semibold mb-0">Id</h6>
                    </th>
                    <th class="border-bottom-0">
                      <h6 class="fw-semibold mb-0">Assigned</h6>
                    </th>
                    <th class="border-bottom-0">
                      <h6 class="fw-semibold mb-0">Name</h6>
                    </th>
                    <th class="border-bottom-0">
                      <h6 class="fw-semibold mb-0">Priority</h6>
                    </th>
                    <th class="border-bottom-0">
                      <h6 class="fw-semibold mb-0">Budget</h6>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border-bottom-0"><h6 class="fw-semibold mb-0">1</h6></td>
                    <td class="border-bottom-0">
                      <h6 class="fw-semibold mb-1">Sunil Joshi</h6>
                      <span class="fw-normal">Web Designer</span>
                    </td>
                    <td class="border-bottom-0">
                      <p class="mb-0 fw-normal">Elite Admin</p>
                    </td>
                    <td class="border-bottom-0">
                      <div class="d-flex align-items-center gap-2">
                        <span class="badge bg-primary rounded-3 fw-semibold">Low</span>
                      </div>
                    </td>
                    <td class="border-bottom-0">
                      <h6 class="fw-semibold mb-0 fs-4">$3.9</h6>
                    </td>
                  </tr>
                  <tr>
                    <td class="border-bottom-0"><h6 class="fw-semibold mb-0">2</h6></td>
                    <td class="border-bottom-0">
                      <h6 class="fw-semibold mb-1">Andrew McDownland</h6>
                      <span class="fw-normal">Project Manager</span>
                    </td>
                    <td class="border-bottom-0">
                      <p class="mb-0 fw-normal">Real Homes WP Theme</p>
                    </td>
                    <td class="border-bottom-0">
                      <div class="d-flex align-items-center gap-2">
                        <span class="badge bg-secondary rounded-3 fw-semibold">Medium</span>
                      </div>
                    </td>
                    <td class="border-bottom-0">
                      <h6 class="fw-semibold mb-0 fs-4">$24.5k</h6>
                    </td>
                  </tr>
                  <tr>
                    <td class="border-bottom-0"><h6 class="fw-semibold mb-0">3</h6></td>
                    <td class="border-bottom-0">
                      <h6 class="fw-semibold mb-1">Christopher Jamil</h6>
                      <span class="fw-normal">Project Manager</span>
                    </td>
                    <td class="border-bottom-0">
                      <p class="mb-0 fw-normal">MedicalPro WP Theme</p>
                    </td>
                    <td class="border-bottom-0">
                      <div class="d-flex align-items-center gap-2">
                        <span class="badge bg-danger rounded-3 fw-semibold">High</span>
                      </div>
                    </td>
                    <td class="border-bottom-0">
                      <h6 class="fw-semibold mb-0 fs-4">$12.8k</h6>
                    </td>
                  </tr>
                  <tr>
                    <td class="border-bottom-0"><h6 class="fw-semibold mb-0">4</h6></td>
                    <td class="border-bottom-0">
                      <h6 class="fw-semibold mb-1">Nirav Joshi</h6>
                      <span class="fw-normal">Frontend Engineer</span>
                    </td>
                    <td class="border-bottom-0">
                      <p class="mb-0 fw-normal">Hosting Press HTML</p>
                    </td>
                    <td class="border-bottom-0">
                      <div class="d-flex align-items-center gap-2">
                        <span class="badge bg-success rounded-3 fw-semibold">Critical</span>
                      </div>
                    </td>
                    <td class="border-bottom-0">
                      <h6 class="fw-semibold mb-0 fs-4">$2.4k</h6>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
