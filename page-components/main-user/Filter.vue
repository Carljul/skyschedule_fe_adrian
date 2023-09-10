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

        <div class="ml-3 ">
            <button :class="`p-2 ${btnclassnormal} mt-6`" @click="() => { findPageComponent('MainUserForm').$refs.adjustmentmodal.open=true; }">Add User</button>
        </div>

    </div>
</template>
<script>
import DateRangePickerCustom from "@components/reusables/DateRangePicker.vue";
import { mapState, mapMutations, mapActions } from "vuex"
export default {
    name: 'MainUserFilter',
    components: {
        tDatepickerRange: DateRangePickerCustom
    },
    computed: {
        ...mapState({
            state: state => state.main.user.state
        }),
    },
    methods: {
        ...mapMutations('main/user', [
            'setState'
        ]),
        ...mapActions('main/user', [
            'fetchEntry'
        ])
    }
}
</script>