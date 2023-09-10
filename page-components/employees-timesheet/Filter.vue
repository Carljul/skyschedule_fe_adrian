<template>
    <div class="index-time-sheet-filter mb-5  mt-3 flex items-center">
        <div>
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

        <div class="ml-3 ">
            <label class="mb-2 block text-xs font-medium --text-dark">Show IN-SHIFT only</label>
            <SwitchToggle
            :true-value="1"
            :false-value="null"
            :value="state.entry.filter.current_in"
            @input="e => {
                setState({ handle: 'state.entry.filter', key: 'page', value: 1 });
                setState({ handle: 'state.entry.filter', key: 'current_in', value: e });
                fetchEntry();
            }"
            />
        </div>

    </div>
</template>
<script>
import SwitchToggle from "@components/reusables/SwitchToggle.vue";
import DateRangePickerCustom from "@components/reusables/DateRangePicker.vue";
import { mapState, mapMutations, mapActions } from "vuex"
export default {
    name: 'IndexTimesheetFilter',
    components: {
        tDatepickerRange: DateRangePickerCustom,
        SwitchToggle
    },
    computed: {
        ...mapState({
            state: state => state.employees.timesheet.state
        }),
    },
    methods: {
        ...mapMutations('employees/timesheet', [
            'setState'
        ]),
        ...mapActions('employees/timesheet', [
            'fetchEntry'
        ])
    }
}
</script>