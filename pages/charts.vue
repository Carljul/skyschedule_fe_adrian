<template>
  <div v-if="isLoading" class="main-charts-page container mb-10">
      <div class="columns-1 mb-10">
        <BarChart
          title="Total Number of Impressions by Print Type"
          :data="barChartData"
          :filter="barChartDataFilter"
        />
      </div>
      <div class="columns-1 mb-10">
        <LineChart
          title="Total Number of Orders by Date"
          :data="lineChartOrdersData"
        />
      </div>
      <div class="grid grid-cols-2 gap-2 mb-10">
        <LineChart
          title="Total Number of Line Items by Date"
          :data="lineChartLineItemsData"
        />
        <PieChart
          title="Total Number of Print Types by Date"
          :data="pieChartData"
        />
      </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import BarChart from '../page-components/charts/BarChart'
import LineChart from '../page-components/charts/LineChart'
import PieChart from '../page-components/charts/PieChart'

export default {
  name: "MainChartsPage",
  layout: "main",
  middleware: ['auth'],
  ssr: false,
  components: {
    BarChart,
    LineChart,
    PieChart
  },
  head() {
      return {
          title: 'Charts' + this.theAppTitle
      }
  },
  data() {
    return {
      lineChartOrdersData: [],
      lineChartLineItemsData: [],
      barChartData: [],
      barChartDataFilter: [],
      pieChartData: [],
      isLoading: false
    }
  },
  computed: {
    // Assigning chartData state to chartData to be used in this page
    ...mapState({
      chartData: (state) => state.chart.chartData.chartData
    })
  },
  async created() {
    await this.assignPage('Charts')
    // Requesting for data from API
    await this.$store.dispatch({
      type: 'chart/chartData/fetchChartData'
    })

    // Dispatching each data to its specific data list
    this.lineChartOrdersData = this.chartData.lineChartOrdersData
    this.lineChartLineItemsData = this.chartData.lineChartLineItemsData
    this.barChartData = this.chartData.barChartData
    this.barChartDataFilter = this.chartData.barChartDataFilter
    this.pieChartData = this.chartData.pieChartData
    this.isLoading = true
    console.log(this.chartData)
  },
  methods: {
    ...mapActions('global', [
      'assignPage',
    ]),
  }
}
</script>