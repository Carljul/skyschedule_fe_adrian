<template>
  <div class="chart-container bg-violet-400">
    <div class="title bg-violet-400">
      <h4>{{ title }}</h4>
      <select v-show="isWithFilter" class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option v-for="(item, index) in filter" :value="item.id">{{ item.name }}</option>
      </select>
    </div>
    <div class="chart">
      <Bar
        :chart-options="chartOptions"
        :options="otherOptions"
        :chart-data="chartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :plugins="plugins"
        :css-classes="cssClasses"
        :styles="styles"
        :tooltip="false"
        ref="barChart"
      />
    </div>
    <div class="p-relative chartAddon" v-html="extraHTML"></div>
  </div>
</template>
<script>
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Filler } from 'chart.js';
import ChartJSPluginDatalabels from 'chartjs-plugin-datalabels'
ChartJS.register(Title, Tooltip, Legend, ChartJSPluginDatalabels, BarElement, CategoryScale, LinearScale, Filler)

export default {
  name: "BarChartComponent",
  components: {
    Bar,
    ChartJSPluginDatalabels
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    extraHTML: {
      type: String, 
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    isWithFilter: {
      type: Boolean, 
      default: true
    },
    filter: {
      type: Array,
      default: null
    },
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Object,
      default: () => {},
    },
    otherOptions: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    loaded: false,
    chartData: null
  }),
  data() {
    return {
      chartData: Object.keys(this.data).length > 0 ? {
        labels: this.data != null ? this.data.labels : [],
        datasets: this.data != null ? this.data.datasets : []
      } : {},
      chartOptions: this.options,
    }
  },
  watch: {
    data: function(newdata, olddata) {
      this.chartData = {
        labels: newdata.labels,
        datasets: newdata.datasets
      }
    },
  },
}
</script>