<template>
    <div class="index-time-sheet-filter mb-5  mt-3 flex">
        <div class="ml-3 mt-1">
            <label class="mb-2 block text-xs font-medium --text-dark">Choose status:</label>
            <t-select 
            :value="state.entry.filter.status" 
            @input="e => {

                setState({ handle: 'state.entry.filter', key: 'page', value: 1 });
                setState({ handle: 'state.entry.filter', key: 'status', value: e });
                fetchEntry();
            }"
            :clearable="false"
            :searchable="false"
            :options="[
                { label: `All`, value: null },
                { label: `Pending`, value: 0 },
                { label: `Approved`, value: 1 },
                { label: `Declined`, value: 2 },
            ]"
            :reduce="dd => dd.value"
            label="label"
            ></t-select>
        </div>

    </div>
</template>
<script>
import TSelect from "@components/reusables/Select.vue";
import DateRangePickerCustom from "@components/reusables/DateRangePicker.vue";
import { mapState, mapMutations, mapActions } from "vuex"
export default {
    name: 'EmployeesRequestFilter',
    components: {
        tDatepickerRange: DateRangePickerCustom,
        TSelect
    },
    computed: {
        ...mapState({
            state: state => state.employees.leave_requests.state
        }),
    },
    methods: {
        ...mapMutations('employees/leave_requests', [
            'setState'
        ]),
        ...mapActions('employees/leave_requests', [
            'fetchEntry'
        ])
    }
}
</script>