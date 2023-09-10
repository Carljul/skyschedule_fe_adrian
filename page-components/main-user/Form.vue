<template>
    <modal ref="adjustmentmodal" nofooter contentclass="xl:w-4/12 md:w-5/12 sm:w-7/12"
    @close="() => {
        resetInputs();
        $router.push('/order');
    }"
    >
        <template slot="header">
            <h4 class="--text-heading text-lg font-semibold">
                <span v-if="state.inputs.uid">Edit Order</span>
                <span v-else>Request Order</span>
            </h4>
        </template>

        <template slot="content">

            <ValidationObserver ref="adjustment" v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(savePostEntry)">

                    <div class="form-group-wrap mb-3">
                        <label class="mb-2 block text-xs font-medium --text-dark">Choose Date</label>
                        <client-only>
                            <t-datepicker-range
                            :value="{start:state.inputs.time_in,end:state.inputs.time_out}"
                            @input="e => {
                                setState({ handle: 'state.inputs', key: 'time_in', value: e.start });
                                setState({ handle: 'state.inputs', key: 'time_out', value: e.end });
                            }"
                            :isComponentClearable="false"
                            mode="dateTime"
                            ></t-datepicker-range>
                        </client-only>

                        <ValidationProvider ref="adjustment_time_in" name="Start" v-slot="{ validate, errors }" rules="required">
                            <input type="hidden" 
                            :value="state.inputs.time_in" 
                            @input="(e) => {
                                setState({ handle: 'state.inputs', key: 'time_in', value: e.target.value });
                                validate(e);
                            }">
                            <v-msg :error="errors[0]" />
                        </ValidationProvider>

                        <ValidationProvider ref="adjustment_time_out" name="End" v-slot="{ validate, errors }" rules="required">
                            <input type="hidden" 
                            :value="state.inputs.time_out" 
                            @input="(e) => {
                                setState({ handle: 'state.inputs', key: 'time_out', value: e.target.value });
                                validate(e);
                            }">
                            <v-msg :error="errors[0]" />
                        </ValidationProvider>
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
                            <span v-if="state.inputs.uid">Save Order</span>
                            <span v-else>Save Changes</span>
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
import DateRangePickerCustom from "@components/reusables/DateRangePicker.vue";

export default {
    name: 'MainOrderForm',
    components: {
        AsyncButton,
        Modal,
        ValidationProvider,
        ValidationObserver,
        VMsg,
        tDatepickerRange: DateRangePickerCustom,
        tDatepicker: DatePickerCustom,
    },
    computed: {
        ...mapState({
            state: state => state.order.order.state
        }),
    },
    methods: {
        ...mapMutations('order/order', [
            'setState',
            'resetInputs'
        ]),
        ...mapActions('order/order', [
            'saveEntry'
        ]),
        async savePostEntry() {
            try {
                this.$refs.adjustment_btn.loading = true;
                await this.saveEntry();
                this.$refs.adjustmentmodal.open = false;
                this.$router.push('/order');
            } catch($e) {
                this.errorHandle($e, 'adjustment');
                this.$refs.adjustment_btn.loading = false;
            }
        }
    }
}
</script>