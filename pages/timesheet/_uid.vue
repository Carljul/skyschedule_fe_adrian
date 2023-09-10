<template>
    <div class="timesheet-page mb-10">
        
        <div class="mb-10 mt-5">
            <h3 class="text-lg mb-3 --text-heading font-semibold">Timesheet Breaks</h3>
            <breadcrumbs
            :lists="[
                { text: 'Timesheet', link: '/timesheet' },
                { text: 'Breaks' }
            ]"
            />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-4 mb-10">
            <div>
                <div class="border shadow-sm p-5 rounded">
                    <p class="text-sm font-medium --text-dark uppercase text-center">Shift Date: {{$moment(state.attendance.time_in).format('L')}}</p>
                </div>
            </div>
        </div>

        <time-sheet-lists />

    </div>
</template>
<script>
import Breadcrumbs from "@components/reusables/Breadcrumbs.vue";
import TimeSheetLists from "@page_components/employee-timesheet-breaks/Lists.vue";
import defaults from "~/defaults.js";

import { mapActions, mapState, mapMutations } from "vuex";
export default {
    name: "TimesheetBreaksPage",
    layout: "main",
    middleware: ['auth', 'organizationUID', 'employee'],
    ssr: false,
    components: {
        TimeSheetLists,
        Breadcrumbs
    },
    head() {
        return {
            title: 'Timesheet Breaks' + this.theAppTitle
        }
    },
    async asyncData({ params, error, $axios, store }) {
        try {
            const res = await $axios.get(`/${store.state.global.state.organizationUID}/attendances/${params.uid}`);
            store.commit('employees/timesheet_breaks/setState', {
                handle: 'state',
                key: 'attendance',
                value: res.data.response
            });
        } catch(err) {
            error({
                statusCode: 404, 
                message: defaults.notfound
            });
        }
    },
    computed: {
        ...mapState({
            state: state => state.employees.timesheet_breaks.state
        })
    },
    methods: {
        ...mapMutations('employees/timesheet_breaks', [
            'setState'
        ]),
        ...mapActions('employees/timesheet_breaks', [
            'fetchEntry'
        ])
    },
    async mounted() {
        await this.fetchEntry();
    }
}
</script>