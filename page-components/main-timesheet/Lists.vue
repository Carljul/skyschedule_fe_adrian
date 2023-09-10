<template>
    <div class="index-time-sheet-lists mb-5">
        <table class="w-full overflow-x-scroll divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th
                        scope="col"
                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                        {{appdefaults.timein}}
                    </th>

                    <th
                        scope="col"
                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                        {{appdefaults.timeout}}
                    </th>

                    <th
                        scope="col"
                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                        # of Hours
                    </th>

                    <th
                        scope="col"
                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                        Notes
                    </th>
                    <th
                        scope="col"
                        class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    ></th>
                </tr>
            </thead>


            <tbody v-if="!state.entry.loading" class="bg-white divide-y divide-gray-200">
                <tr v-for="(entry, entryindex) in state.entry.data" :key="`department-entry-${genKey(entry)}`" class="transition-all hover:bg-gray-100">
                    <td class="px-6 py-4 ">
                        <span class="--text-dark text-sm">{{$moment(entry.time_in).format('L')}} {{$momenttime($moment(entry.time_in))}}</span>
                    </td>
                    <td class="px-6 py-4 ">
                        <span class="--text-dark text-sm">
                            <template v-if="entry.time_out">
                                {{$moment(entry.time_out).format('L')}} {{$momenttime($moment(entry.time_out))}}
                            </template>
                            <template v-else>
                                <span class="block">IN-SHIFT</span>
                                <span class="block text-xs">{{$moment(entry.time_in).startOf('minute').from(realtimeMoment)}}</span>
                            </template>
                        </span>
                    </td>
                    <td class="px-6 py-4 ">
                        <span v-if="entry.time_out" class="--text-dark text-sm">{{ entry.hours }}</span>
                        <span v-else class="--text-dark text-sm">{{realtimeMoment.diff($moment(entry.time_in), 'hours')}}</span>
                    </td>
                    <td class="px-6 py-4 ">
                        <span class="--text-dark text-xs block max-w-xs">{{entry.notes}}</span>
                    </td>
                    <td class="px-6 py-4 text-sm font-medium text-right  flex items-center justify-end">
                        <nuxt-link :to="`/timesheet/${entry.uid}`" 
                        class="ml-2 mt-2 --text-primary --text-primary-hover" :title="`Breaks on this schedule`" v-tooltip="`Breaks on this schedule`">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6" />
                            </svg>
                        </nuxt-link>
                    </td>
                </tr>
            </tbody>
            
        </table>


        <div v-if="state.entry.loading" class="flex justify-center align-center mt-10 mb-10">
            <div class="text-center">
                <loader class="primary m-auto" style="display:block;" />
                <span class="text-xs --text-dark font-semibold">Loading</span>
            </div>
        </div>

        <p class="text-center ml-1 text-xs font-medium --text-dark mt-5" v-if="!state.entry.loading && !state.entry.data.length">
            There is no record here.
        </p>

        <client-only>
            <page 
            @paginate="paginate" 
            :page="state.entry.filter.page" 
            :total="state.entry.pagination.total" 
            :total-pages="state.entry.pagination.total_pages"  />
        </client-only>

    </div>
</template>
<script>
import Loader from "@components/reusables/Loader.vue";
import Page from "@components/reusables/Pagination.vue";

import { mapState, mapMutations, mapActions } from "vuex"
import momentrealtimemixins from '~/mixins/momentrealtime';

export default {
    name: 'IndexTimeSheetLists',
    mixins: [momentrealtimemixins],
    components: {
        Loader,
        Page
    },
    computed: {
        ...mapState({
            state: state => state.main.timesheet.state
        }),
    },
    methods: {
        ...mapMutations('main/timesheet', [
            'setState'
        ]),
        ...mapActions('main/timesheet', [
            'fetchEntry'
        ]),
        paginate(data) {
            this.setState({ handle: 'state.entry.filter', key: 'page', value: data.page });
            this.setState({ handle: 'state.entry.filter', key: 'limit', value: data.limit });
            this.fetchEntry();
        }
    },
    created() {
        const e = this;
        this.$nuxt.$on('timeInOut', () => {
            e.fetchEntry();
        });
    },
    beforeDestroy() {
        this.$nuxt.$off('timeInOut');
    }
}
</script>