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


    </div>
</template>
<script>
import TSelectStatus from "@components/reusables/SelectOrderStatus.vue";
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