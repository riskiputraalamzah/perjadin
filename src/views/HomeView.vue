<script setup>
import { useIDBStore } from '@/stores/IDB'
import { onMounted, ref, watch } from 'vue'

const idbStore = useIDBStore()

// Reactive allData object
const allData = ref({
  users: [],
  pegawai: [],
  suratTugas: [],
  sppd: [],
  delegasiPegawai: [],
  sp2d: []
})

// Extract delegasiPegawaiData for use in the template
const delegasiPegawaiData = ref([])

// Chart options for bar chart
const chartOptions = ref({
  chart: {
    type: 'bar',
    toolbar: {
      show: false
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150
      },
      dynamicAnimation: {
        enabled: true,
        speed: 350
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
    categories: ['Users', 'Pegawai', 'Surat Tugas', 'SPPD', 'Delegasi Pegawai', 'SP2D']
  },
  yaxis: {
    title: {
      text: 'Data Count'
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + ' entries'
      }
    }
  }
})

// Bar chart series
const chartSeries = ref([
  {
    name: 'Data Count',
    data: [0, 0, 0, 0, 0, 0] // Initial empty data
  }
])

// Pie chart options
const piechartOptions = ref({
  chart: {
    type: 'pie'
  },
  title: {
    text: 'Data Distribution by Object Store',
    align: 'left'
  },
  labels: ['Users', 'Pegawai', 'Surat Tugas', 'SPPD', 'Delegasi Pegawai', 'SP2D'],
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

// Pie chart series
const series = ref([0, 0, 0, 0, 0, 0]) // Initial empty data

// Function to export all data from IndexedDB and update `allData`
const exportAllDataToJSON = async () => {
  const stores = ['users', 'pegawai', 'suratTugas', 'sppd', 'delegasiPegawai', 'sp2d']
  const data = {}

  for (const store of stores) {
    const storeData = await idbStore.getAllDataFromStore(store)
    data[store] = storeData
  }

  allData.value = data
  delegasiPegawaiData.value = data['delegasiPegawai'] // Set delegasiPegawaiData
}

// Function to update the chart data after fetching data from IndexedDB
const updateChartData = () => {
  chartSeries.value[0].data = [
    allData.value['users'].length,
    allData.value['pegawai'].length,
    allData.value['suratTugas'].length,
    allData.value['sppd'].length,
    allData.value['delegasiPegawai'].length,
    allData.value['sp2d'].length
  ]

  series.value = [
    allData.value['users'].length,
    allData.value['pegawai'].length,
    allData.value['suratTugas'].length,
    allData.value['sppd'].length,
    allData.value['delegasiPegawai'].length,
    allData.value['sp2d'].length
  ]
}

// Fetch data on component mount and update the charts
onMounted(async () => {
  await exportAllDataToJSON()
  updateChartData() // Update the chart data after fetching from IndexedDB
})

// Watch for changes in `allData` to automatically update the charts
watch(
  allData,
  () => {
    updateChartData()
  },
  { deep: true }
)
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
            <h5 class="card-title fw-semibold mb-4">Pendelegasian Pegawai</h5>
            <div class="table-responsive">
              <table class="table text-nowrap mb-0 align-middle">
                <thead class="text-dark fs-4">
                  <tr>
                    <th class="border-bottom-0">
                      <h6 class="fw-semibold mb-0">Nama Pegawai</h6>
                    </th>
                    <th class="border-bottom-0">
                      <h6 class="fw-semibold mb-0">Tujuan</h6>
                    </th>
                    <th class="border-bottom-0">
                      <h6 class="fw-semibold mb-0">Berapa Lama</h6>
                    </th>
                    <th class="border-bottom-0">
                      <h6 class="fw-semibold mb-0">Total Uang</h6>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Looping over delegasiPegawai data -->
                  <template v-for="delegasi in delegasiPegawaiData" :key="delegasi.id">
                    <template v-for="relation in delegasi.relation" :key="relation.id">
                      <tr>
                        <td>
                          {{ relation.pegawai.namaPegawai }}
                        </td>
                        <td>
                          {{ relation.noSPPD.tujuan }}
                        </td>
                        <td>{{ relation.noSPPD.lamaPenugasan }} hari</td>
                        <td>
                          {{ formatRupiah(relation.totalSemuaDana) }}
                        </td>
                      </tr>
                    </template>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
