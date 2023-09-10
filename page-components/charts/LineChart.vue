<template>
  <div class="chart-container bg-violet-400">
    <div class="title bg-violet-400">
      <h4>{{ title }}</h4>
    </div>
    <div class="chart">
      <my-line-chart
        :options="chartOptions"
        :chartData="chartData"
      />
    </div>
  </div>
</template>
<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line as MyLineChart } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default {
  name: "LineChartComponent",
  components: {
    MyLineChart
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
        legend: {
          display: false
        }
      }
    }
  }
}
</script>
