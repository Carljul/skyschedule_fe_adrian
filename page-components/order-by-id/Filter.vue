<template>
    <div class="index-time-sheet-filter mb-5  mt-3 flex">
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

        <!-- <div class="ml-3 ">
            <button :class="`p-2 ${btnclassnormal} mt-6`" @click="() => { findPageComponent('MainOrderByStatusForm').$refs.adjustmentmodal.open=true; }">Add Order</button>
        </div> -->

    </div>
</template>
<script>
import DateRangePickerCustom from "@components/reusables/DateRangePicker.vue";
import { mapState, mapMutations, mapActions } from "vuex"
export default {
    name: 'MainOverTimeFilter',
    components: {
        tDatepickerRange: DateRangePickerCustom
    },
    computed: {
        ...mapState({
            state: state => state.order.order_by_id.state
        }),
    },
    methods: {
        ...mapMutations('order/order_by_id', [
            'setState'
        ]),
        ...mapActions('order/order_by_id', [
            'fetchEntry'
        ])
    }
}
</script>