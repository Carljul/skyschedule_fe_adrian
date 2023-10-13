<template>
    <div class="index-time-sheet-filter mb-5  mt-3 flex">
        <div>
            <client-only>
                <t-select-status 
                :value="{query:state.entry.filter.query}"
                class="mt-3" 
                @input="e => {
                    setState({ entry: { ...state.entry, filter: { ...state.entry.filter, ...e } } });
                    fetchEntry();
                }"></t-select-status>
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
import { mapState, mapMutations, mapActions } from "vuex"
export default {
    name: 'MainOverTimeFilter',
    components: {
        tDatepickerRange: DateRangePickerCustom,
        TSelectStatus
    },
    computed: {
        ...mapState({
            state: state => state.order.order_by_print_type.state
        }),
    },
    methods: {
        ...mapMutations('order/order_by_print_type', [
            'setState'
        ]),
        ...mapActions('order/order_by_print_type', [
            'fetchEntry'
        ])
    }
}
</script>