<template>
    <div class="index-time-sheet-lists mb-5">
        <div v-if="state.entry.loading" class="flex justify-center align-center mt-10 mb-10">
            <div class="text-center">
                <loader class="primary m-auto" style="display:block;" />
                <span class="text-xs --text-dark font-semibold">Loading</span>
            </div>
        </div>
        <div class="columns-1">
            <div class="chart-container bg-violet-400">
                <div class="title bg-violet-400">
                    <h4>Orders Process</h4>
                </div>
                <div class="chart">
                    <div class="chart-orders-totals" id="daily-chart" style="height: 300px;"></div>
                    <div class="chart-orders-totals" id="weekly-chart" style="height: 100px;"></div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-4 mt-10">
            <div class="table-container bg-violet-400">
                <div class="title bg-violet-400 h-64px">
                    <h4>Total Impressions by Print Type for specified date</h4>
                    <DatePicker v-model="dateData"/>
                </div>
                <div class="content">
                    <div class="mb-2 float-right">
                        <button class="p-2 mr-2 border-solid border-2 border-indigo-600 rounded-md">Reset Column Settings</button>
                        <button class="p-2 mr-2 border-solid border-2 border-indigo-600 rounded-md">Reset Column Order</button>
                        <Print />
                    </div>

                    <table class="w-100 table-auto">
                        <thead>
                            <tr>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
                                >
                                    Print Type
                                </th>

                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
                                >
                                    Max. Avail.
                                </th>

                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
                                >
                                    Sold
                                </th>

                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
                                >
                                    Printed
                                </th>

                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
                                >
                                    To Print
                                </th>
                                <th
                                    scope="col"
                                    class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
                                >
                                    Unsold
                                </th>
                            </tr>
                        </thead>
                        <tbody v-if="!daily.entry.loading" class="bg-white divide-y divide-gray-200">
                            <tr v-for="(entry, entryindex) in daily.entry.data" :key="`print-type-dates-entry-${genKey(entry)}`" class="transition-all hover:bg-gray-100">
                                <td class="px-6 py-2">
                                    <span class="--text-dark text-sm">{{ entry.print_type_id }}</span>
                                </td>
                                <td class="px-6 py-2">
                                    <span class="--text-dark text-sm">
                                        {{ entry.max_avail }}
                                    </span>
                                </td>
                                <td class="px-6 py-2">
                                    <span class="--text-dark text-sm">{{ entry.sold }}</span>
                                </td>

                                <td class="px-6 py-2">
                                    <span class="--text-dark text-xs block max-w-xs">{{ entry.completed }}</span>
                                </td>

                                <td class="px-6 py-2">
                                    <span class="--text-dark text-xs block max-w-xs">{{ entry.sold - entry.completed }}</span>
                                </td>
                                <td class="px-6 py-2">
                                    <span class="--text-dark text-xs block max-w-xs">{{ entry.max_avail - entry.sold }}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div v-if="daily.entry.loading" class="flex justify-center align-center mt-10 mb-10">
                        <div class="text-center">
                            <loader class="primary m-auto" style="display:block;" />
                            <span class="text-xs --text-dark font-semibold">Loading</span>
                        </div>
                    </div>

                    <p class="text-center ml-1 text-xs font-medium --text-dark mt-5" v-if="!daily.entry.loading && !daily.entry.data.length">
                        There is no data here.
                    </p>

                    <client-only>
                        <page
                            @paginate="paginateDaily"
                            :page="daily.entry.filter.page"
                            :total="daily.entry.pagination.total"
                            :total-pages="daily.entry.pagination.total_pages"
                        />
                    </client-only>
                </div>
            </div>
            <div class="table-container bg-violet-400">
              <div class="title bg-violet-400">
                  <h4>Total Impressions by Print Type for specified week</h4>
              </div>
              <div class="content">
                  <div class="mb-2 float-right">
                        <button class="p-2 mr-2 border-solid border-2 border-indigo-600 rounded-md">Reset Column Settings</button>
                        <button class="p-2 mr-2 border-solid border-2 border-indigo-600 rounded-md">Reset Column Order</button>
                        <Print/>
                  </div>

                  <table class="w-100 table-auto">
                    <thead>
                        <tr>
                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
                            >
                                Print Type
                            </th>

                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
                            >
                                Max. Avail.
                            </th>

                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
                            >
                                Sold
                            </th>

                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
                            >
                                Printed
                            </th>

                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
                            >
                                To Print
                            </th>
                            <th
                                scope="col"
                                class="px-6 py-3 text-xs font-medium tracking-wider text-left uppercase"
                            >
                                Unsold
                            </th>
                        </tr>
                    </thead>
                    <tbody v-if="!weekly.entry.loading" class="bg-white divide-y divide-gray-200">
                        <tr v-for="(entry, entryindex) in weekly.entry.data" :key="`print-type-weekly-entry-${genKey(entry)}`" class="transition-all hover:bg-gray-100">
                            <td class="px-6 py-2">
                                <span class="--text-dark text-sm">{{ entry.print_type_id }}</span>
                            </td>
                            <td class="px-6 py-2">
                                <span class="--text-dark text-sm">
                                    {{ entry.max_avail }}
                                </span>
                            </td>
                            <td class="px-6 py-2">
                                <span class="--text-dark text-sm">{{ entry.sold }}</span>
                            </td>

                            <td class="px-6 py-2">
                                <span class="--text-dark text-xs block max-w-xs">{{ entry.completed }}</span>
                            </td>

                            <td class="px-6 py-2">
                                <span class="--text-dark text-xs block max-w-xs">{{ entry.sold - entry.completed }}</span>
                            </td>
                            <td class="px-6 py-2">
                                <span class="--text-dark text-xs block max-w-xs">{{ entry.max_avail - entry.sold }}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div v-if="weekly.entry.loading" class="flex justify-center align-center mt-10 mb-10">
                    <div class="text-center">
                        <loader class="primary m-auto" style="display:block;" />
                        <span class="text-xs --text-dark font-semibold">Loading</span>
                    </div>
                </div>

                <p class="text-center ml-1 text-xs font-medium --text-dark mt-5" v-if="!weekly.entry.loading && !weekly.entry.data.length">
                    There is no data here.
                </p>

                <client-only>
                    <page
                        @paginate="paginateWeekly"
                        :page="weekly.entry.filter.page"
                        :total="weekly.entry.pagination.total"
                        :total-pages="weekly.entry.pagination.total_pages"
                    />
                </client-only>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Loader from "@components/reusables/Loader.vue";
import Page from "@components/reusables/Pagination.vue";
import IconEdit from "@components/reusables/IconEdit.vue";
import IconTrash from "@components/reusables/IconTrash.vue";
import AlertConfirm from "@components/reusables/AlertConfirm.vue";
import BarChart from "../charts/BarChart.vue"
import { mapState, mapMutations, mapActions } from "vuex"
import DatePicker from "@components/reusables/DatePicker.vue";
import Print from "@page_components/main-total/Print.vue";
import AmCharts from 'amcharts3';
import AmSerial from 'amcharts3/amcharts/serial';
import Light from 'amcharts3/amcharts/themes/light';

export default {
    name: 'MainOrderLists',
    components: {
        Loader,
        Page,
        IconEdit,
        IconTrash,
        AlertConfirm,
        BarChart,
        DatePicker,
        Print
    },
    data() {
        return {
            dateData: new Date(),
            barChartData: {},
            chartDaily: null,
            chartWeekly: null,
            statusColors: {}
        };
    },
    async created() {
        await this.statusesList()
    },
    mounted() {
        this.initCharts()
    },
    computed: {
        ...mapState({
            state: state => state.main.total.state,
            daily: state => state.main.total.daily,
            weekly: state => state.main.total.weekly,
            totals: state => state.main.total.totals,
            statuses: state => state.main.total.statuses,
        }),
    },
    watch: {
        dateData: function(newdata, olddata) {
            var parsedDate = new Date(newdata)
            var formattedDate = parsedDate.getFullYear() + '-' + this.reformatSingleDigits((parsedDate.getMonth() + 1)) + '-' + this.reformatSingleDigits(parsedDate.getDate())
            var leftTablePayload = {
                isDaily: true,
                selectedDate: formattedDate
            }
            var rightTablePayload = {
                isDaily: false,
                selectedDate: formattedDate
            }
            this.setState({ entry: { ...this.state.entry, filter: { ...this.state.entry.filter, date: formattedDate, filter: 'daily' } } });
            localStorage.setItem('total-entry', JSON.stringify(this.state.entry))
            this.filterSpecificDate(leftTablePayload)
            this.filterSpecificDate(rightTablePayload)
            this.generateGraph()
        },
    },
    methods: {
        ...mapMutations('main/total', [
            'setState',
            'setDaily',
            'setWeekly',
            'setTotals',
        ]),
        ...mapActions('main/total', [
            'fetchEntry',
            'filterSpecificDate',
            'filterTotalStatuses',
            'fetchStatuses'
        ]),
        async paginateDaily(data) {
            var parsedDate = new Date(this.dateData)
            var formattedDate = parsedDate.getFullYear() + '-' + this.reformatSingleDigits((parsedDate.getMonth() + 1)) + '-' + this.reformatSingleDigits(parsedDate.getDate())
            var tablePayload = {
                isDaily: true,
                selectedDate: formattedDate
            }
            this.setDaily({ entry: { ...this.daily.entry, filter: { ...this.daily.entry.filter, page: data.page, limit: data.limit, date: formattedDate, filter: 'daily' } } });
            this.setState({ entry: { ...this.state.entry, filter: { ...this.state.entry.filter, page: data.page, limit: data.limit, date: formattedDate, filter: 'daily' } } });
            localStorage.setItem('total-entry', JSON.stringify(this.state.entry))
            await this.filterSpecificDate(tablePayload);
        },
        async paginateWeekly(data) {
            var parsedDate = new Date(this.dateData)
            var formattedDate = parsedDate.getFullYear() + '-' + this.reformatSingleDigits((parsedDate.getMonth() + 1)) + '-' + this.reformatSingleDigits(parsedDate.getDate())
            var tablePayload = {
                isDaily: false,
                selectedDate: formattedDate
            }
            this.setWeekly({ entry: { ...this.weekly.entry, filter: { ...this.weekly.entry.filter, page: data.page, limit: data.limit, date: formattedDate, filter: 'weekly' } } });
            this.setState({ entry: { ...this.state.entry, filter: { ...this.state.entry.filter, page: data.page, limit: data.limit, date: formattedDate, filter: 'weekly' } } });
            localStorage.setItem('total-entry', JSON.stringify(this.state.entry))
            await this.filterSpecificDate(tablePayload);
        },
        reformatSingleDigits(n) {
            return n > 9 ? "" + n: "0" + n;
        },
        async generateGraph() {
            var dates = this.getWeekDates(this.dateData)

            this.setTotals({
                data: [],
                loading: false,
                filter: {
                    startDate: dates.start,
                    endDate: dates.end
                }
            });
            await this.filterTotalStatuses()
            this.initialize()
        },
        getWeekDates(date) {
            const fixedDate = new Date(date)

            const weekStart = new Date(fixedDate)
            weekStart.setDate(fixedDate.getDate() - fixedDate.getDay())

            const weekEnd = new Date(fixedDate)
            weekEnd.setDate(fixedDate.getDate() - fixedDate.getDay() + 6)

            if (weekEnd.toDateString() === fixedDate.toDateString()) {
                weekStart.setDate(weekStart.getDate() + 7)
                weekEnd.setDate(weekEnd.getDate() + 7)
            }

            const startDateString = weekStart.toISOString().split('T')[0]
            const endDateString = weekEnd.toISOString().split('T')[0]

            return {
                start: startDateString,
                end: endDateString
            }
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
        setContrast(hex) {
            let rgb = this.hexToRgb(hex);

            // http://www.w3.org/TR/AERT#color-contrast
            let brightness = Math.round(
                (parseInt(rgb.r) * 299 + parseInt(rgb.g) * 587 + parseInt(rgb.b) * 114) /
                1000
            );

            return brightness > 125 ? "000000" : "ffffff";
        },
        // Convert a HEX string to an RGB object containing integers of 0-255 for each component.
        hexToRgb(hex) {
            // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
            let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, function(m, r, g, b) {
                return r + r + g + g + b + b;
            });

            let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result
                ? {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16)
                }
                : null;
        },
        async statusesList() {
            await this.fetchStatuses()
            this.statuses.forEach((value, index, array) => {
                this.statusColors[value.id + '_bg'] = value.color;
                this.statusColors[value.id + '_fg'] = this.setContrast(value.color);
            });
        },
        addGraphs(chart, record) {
            if (chart.graphs.length <= 0) {
                for (let field in record) {
                    if (record.hasOwnProperty(field)) {
                        if (!/ship_date/.test(field)) {
                            chart.addGraph({
                                balloonText: '<b class="font-weight-bold">[[title]]: [[value]]</b>',
                                fillAlphas: 0.8,
                                labelText: '[[value]]',
                                lineAlpha: 0.3,
                                title: this.prettyNameOf(field),
                                type: 'column',
                                color: '#' + this.statusColors[field + '_fg'],
                                fillColors: '#' + this.statusColors[field + '_bg'],
                                valueField: field,
                                labelFunction: function (item) {
                                    // console.log(item);
                                    let total = 0;
                                    for (let i = 0; i < chart.dataProvider.length; i++) {
                                        // console.log(chart.dataProvider[i]);
                                        total += chart.dataProvider[i][item.graph.valueField];
                                    }
                                    return item.values.value + ' / ' + item.values.total;
                                },
                            });
                        }
                    }
                }
            }
        },
        initCharts() {
            this.chartDaily = window.AmCharts.makeChart('daily-chart', {
                type: 'serial',
                theme: Light,
                legend: {
                    horizontalGap: 10,
                    maxColumns: 1,
                    position: 'right',
                    useGraphSettings: true,
                    markerSize: 10,
                    // autoMargins: false,
                    // marginBottom: 100,
                },
                dataDateFormat: 'YYYY-MM-DD',
                valueAxes: [{
                    id: 'v1',
                    stackType: '100%',
                    axisAlpha: 0.5,
                    labelsEnabled: false,
                    // ignoreAxisWidth: true,
                }],
                balloon: {
                    // drop: true,
                    // adjustBorderColor: false,
                    // color: '#ffffff',
                    // borderThickness: 1,
                    // shadowAlpha: 0,
                    cornerRadius: 2,
                    fixedPosition: false,
                },
                rotate: true,
                categoryField: 'ship_date_id',
                categoryAxis: {
                    gridPosition: 'start',
                    axisAlpha: 0,
                    gridAlpha: 0,
                    position: 'left',
                    parseDates: true,
                    equalSpacing: true,
                },
                export: {
                    enabled: true,
                },
                startDuration: 1,
                responsive: {
                    enabled: true,
                    rules: [{
                        maxWidth: 400,
                        overrides: {
                            legend: {
                                enabled: false,
                            },
                        },
                    }],
                },
                fontFamily: 'Montserrat',
                fontSize: 14,
            });
            this.chartWeekly = window.AmCharts.makeChart('weekly-chart', {
                type: 'serial',
                theme: 'light',
    /*
                legend: {
                    horizontalGap: 10,
                    maxColumns: 1,
                    position: 'right',
                    useGraphSettings: true,
                    markerSize: 10,
                },
    */
                valueAxes: [{
                    id: 'v2',
                    stackType: '100%',
                    axisAlpha: 0.5,
                }],
                balloon: {
                    cornerRadius: 2,
                    fixedPosition: false,
                },
                rotate: true,
                categoryField: 'ship_date_id',
                categoryAxis: {
                    gridPosition: 'start',
                    axisAlpha: 0,
                    gridAlpha: 0,
                    position: 'left',
                    parseDates: false,
                },
                export: {
                    enabled: false,
                },
                startDuration: 1,
                responsive: {
                    enabled: true,
                    rules: [{
                        maxWidth: 400,
                        overrides: {
                            legend: {
                                enabled: false,
                            },
                        },
                    }],
                },
                fontFamily: 'Montserrat',
                fontSize: 18,
                allLabels: [{
                    text: 'Weekly Totals',
                    color: '#fcfcfc',
                    bold: true,
                    // alpha: 0.8,
                    x: 15,
                    y: 15,
                }],
            });
        },
        async initialize() {
            // Update the charts using the returned JSON object.
            var data = this.totals;
            console.log(['data', data])
            this.addGraphs(this.chartDaily, data.status_totals[0]);
            this.addGraphs(this.chartWeekly, data.weekly_totals);
            this.chartDaily.dataProvider = data.status_totals;
            this.chartDaily.validateData();
            this.chartWeekly.dataProvider = [data.weekly_totals];
            this.chartWeekly.validateData();
        }
    }
}
</script>

<style scoped>
@import 'node_modules/amcharts3/images/style.css';
.font-weight-bold{font-weight:700!important}
#daily-chart {
  margin-bottom: 4rem;
  font-family: Poppins, sans-serif;
}
</style>
