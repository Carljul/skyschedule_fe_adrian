<template>
    <div class="index-time-sheet-lists mb-5">
        <div v-if="state.entry.loading" class="flex justify-center align-center mt-10 mb-10">
            <div class="text-center">
                <loader class="primary m-auto" style="display:block;" />
                <span class="text-xs --text-dark font-semibold">Loading</span>
            </div>
        </div>
        <div class="columns-1">
            <div class="bar-container">
                <BarChart
                    title="Orders"
                    :options="chartOptions"
                    :data="barChartData"
                    :isWithFilter="false"
                    :extraHTML="weeklyTotalsFraction"
                />                
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
                        <button class="p-2 border-solid border-2 border-green-600 rounded-md">Print</button>
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
                      <button class="p-2 border-solid border-2 border-green-600 rounded-md">Print</button>
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
import 'chartjs-plugin-datalabels';

import { ref } from 'vue';

export default {
    name: 'MainOrderLists',
    components: {
        Loader,
        Page,
        IconEdit,
        IconTrash,
        AlertConfirm,
        BarChart,
        DatePicker
    },
    data() {
        return {
            weeklyTotalsFraction: '',
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: "y",
                scales: {
                    x: {
                        display: false,
                        stacked: true,
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                    y: {
                        stacked: true,
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'right',
                    },
                },
            },
            dateData: ref(new Date()),
            barChartData: {},
        };
    },
    computed: {
        ...mapState({
            state: state => state.main.total.state,
            daily: state => state.main.total.daily,
            weekly: state => state.main.total.weekly,
            totals: state => state.main.total.totals,
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
            'filterTotalStatuses'
        ]),
        async paginateDaily(data) {
            var parsedDate = new Date(this.dateData)
            var formattedDate = parsedDate.getFullYear() + '-' + this.reformatSingleDigits((parsedDate.getMonth() + 1)) + '-' + this.reformatSingleDigits(parsedDate.getDate())
            var tablePayload = {
                isDaily: true,
                selectedDate: formattedDate
            }
            this.setDaily({ entry: { ...this.daily.entry, filter: { ...this.daily.entry.filter, page: data.page, limit: data.limit } } });
            await this.filterSpecificDate(tablePayload);
        },
        async paginateWeekly(data) {
            var parsedDate = new Date(this.dateData)
            var formattedDate = parsedDate.getFullYear() + '-' + this.reformatSingleDigits((parsedDate.getMonth() + 1)) + '-' + this.reformatSingleDigits(parsedDate.getDate())
            var tablePayload = {
                isDaily: false,
                selectedDate: formattedDate
            }
            this.setWeekly({ entry: { ...this.weekly.entry, filter: { ...this.weekly.entry.filter, page: data.page, limit: data.limit } } });
            console.log(['tablePayload:', tablePayload]);
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
            this.barChartData = this.prepareGraphData(this.totals)
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
        getRandomHexColor() {
            // Generate random values for R, G, and B between 0 and 255
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);

            // Convert the values to hexadecimal and format the color string
            const hexColor = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;

            return hexColor;
        },
        capitalizeFirstLetter(str) {
            // Check if the input string is not empty
            if (str.length === 0) {
                return str;
            }

            // Capitalize the first letter and concatenate it with the rest of the string
            return str.charAt(0).toUpperCase() + str.slice(1);
        },
        prepareGraphData(data) {
            console.log(data)
            var statusTotals = data.status_totals;
            var weeklyTotals = data.weekly_totals;
            var datasets = [];
            var total = 0;
            var shipDateIds = [];
            var exclude = ['ship_date_id'];
            
            /// ================ Weekly Totals
            total = parseFloat(weeklyTotals.held)
                    + parseFloat(weeklyTotals.loading_dock)
                    + parseFloat(weeklyTotals.outputting)
                    + parseFloat(weeklyTotals.packaging)
                    + parseFloat(weeklyTotals.printing)
                    + parseFloat(weeklyTotals.proofing)
                    + parseFloat(weeklyTotals.screening)
                    + parseFloat(weeklyTotals.woa)
                    + parseFloat(weeklyTotals.shipping);
            this.weeklyTotalsFraction = `<div class='weekly-totals'>
                <h6>Weekly Totals</h6>
                <p>` +(total + '/'+ weeklyTotals.complete)+ `</p>
            </div>`;

            /// ================ Graph
            // Legends
            var labels = Object.keys(weeklyTotals)
                .filter(key => !exclude.includes(key))
                .map(key => this.capitalizeFirstLetter(key.replace(/_/g, ' ')))
            
            // Datasets
            shipDateIds = statusTotals.map(obj => {
                var date =  new Date(obj.ship_date_id)

                // Define the options for formatting
                var options = { month: 'short', day: 'numeric' };

                // Format the date with the short month and day
                var formattedDate = date.toLocaleDateString('en-US', options);
                
                return formattedDate
            });

            var complete = [];
            var held = [];
            var loading_dock = [];
            var outputting = [];
            var packaging = [];
            var printing = [];
            var proofing = [];
            var screening = [];
            var shipping = [];
            var woa = [];
            var complete = [];

            
            statusTotals.forEach(obj=> {
                complete.push(obj.complete);
                held.push(obj.held);
                loading_dock.push(obj.loading_dock);
                outputting.push(obj.outputting);
                packaging.push(obj.packaging);
                printing.push(obj.printing);
                proofing.push(obj.proofing);
                screening.push(obj.screening);
                shipping.push(obj.shipping);
                woa.push(obj.woa);
            });

            labels.forEach(item => {
                var arrayToPush = [];
                switch(item) {
                    case 'Complete':
                        arrayToPush = complete;
                        break;
                    case 'Held':
                        arrayToPush = held;
                        break;
                    case 'Loading dock':
                        arrayToPush = loading_dock;
                        break;
                    case 'Outputting':
                        arrayToPush = outputting;
                        break;
                    case 'Packaging':
                        arrayToPush = packaging;
                        break;
                    case 'Printing':
                        arrayToPush = printing;
                        break;
                    case 'Proofing':
                        arrayToPush = proofing;
                        break;
                    case 'Screening':
                        arrayToPush = screening;
                        break;
                    case 'Shipping':
                        arrayToPush = shipping;
                        break;
                    case 'Woa':
                        arrayToPush = woa;
                        break;
                }

                datasets.push({
                    label: item,
                    data: arrayToPush,
                    hidden: item != 'Complete' ? true : false,
                    backgroundColor: this.getRandomHexColor(),
                    datalabels: {
                        color: 'white',
                        align: 'center',
                        font: {
                            weight: 'bold',
                            size: 16,
                        },
                        formatter: function(value, context) {                         
                            return value == 0 ? '' : (value + ' / ' + value);
                        }
                    },
                })
            });

            return {
                labels: shipDateIds,
                datasets: datasets
            }
        }
    }
}
</script>