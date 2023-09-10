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
            orders: [],
            chartOptions: {
                indexAxis: "y",
                responsive: true,
                maintainAspectRatio: false,
            },
            dateData: ref(new Date()),
        };
    },
    computed: {
        ...mapState({
            state: state => state.main.total.state,
            daily: state => state.main.total.daily,
            weekly: state => state.main.total.weekly,
        }),
    },
    created() {
        this.barChartData = {
                labels: ['Digital Cups', 'Digital Napkins', 'Digital Other', 'HotStamp', 'Offset Cups', 'Pad', 'Screen Cups', 'Screen Napkins'],
                datasets: [{
                label: ['Digital Cups', 'Digital Napkins', 'Digital Other', 'HotStamp', 'Offset Cups', 'Pad', 'Screen Cups', 'Screen Napkins'],
                data: [50000, 110000, 75000, 25000, 575000, 100000, 501000, 30000],
                backgroundColor: ['pink', 'purple', 'violet', 'red', 'yellow', 'green', 'blue', 'grey'],
            }]
        };
    },
    watch: {
        dateData: function(newdata, olddata) {
            var parsedDate = new Date(newdata)
            var formattedDate = parsedDate.getFullYear() + '-' + this.reformatSingleDigits((parsedDate.getMonth() + 1)) + '-' + this.reformatSingleDigits(parsedDate.getDate())
            var tablePayload = {
                isDaily: true,
                selectedDate: formattedDate
            }
            this.filterSpecificDate(tablePayload)
        }
    },
    methods: {
        ...mapMutations('main/total', [
            'setState',
            'setDaily',
            'setWeekly',
        ]),
        ...mapActions('main/total', [
            'fetchEntry',
            'filterSpecificDate'
        ]),
        async paginateDaily(data) {
            var parsedDate = new Date(this.dateData)
            var formattedDate = parsedDate.getFullYear() + '-' + this.reformatSingleDigits((parsedDate.getMonth() + 1)) + '-' + this.reformatSingleDigits(parsedDate.getDate())
            var tablePayload = {
                isDaily: true,
                selectedDate: formattedDate
            }
            console.log(['data', data])
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
        }
    }
}
</script>
