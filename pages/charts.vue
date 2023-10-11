<template>
  <div class="main-charts-page container mb-10">
      <div class="mb-10 mt-5">
          <breadcrumbs
          :lists="[
              { text: 'Charts' }
          ]"
          />
      </div>
      <div v-if="state.entry.loading" class="flex justify-center align-center mt-10 mb-10">
          <div class="text-center">
              <loader class="primary m-auto" style="display:block;" />
              <span class="text-xs --text-dark font-semibold">Loading</span>
          </div>
      </div>
      <div class="columns-1 mb-10">
        <div class="chart-container bg-violet-400">
          <div class="title bg-violet-400">
            <h4>Total Number of Impressions by Print Type</h4>
            <div style="width: 170px;">
              <client-only>
                <t-select-dynamic
                :endpoint="`/item_status`"
                datakeylabel="id"
                datakeyvalue="id"
                searchplaceholder="Type to Search Status"
                placeholder="Choose Status"
                :value="defaultStatus"
                class="py-1.5"
                @input="e => {
                  defaultStatus = e
                }"
                ></t-select-dynamic>
                <input type="hidden"
                :value="state.inputs.id"
                @input="e => {
                    setState({ handle: 'state.inputs', key: 'id', value: e });
                    validate(e);
                }">
              </client-only>
            </div>
          </div>
          <div class="chart">
            <div id="impressions-by-print-type-chart" style="height: 400px;"></div>
          </div>
        </div>
      </div>
      <div class="columns-1 mb-10">
        <div class="chart-container bg-violet-400">
          <div class="title bg-violet-400">
            <h4>Total Number of Orders by Date</h4>
          </div>
          <div class="chart">
            <div id="orders-by-date-chart" style="height: 400px;"></div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-2 mb-10">

        <div class="chart-container bg-violet-400">
          <div class="title bg-violet-400">
            <h4>Total Number of Line Items by Date</h4>
          </div>
          <div class="chart">
            <div id="line-items-print-types-by-date-chart" style="height: 600px;"></div>
          </div>
        </div>
        <div class="chart-container bg-violet-400">
          <div class="title bg-violet-400">
            <h4>Total Number of Print Types by Date</h4>
            <DateRangePicker v-model="dateData"/>
          </div>
          <div class="chart">
            <div id="print-types-by-date-chart" style="height: 600px;"></div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import Breadcrumbs from "@components/reusables/Breadcrumbs.vue";
import Loader from "@components/reusables/Loader.vue";
import { mapState, mapActions, mapMutations } from "vuex";
import DateRangePicker from "@components/reusables/DateRangePicker.vue";
import TSelectDynamic from "@components/reusables/SelectDynamic.vue";
import AmCharts from 'amcharts3';
import AmSerial from 'amcharts3/amcharts/serial';
import AmPieChart from 'amcharts3/amcharts/pie';
import Light from 'amcharts3/amcharts/themes/light';

export default {
  name: "MainChartsPage",
  layout: "main",
  middleware: ['auth'],
  ssr: false,
  head() {
      return {
          title: 'Charts' + this.theAppTitle
      }
  },
  components: {
    TSelectDynamic,
    DateRangePicker,
    Loader,
    Breadcrumbs
  },
  data() {
    return {
      impressionsChart: null,
      pieChart: null,
      impressionsTotals: [],
      orderTotals: [],
      printTypeLineTotals: [],
      printTypePieTotals: [],
      printTypes: [],
      defaultStatus: '',

      dateData: new Date(),
      startDate: new Date(),
      endDate: new Date()
    }
  },
  watch: {
    defaultStatus: function(newdata, olddata) {
      let itemStatusJson = this.impressionsTotals.filter(function(el) {
        return el.item_status_id === newdata;
      });

      this.impressionsChart.clearLabels();
      this.impressionsChart.dataProvider = itemStatusJson;
      this.impressionsChart.validateData();
    },
    dateData: function(newdata, olddata) {
      console.log(newdata)
      var parsedStartDate = new Date(newdata.start)
      var parsedEndDate = new Date(newdata.end)
      var formattedStartDate = parsedStartDate.getFullYear() + '-' + this.reformatSingleDigits((parsedStartDate.getMonth() + 1)) + '-' + this.reformatSingleDigits(parsedStartDate.getDate())
      var formattedEndDate = parsedEndDate.getFullYear() + '-' + this.reformatSingleDigits((parsedEndDate.getMonth() + 1)) + '-' + this.reformatSingleDigits(parsedEndDate.getDate())
      this.setState({ entry: { ...this.state.entry, filter: { ...this.state.entry.filter, startDate: formattedStartDate, endDate: formattedEndDate } } });
      this.prepareCharts();
    }
  },
  computed: {
    // Assigning chartData state to chartData to be used in this page
    ...mapState({
      state: state => state.chart.chartData.state,
      chartData: (state) => state.chart.chartData.chartData
    })
  },
  async created() {
    await this.assignPage('Charts')
    await this.prepareCharts();
  },
  mounted() {
      this.initCharts();
  },
  methods: {
    ...mapMutations('chart/chartData', [
        'setState',
    ]),
    ...mapActions('global', [
      'assignPage',
    ]),
    ...mapActions('chart/chartData', [
      'fetchChartData',
    ]),
    reformatSingleDigits(n) {
        return n > 9 ? "" + n: "0" + n;
    },
    async prepareCharts() {
      // Requesting for data from API
      await this.fetchChartData()

      // Dispatching each data to its specific data list
      this.impressionsTotals = this.chartData.impressionsTotals;
      this.orderTotals = this.chartData.orderTotals;
      this.printTypeLineTotals = this.chartData.printTypeLineTotals;
      this.printTypePieTotals = this.chartData.printTypePieTotals;
      this.printTypes = this.chartData.printTypes;
      this.defaultStatus = this.chartData.defaultStatus;
    },
    prettyNameOf(uglyName) {
        let name = uglyName.replace(/_/g, " ");
        name = name.replace(/(?:^|\s)\w/g, function(match) {
            return match.toUpperCase();
        });

        return name.length <= 3 && name.toLowerCase() !== "pad"
            ? name.toUpperCase()
            : name;
    },
    displayNoData(event) {
      // Check if data is empty.
      if (
        event.chart.dataProvider === undefined ||
        event.chart.dataProvider.length === 0
      ) {
        // Set display text.
        let displayText =
          'No items with "' +
          this.prettyNameOf(this.defaultStatus) +
          '" status.';

        // Disable slice labels.
        event.chart.labelsEnabled = false;

        // Add label to let users know the chart is empty.
        event.chart.addLabel("50%", "50%", displayText, "middle", 15);

        // Dim the whole chart
        event.chart.alpha = 0.3;
      }
    },
    chartImpressionsByPrintType() {
      this.impressionsChart = window.AmCharts.makeChart("impressions-by-print-type-chart", {
        type: "serial",
        export: {
          enabled: true
        },
        startDuration: 0.5,
        theme: "light",
        valueAxes: [
          {
            id: "v1",
            axisAlpha: 1,
            position: "left"
          }
        ],
        balloon: {
          cornerRadius: 2
        },
        graphs: [
          {
            id: "g1",
            balloonText: "[[category]]: <b>[[value]]</b>",
            type: "column",
            fillAlphas: 0.8,
            fillColorsField: "color",
            lineColorField: "color",
            valueField: "impressions"
          }
        ],
        depth3D: 20,
        angle: 30,
        categoryField: "long_name",
        categoryAxis: {
          autoWrap: true
        },
        listeners: [
          {
            event: "init",
            method: this.displayNoData
          },
          {
            event: "dataUpdated",
            method: this.displayNoData
          }
        ],
        dataProvider: this.impressionsTotals,
      });
      this.impressionsChart.addListener("rendered", this.impressionsChart.zoomToIndexes(this.impressionsChart.dataProvider.length - 40, this.impressionsChart.dataProvider.length - 1));
    },
    chartOrdersByDate() {
      let chart = window.AmCharts.makeChart("orders-by-date-chart", {
        type: "serial",
        theme: "light",
        marginRight: 40,
        marginLeft: 40,
        autoMarginOffset: 20,
        mouseWheelZoomEnabled: true,
        dataDateFormat: "YYYY-MM-DD",
        valueAxes: [
          {
            id: "v1",
            axisAlpha: 0,
            position: "left",
            ignoreAxisWidth: true
          }
        ],
        balloon: {
          borderThickness: 1,
          shadowAlpha: 0
        },
        graphs: [
          {
            id: "g1",
            balloon: {
              drop: true,
              adjustBorderColor: false,
              color: "#ffffff"
            },
            bullet: "round",
            bulletBorderAlpha: 1,
            bulletColor: "#FFFFFF",
            bulletSize: 5,
            hideBulletsCount: 50,
            lineThickness: 2,
            title: "orders",
            useLineColorForBulletBorder: true,
            valueField: "value",
            balloonText: '<span style="font-size:18px;">[[value]]</span>'
          }
        ],
        chartScrollbar: {
          graph: "g1",
          oppositeAxis: false,
          offset: 30,
          scrollbarHeight: 80,
          backgroundAlpha: 0,
          selectedBackgroundAlpha: 0.1,
          selectedBackgroundColor: "#888888",
          graphFillAlpha: 0,
          graphLineAlpha: 0.5,
          selectedGraphFillAlpha: 0,
          selectedGraphLineAlpha: 1,
          autoGridCount: true,
          color: "#AAAAAA"
        },
        chartCursor: {
          pan: true,
          valueLineEnabled: true,
          valueLineBalloonEnabled: true,
          cursorAlpha: 1,
          cursorColor: "#258cbb",
          limitToGraph: "g1",
          valueLineAlpha: 0.2,
          valueZoomable: true
        },
        valueScrollbar: {
          oppositeAxis: false,
          offset: 50,
          scrollbarHeight: 10
        },
        categoryField: "date",
        categoryAxis: {
          parseDates: true,
          dashLength: 1,
          minorGridEnabled: true
        },
        export: {
          enabled: true
        },
        // startDuration: 1,
        dataProvider: this.orderTotals
      });

      chart.addListener("rendered", chart.zoomToIndexes(chart.dataProvider.length - 40, chart.dataProvider.length - 1));
    },
    chartLineItemsByDate() {
      let chart = window.AmCharts.makeChart("line-items-print-types-by-date-chart", {
        type: "serial",
        theme: "light",
        marginRight: 40,
        marginLeft: 40,
        autoMarginOffset: 20,
        mouseWheelZoomEnabled: true,
        dataDateFormat: "YYYY-MM-DD",
        legend: {
          enabled: true
        },
        valueAxes: [
          {
            id: "v1",
            axisAlpha: 0,
            position: "left",
            ignoreAxisWidth: true,
            stackType: "regular"
          }
        ],
        balloon: {
          borderThickness: 1,
          shadowAlpha: 0
        },
        graphs: [
          {
            id: "offset_cups",
            balloon: {
              // drop: true,
              adjustBorderColor: false,
              color: "#ffffff"
            },
            bullet: "round",
            bulletAlpha: 0.7,
            bulletSize: 1,
            hideBulletsCount: 50,
            lineAlpha: 0.1,
            fillAlphas: 0.7,
            title: "Offset Cups",
            useLineColorForBulletBorder: true,
            valueField: "offset_cups"
            // balloonText: '<span style="font-size:18px;">[[offset_cups]]</span>',
          },
          {
            id: "offset_naps",
            balloon: {
              // drop: true,
              adjustBorderColor: false,
              color: "#ffffff"
            },
            bullet: "round",
            bulletAlpha: 0.7,
            bulletSize: 1,
            hideBulletsCount: 50,
            lineAlpha: 0.1,
            fillAlphas: 0.7,
            title: "Offset Napkins",
            useLineColorForBulletBorder: true,
            valueField: "offset_naps"
            // balloonText: '<span style="font-size:18px;">[[offset_naps]]</span>',
          },
          {
            id: "digital_cups",
            balloon: {
              // drop: true,
              adjustBorderColor: false,
              color: "#ffffff"
            },
            bullet: "round",
            bulletAlpha: 0.7,
            bulletSize: 1,
            hideBulletsCount: 50,
            lineAlpha: 0.1,
            fillAlphas: 0.7,
            title: "Digital Cups",
            useLineColorForBulletBorder: true,
            valueField: "digital_cups"
            // balloonText: '<span style="font-size:18px;">[[digital_cups]]</span>',
          },
          {
            id: "digital_flats",
            balloon: {
              // drop: true,
              adjustBorderColor: false,
              color: "#ffffff"
            },
            bullet: "round",
            bulletAlpha: 0.7,
            bulletSize: 1,
            hideBulletsCount: 50,
            lineAlpha: 0.1,
            fillAlphas: 0.7,
            title: "Digital Flats",
            useLineColorForBulletBorder: true,
            valueField: "digital_flats"
            // balloonText: '<span style="font-size:18px;">[[digital_flats]]</span>',
          },
          {
            id: "hotstamp",
            balloon: {
              // drop: true,
              adjustBorderColor: false,
              color: "#ffffff"
            },
            bullet: "round",
            bulletAlpha: 0.7,
            bulletSize: 1,
            hideBulletsCount: 50,
            lineAlpha: 0.1,
            fillAlphas: 0.7,
            title: "Hotstamp",
            useLineColorForBulletBorder: true,
            valueField: "hotstamp"
            // balloonText: '<span style="font-size:18px;">[[hotstamp]]</span>',
          },
          {
            id: "screen_naps",
            balloon: {
              // drop: true,
              adjustBorderColor: false,
              color: "#ffffff"
            },
            bullet: "round",
            bulletAlpha: 0.7,
            bulletSize: 1,
            hideBulletsCount: 50,
            lineAlpha: 0.1,
            fillAlphas: 0.7,
            title: "Screen Napkins",
            useLineColorForBulletBorder: true,
            valueField: "screen_naps"
            // balloonText: '<span style="font-size:18px;">[[screen_naps]]</span>',
          },
          {
            id: "screen_cups",
            balloon: {
              // drop: true,
              adjustBorderColor: false,
              color: "#ffffff"
            },
            bullet: "round",
            bulletAlpha: 0.7,
            bulletSize: 1,
            hideBulletsCount: 50,
            lineAlpha: 0.1,
            fillAlphas: 0.7,
            title: "Screen Cups",
            useLineColorForBulletBorder: true,
            valueField: "screen_cups",
            balloonText: '<span style="font-size:18px;">[[screen_cups]]</span>'
          },
          {
            id: "pad",
            balloon: {
              drop: true,
              adjustBorderColor: false,
              color: "#ffffff"
            },
            bullet: "round",
            bulletAlpha: 0.7,
            // bulletBorderAlpha: 1,
            // bulletColor: '#FFFFFF',
            bulletSize: 1,
            hideBulletsCount: 50,
            // lineThickness: 2,
            lineAlpha: 0.1,
            fillAlphas: 0.7,
            title: "Pad",
            useLineColorForBulletBorder: true,
            valueField: "pad",
            balloonText: '<span style="font-size:18px;">[[pad]]</span>'
          }
        ],
        chartScrollbar: {
          // graph: 'g1',
          oppositeAxis: false,
          offset: 30,
          scrollbarHeight: 80,
          backgroundAlpha: 0,
          selectedBackgroundAlpha: 0.1,
          selectedBackgroundColor: "#888888",
          graphFillAlpha: 0,
          graphLineAlpha: 0.5,
          selectedGraphFillAlpha: 0,
          selectedGraphLineAlpha: 1,
          autoGridCount: true,
          color: "#AAAAAA"
        },
        chartCursor: {
          pan: true,
          valueBalloonsEnabled: false,
          // valueLineEnabled: true,
          // valueLineBalloonEnabled: true,
          cursorAlpha: 1,
          cursorColor: "#258cbb",
          // limitToGraph: 'g1',
          valueLineAlpha: 0.2
          // valueZoomable: true,
        },
        valueScrollbar: {
          oppositeAxis: false,
          offset: 50,
          scrollbarHeight: 10
        },
        categoryField: "ship_date_id",
        categoryAxis: {
          parseDates: true,
          dashLength: 1,
          minorGridEnabled: true
        },
        export: {
          enabled: true
        },
        // startDuration: 0.2,
        dataProvider: this.printTypeLineTotals
      });

      chart.addListener("rendered", chart.zoomToIndexes(chart.dataProvider.length - 40, chart.dataProvider.length - 1));
    },
    chartPrintTypesByDate() {
      this.pieChart = window.AmCharts.makeChart("print-types-by-date-chart", {
        type: "pie",
        theme: "light",
        valueField: "value",
        titleField: "print_type_id",
        balloon: {
          fixedPosition: true
        },
        export: {
          enabled: true
        },
        startDuration: 0,
        dataProvider: this.printTypePieTotals
      });
    },
    initCharts() {
      this.chartImpressionsByPrintType();
      this.chartOrdersByDate();
      this.chartLineItemsByDate();
      this.chartPrintTypesByDate();
    }
  }
}
</script>
