<template>
    <div class="timesheet-page mb-10">
        
        <div class="mb-10 mt-5">
            <h3 class="text-lg mb-3 --text-heading font-semibold">Timesheet</h3>
            <breadcrumbs
            :lists="[
                { text: 'Timesheet' }
            ]"
            />
        </div>

        <time-sheet-filter />

        <time-sheet-lists />

    </div>
</template>
<script>
import Breadcrumbs from "@components/reusables/Breadcrumbs.vue";
import TimeSheetFilter from "@page_components/main-timesheet/Filter.vue";
import TimeSheetLists from "@page_components/main-timesheet/Lists.vue";
import { mapActions } from "vuex";

export default {
    name: "TimesheetPage",
    layout: "main",
    middleware: ['auth', 'employee'],
    ssr: false,
    components: {
        TimeSheetFilter,
        TimeSheetLists,
        Breadcrumbs
    },
    head() {
        return {
            title: 'Timesheet' + this.theAppTitle
        }
    },
    methods: {
        ...mapActions('main/timesheet', [
            'fetchEntry'
        ])
    },
    mounted() {
        this.fetchEntry();
    }
}
</script>