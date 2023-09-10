<template>
  <div class="chart-container bg-violet-400">
    <div class="title bg-violet-400">
      <h4>{{ title }}</h4>
    </div>
    <div class="chart">
      <Pie
        :options="chartOptions"
        :chartData="chartData"
      />
    </div>
  </div>
</template>
<script>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'


ChartJS.register(ArcElement, Tooltip, Legend)
export default {
  name: "LineChartComponent",
  components: {
    Pie
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chartData: {
        labels: this.data.labels,
        datasets: this.data.datasets
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legends: {
          display: false
        }
      }
    }
  }
}
</script>
