<template>
    <modal ref="adjustmentmodal" nofooter contentclass="xl:w-4/12 md:w-5/12 sm:w-7/12"
    @close="() => {
        resetInputs();
        $router.push('/order/by_printtype');
    }"
    >
        <template slot="header">
            <h4 class="--text-heading text-lg font-semibold">
                <span>Edit Order</span>
            </h4>
        </template>

        <template slot="content">

            <ValidationObserver ref="adjustment" v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(savePostEntry)">

                    <div class="form-group-wrap mb-3">
                        <label class="mb-2 block text-xs font-medium --text-dark">Status</label>
                        <client-only>
                            <client-only>
                                <t-select-dynamic 
                                :endpoint="`/item_status`" 
                                datakeylabel="id" 
                                datakeyvalue="id"
                                searchplaceholder="Type to Search Status"
                                placeholder="Choose Status"
                                class="py-1.5"
                                
                                @input="e => {
                                    setState({
                                        inputs: {
                                            // Line Items
                                            line_item_id: state.value.line_item_id,
                                            order_id: state.value.order_id,
                                            product_num: state.value.product_num,
                                            product_detail: state.value.product_detail,
                                            print_type_id: state.value.print_type_id,
                                            num_impressions: state.value.num_impressions,
                                            impressions_tradition: state.value.impressions_tradition,
                                            impressions_hispeed: state.value.impressions_hispeed,
                                            impressions_digital: state.value.impressions_digital,
                                            quantity: state.value.quantity,
                                            thumbnail: state.value.thumbnail,
                                            item_status_id: e,

                                            // Orders
                                            ship_date_id: state.value.ship_date_id,
                                            customer_name: state.value.customer_name,
                                            proof_spec_date: state.value.proof_spec_date,
                                            printing_company: state.value.printing_company,
                                            rush: state.value.rush,
                                        },
                                    });
                                }"
                                ></t-select-dynamic>
                                <input type="hidden" 
                                :value="state.inputs.id" 
                                @input="e => {
                                    setState({ handle: 'state.inputs', key: 'id', value: e }); 
                                    validate(e); 
                                }">
                                </client-only>
                        </client-only>

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
import TSelectDynamic from "@components/reusables/SelectDynamic.vue";
export default {
    name: 'MainOrderForm',
    components: {
        AsyncButton,
        Modal,
        ValidationProvider,
        ValidationObserver,
        VMsg,
        TSelectDynamic,
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
                this.$router.push('/order/by_printtype');
            } catch($e) {
                this.errorHandle($e, 'adjustment');
                this.$refs.adjustment_btn.loading = false;
            }
        }
    }
}
</script>