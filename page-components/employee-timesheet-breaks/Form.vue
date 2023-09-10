<template>
    <modal ref="adjustmentmodal" nofooter contentclass="xl:w-3/12 md:w-5/12 sm:w-7/12"
    @close="() => {
        resetInputs();
        $router.push(`/employees/timesheets/${state.attendance.uid}`);
    }"
    >
        <template slot="header">
            <h4 class="--text-heading text-lg font-semibold">
                <span>Break Adjustment</span>
            </h4>
        </template>

        <template slot="content">

            <ValidationObserver ref="adjustment" v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(updateAdjustment)">

                    <ValidationProvider ref="adjustment_time_in" name="Time in" v-slot="{ validate, errors }" rules="required">
                        <div class="form-group-wrap mb-2">
                            <label class="mb-2 block text-xs font-medium --text-dark">Time in</label>
                            <client-only>
                                <t-datepicker mode="datetime" 
                                :value="state.inputs.time_in"
                                @input="e => { 
                                    setState({ handle: 'state.inputs', key: 'time_in', value: e });
                                }"
                                v-vchecker="errors[0]"
                                ></t-datepicker>
                            </client-only>
                            <input type="hidden"
                            :value="state.inputs.time_in"
                            @input="e => { 
                                setState({ handle: 'state.inputs', key: 'time_in', value: e.target.value });
                                validate(e); 
                            }"
                            >
                            <v-msg :error="errors[0]" />
                        </div>
                    </ValidationProvider>



                    <ValidationProvider ref="adjustment_time_out" name="Time out" v-slot="{ validate, errors }">
                        <div class="form-group-wrap mb-2">
                            <label class="mb-2 block text-xs font-medium --text-dark">Time out</label>
                            <client-only>
                                <t-datepicker mode="datetime" 
                                :value="state.inputs.time_out"
                                @input="e => { 
                                    setState({ handle: 'state.inputs', key: 'time_out', value: e });
                                }"
                                v-vchecker="errors[0]"
                                ></t-datepicker>
                            </client-only>
                            <input type="hidden"
                            :value="state.inputs.time_out"
                            @input="e => { 
                                setState({ handle: 'state.inputs', key: 'time_out', value: e.target.value });
                                validate(e); 
                            }"
                            >
                            <v-msg :error="errors[0]" />
                        </div>
                    </ValidationProvider>

                    <div class="form-group-wrap mb-3">
                        <label
                        class="--text-dark mb-2 text-sm block"
                        >
                            <input type="checkbox"
                            :true-value="true"
                            :false-value="false"
                            :checked="state.inputs.is_overbreak"
                            @input="e => { 
                                setState({ handle: 'state.inputs', key: 'is_overbreak', value: !state.inputs.is_overbreak });
                            }" class="mr-1" />
                            Is overbreak?
                        </label>
                    </div>

                    <div class="form-group-wrap mb-3 mt-5">
                        <label class="mb-2 block text-xs font-medium --text-dark">Notes</label>
                        <textarea 
                            :value="state.inputs.notes"
                            @input="e => { 
                                setState({ handle: 'state.inputs', key: 'notes', value: e.target.value });
                            }"
                            type="text"
                            class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border"
                            ></textarea>
                    </div>
                    

                    <div class="form-group-wrap">
                        <async-button ref="adjustment_btn" type="submit" :class="`p-3 ${btnclassnormal} mt-3`">
                            Save
                        </async-button>
                    </div>

                </form>
            </ValidationObserver>

        </template>
    </modal>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import AsyncButton from "@components/reusables/AsyncButton.vue";
import Modal from "@components/reusables/Modal.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VMsg from "@components/reusables/VeeMessage.vue";
import DatePickerCustom from "@components/reusables/DatePicker.vue";

export default {
    name: 'EmployeeTimesheetBreaksForm',
    components: {
        AsyncButton,
        Modal,
        ValidationProvider,
        ValidationObserver,
        VMsg,
        tDatepicker: DatePickerCustom,
    },
    computed: {
        ...mapState({
            state: state => state.employees.timesheet_breaks.state
        }),
    },
    methods: {
        ...mapMutations('employees/timesheet_breaks', [
            'setState',
            'resetInputs'
        ]),
        ...mapActions('employees/timesheet_breaks', [
            'saveAdjustment'
        ]),
        async updateAdjustment() {
            try {
                this.$refs.adjustment_btn.loading = true;
                await this.saveAdjustment();
                this.$refs.adjustment_btn.loading = false;
            } catch($e) {
                this.errorHandle($e, 'adjustment');
                this.$refs.adjustment_btn.loading = false;
            }
        }
    }
}
</script>