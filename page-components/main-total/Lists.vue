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
                    refs="barChartComponent"
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
                        <print-button
                            type="daily"
                            :date="dateData"
                        />
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
                        <print-button
                            type="weekly"
                            :date="dateData"
                        />
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
import PrintButton from "@page_components/main-total/Print.vue";

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
        PrintButton
    },
    data() {
        return {
            weeklyTotalsFraction: '',
            chartOptions: {
                responsive: true,
                maintainAspectRatio: true,
                indexAxis: "y",
                tooltip: false,
                scales: {
                    x: {
                        display: false,
                        stacked: true,
                        width: 500
                    },
                    y: {
                        stacked: true,
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'right',
                        onClick: this.handleLegendClick
                    },
                },
            },
            dateData: new Date(),
            barChartData: {},
            defaultActiveBarChart: ['Complete', 'Printing'],
            excludedFields: ['ship_date_id']
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
    created() {
        this.generateGraph()
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
            this.barChartData = this.prepareGraphData()
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
        generateStatusColor(status) {
            switch (status) {
                case 'Held':
                case 'held':
                    return '#babebd';
                case 'Proofing':
                case 'proofing':
                    return '#ff7631';
                case 'Woa':
                case 'woa':
                    return '#f9ed31';
                case 'Outputting':
                case 'outputting':
                    return '#73f93c';
                case 'Screening':
                case 'screening':
                    return '#46f5d8';
                case 'Printing':
                case 'printing':
                    return '#3661fa';
                case 'Packaging':
                case 'packaging':
                    return '#9438fb';
                case 'Shipping':
                case 'shipping':
                    return '#ff32ff';
                case 'Loading dock':
                case 'loading_dock':
                    return '#9c7534';
                case 'Complete':
                case 'complete':
                    return '#949494';
                default:
                    return '#FF0000';
            }
        },
        capitalizeFirstLetter(str) {
            // Check if the input string is not empty
            if (str.length === 0) {
                return str;
            }

            // Capitalize the first letter and concatenate it with the rest of the string
            return str.charAt(0).toUpperCase() + str.slice(1);
        },
        calculatePercentage(numerator, denominator) {
            if (denominator === 0) {
                return ;
            }
            const percentage = (numerator / denominator) * 100;
            return percentage.toFixed(2) + "%";
        },
        classFormatter(name, prefix = 'status-') {
            return prefix + name.toLowerCase().replace(/ /g, '-');
        },
        toggleShowHide(className) {
            const elements = document.querySelectorAll(`.${className}`);
            elements.forEach((element) => {
                element.classList.toggle('show');
                element.classList.toggle('hide');
            });
        },
        // Calculate the sum of all fields excluding values from excludedFields
        sumUpAllFields(result) {
            var total = 0
            for (const field in result) {
                if (!this.excludedFields.includes(field)) {
                    total += parseFloat(result[field]);
                }
            }
            return total
        },
        // Calculate and update percentages for each field excluding the values from excludedFields
        calculatePercentageInEachField(result, total) {
            for (const field in result) {
                if (!this.excludedFields.includes(field)) {
                    const percentage = ((parseFloat(result[field]) / total) * 100).toFixed(2);
                    result[field] = percentage;
                }
            }
            return result;
        },
        calculateAdjustments() {

        },
        calculatePercentages(statusTotals) {
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
            var arrayOfAddups = [];
            
            statusTotals.forEach(obj=> {
                var data = obj
                
                // Clone the input data object
                var result = { ...data };
                
                let total = this.sumUpAllFields(result);
                result = this.calculatePercentageInEachField(result, total);

                complete.push(result.complete);
                held.push(result.held);
                loading_dock.push(result.loading_dock);
                outputting.push(result.outputting);
                packaging.push(result.packaging);
                printing.push(result.printing);
                proofing.push(result.proofing);
                screening.push(result.screening);
                shipping.push(result.shipping);
                woa.push(result.woa);

                var date =  new Date(obj.ship_date_id)
                var options = { month: 'short', day: 'numeric' };
                var formattedDate = date.toLocaleDateString('en-US', options);

                var addUp = parseFloat(obj.held)
                    + parseFloat(obj.loading_dock)
                    + parseFloat(obj.outputting)
                    + parseFloat(obj.packaging)
                    + parseFloat(obj.printing)
                    + parseFloat(obj.proofing)
                    + parseFloat(obj.screening)
                    + parseFloat(obj.woa)
                    + parseFloat(obj.shipping);

                arrayOfAddups.push({
                    date: formattedDate,
                    total: addUp
                });
            });

            return {
                'arrayOfAddups': arrayOfAddups,
                'complete': complete,
                'held': held,
                'loading_dock': loading_dock,
                'outputting': outputting,
                'packaging': packaging,
                'printing': printing,
                'proofing': proofing,
                'screening':screening,
                'shipping': shipping,
                'woa': woa,
            };
        },
        prepareGraphData() {
            var data = this.totals;
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

            var innerFractions = '';
            // Loop weeklyTotals object and create html for weeklyTotalsFraction div p element
            Object.keys(weeklyTotals).forEach(key => {
                var formattedKey = this.capitalizeFirstLetter(key.replace(/_/g, ' '));
                if (key != 'ship_date_id' && key != 'complete' && key != 'printing') {
                    innerFractions += `<div class="hide ${this.classFormatter(formattedKey, 'weekly-')} custom-tooltip-container" data-tooltip-target="${this.classFormatter(key, 'weekly-')}" style="background-color: ${this.generateStatusColor(key)}; flex-basis: ${this.calculatePercentage(weeklyTotals[key], weeklyTotals.complete)};">
                        <p>${weeklyTotals[key]} / ${weeklyTotals.complete}</p>
                        <div id="${this.classFormatter(formattedKey, 'weekly-')}" role="tooltip" class="custom-tooltip">
                            ${weeklyTotals[key]} / ${weeklyTotals.complete}
                            <div class="tooltip-arrow"></div>
                        </div>
                    </div>`;
                } else if (key == 'complete' || key == 'printing') {
                    innerFractions += `<div class="show ${this.classFormatter(formattedKey, 'weekly-')} custom-tooltip-container" style="background-color: ${this.generateStatusColor(key)}; flex-basis: ${this.calculatePercentage(weeklyTotals[key], weeklyTotals.complete)};">
                        <p>` +(total + '/' + weeklyTotals.complete)+ `</p>
                        <div id="${this.classFormatter(formattedKey, 'weekly-')}" role="tooltip" class="custom-tooltip">
                            ${total} / ${weeklyTotals.complete}
                            <div class="tooltip-arrow"></div>
                        </div>
                    </div>`;
                }
            });
            
            this.weeklyTotalsFraction = `
                <h6>Weekly Totals</h6><div class='weekly-totals'>
                ` + innerFractions + `
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

            var result = this.calculatePercentages(statusTotals)

            labels.forEach(item => {
                var arrayToPush = [];
                switch(item) {
                    case 'Complete':
                        arrayToPush = result.complete;
                        break;
                    case 'Held':
                        arrayToPush = result.held;
                        break;
                    case 'Loading dock':
                        arrayToPush = result.loading_dock;
                        break;
                    case 'Outputting':
                        arrayToPush = result.outputting;
                        break;
                    case 'Packaging':
                        arrayToPush = result.packaging;
                        break;
                    case 'Printing':
                        arrayToPush = result.printing;
                        break;
                    case 'Proofing':
                        arrayToPush = result.proofing;
                        break;
                    case 'Screening':
                        arrayToPush = result.screening;
                        break;
                    case 'Shipping':
                        arrayToPush = result.shipping;
                        break;
                    case 'Woa':
                        arrayToPush = result.woa;
                        break;
                }

                datasets.push({
                    label: item,
                    data: arrayToPush,
                    hidden: !this.defaultActiveBarChart.includes(item) ? true : false,
                    backgroundColor: this.generateStatusColor(item),
                    addUps: result.arrayOfAddups,
                    datalabels: {
                        color: 'white',
                        align: 'center',
                        clamp: true,
                        font: {
                            weight: 'bold',
                            size: 16,
                        },
                        formatter: function(value, context) {
                            var addUps = context.dataset.addUps;
                            var statusExtracted = statusTotals[context.dataIndex];
                            var complete = statusExtracted.complete;
                            
                            switch (item) {
                                case 'Complete':
                                    return addUps[context.dataIndex].total + ' / ' + complete;
                                case 'Held':
                                    return statusExtracted.held + ' / ' + complete;
                                case 'Loading dock':
                                    return statusExtracted.loading_dock + ' / ' + complete;
                                    break;
                                case 'Outputting':
                                    return statusExtracted.outputting + ' / ' + complete;
                                    break;
                                case 'Packaging':
                                    return statusExtracted.packaging + ' / ' + complete;
                                    break;
                                case 'Printing':
                                    return statusExtracted.printing + ' / ' + complete;
                                case 'Proofing':
                                    return statusExtracted.proofing + ' / ' + complete;
                                case 'Screening':
                                    return statusExtracted.screening + ' / ' + complete;
                                case 'Shipping':
                                    return statusExtracted.shipping + ' / ' + complete;
                                case 'Woa':
                                    return statusExtracted.woa + ' / ' + complete;
                            }
                        }
                    },
                })
            });

            return {
                labels: shipDateIds,
                datasets: datasets
            }
        },
        calculateAdjustedData(current, next, divideBy) {
            const adjustedData = [];
            console.log(next)
            if (next.length == 0) {
                current.forEach(item => {
                    adjustedData.push(100);
                });

                return adjustedData;
            }
            for (let i = 0; i < current.length; i++) {
                const currentValue = parseFloat(current[i]);
                const nextValue = parseFloat(next[i]);

                const currentRemaining = 100 - currentValue;
                const nextValueRemaining = 100 - nextValue;
                const finalRemaining = currentRemaining + nextValueRemaining;
                const leftFor = finalRemaining - 100;
                const adjustment = leftFor / divideBy;
                
                // console.log(['currentValue', currentValue])
                // console.log(['nextValue', nextValue])
                // console.log(['currentRemaining', currentRemaining])
                // console.log(['nextValueRemaining', nextValueRemaining])
                // console.log(['finalRemaining', finalRemaining])
                // console.log(['leftFor', leftFor])
                // console.log(['adjustment', adjustment])
                // console.log(['currentValue + adjustment', currentValue + adjustment])

                adjustedData.push((currentValue + adjustment).toFixed(2));
                // console.log(['================================== adjustedData for '+ currentValue, adjustedData])
            }

            return adjustedData;
        },
        handleLegendClick(chart, legendItem, __) {
            // Find the dataset corresponding to the legend item
            const datasetIndex = legendItem.datasetIndex;
            const dataset = this.barChartData.datasets[datasetIndex];

            // Toggle the 'hidden' property to hide or show the dataset
            dataset.hidden = !dataset.hidden;
            this.toggleShowHide(this.classFormatter(legendItem.text, 'weekly-'))
            console.log(chart)

            // // Updating bar chart every tap of legends
            // // Use the filter method to create an array of objects with hidden: false
            const hiddenObjects = this.barChartData.datasets.filter((dataset) => !dataset.hidden);
            const activeObjects = this.barChartData.datasets
                .filter((dataset) => !dataset.hidden)
                .map(item => item.label);
            
            this.defaultActiveBarChart = activeObjects;

            console.log(this.$refs.barChartComponent)
        },
    }
}
</script>