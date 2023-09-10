<template>
    <div class="index-time-sheet-filter mb-5 max-w-md">
        <client-only>
            <label class="mb-2 block text-xs font-medium --text-dark">Filter Date:</label>
            <t-datepicker-range
            ref="timesheetrange"
            :value="state.entry.filter.range"
            @input="e => {
                setState({ handle: 'state.entry.filter', key: 'range', value: e });
                fetchEntry();
            }"
            @clearDate="() => {
                setState({ handle: 'state.entry.filter', key: 'range', value: null });
                fetchEntry();
            }"
            mode="dateTime"
            ></t-datepicker-range>
        </client-only>
    </div>
</template>
<script>
import DateRangePickerCustom from "@components/reusables/DateRangePicker.vue";
import { mapState, mapMutations, mapActions } from "vuex"
export default {
    name: 'IndexTimesheetFilter',
    components: {
        tDatepickerRange: DateRangePickerCustom
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
        ])
    }
}
</script>