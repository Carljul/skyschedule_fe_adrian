<template>
    <div class="index-time-sheet-filter mb-5  mt-3 flex">
        <div>

            <client-only>
            <t-datepicker mode="date" 
            :value="state.entry.filter.query"
            @input="e => {             
                setState({ entry: { ...state.entry, filter: { ...state.entry.filter, query: $moment(e).format('YYYY-MM-DD') } } });
                fetchEntry();
            }"
            ></t-datepicker>
            </client-only>
        </div>

        <!-- <div class="ml-3 ">
            <button :class="`p-2 ${btnclassnormal} mt-6`" @click="() => { findPageComponent('MainOrderByStatusForm').$refs.adjustmentmodal.open=true; }">Add Order</button>
        </div> -->

    </div>
</template>
<script>
import TSelectStatus from "@components/reusables/SelectPrintType.vue";
import DateRangePickerCustom from "@components/reusables/DateRangePicker.vue";
import DatePickerCustom from "@components/reusables/DatePicker.vue";
import moment from "moment-timezone";
import { mapState, mapMutations, mapActions } from "vuex"
export default {
    name: 'MainOverTimeFilter',
    components: {
        tDatepickerRange: DateRangePickerCustom,
        TSelectStatus,
        tDatepicker: DatePickerCustom,
    },
    computed: {
        ...mapState({
            state: state => state.order.order.state
        }),
    },
    methods: {
        ...mapMutations('order/order', [
            'setState'
        ]),
        ...mapActions('order/order', [
            'fetchEntry'
        ])
    }
}
</script>