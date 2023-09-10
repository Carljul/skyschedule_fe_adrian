<template>
    <div>
        <modal ref="postentrymodal" @close="() => {
            resetMetricsInput();
            $router.push('/metrics');
        }" nofooter contentclass="xl:w-5/12 md:w-6/12 sm:w-8/12">

            <template slot="header">
                <h4 class="--text-heading text-lg font-semibold">
                    <span v-if="state.metricsInput.uid">Edit Metric</span>
                    <span v-else>New Metrics</span>
                </h4>
            </template>

            <template slot="content">
                <ValidationObserver ref="postentry" v-slot="{ handleSubmit }">
                    <form @submit.prevent="handleSubmit(postMetrics)">

                        <div class="form-group-wrap mb-3">
                            <editor 
                            :value="state.metricsInput.metrics_value"
                            @input="(e) => setState({ handle: 'state.metricsInput', key: 'metrics_value', value: e })"
                            />
                        </div>

                        <div class="form-group-wrap mb-3">
                            <label class="mb-2 block text-xs font-medium --text-dark">Choose Date</label>
                            <client-only>
                                <t-datepicker-range
                                :value="{start:state.metricsInput.metrics_date,end:state.metricsInput.metrics_dateend}"
                                @input="e => {
                                    setState({ handle: 'state.metricsInput', key: 'metrics_date', value: e.start });
                                    setState({ handle: 'state.metricsInput', key: 'metrics_dateend', value: e.end });
                                }"
                                :isComponentClearable="false"
                                mode="dateTime"
                                ></t-datepicker-range>
                            </client-only>

                            <ValidationProvider ref="postentry_metrics_date" name="Date From" v-slot="{ validate, errors }" rules="required">
                                <input type="hidden" 
                                :value="state.metricsInput.metrics_date" 
                                @input="(e) => {
                                    setState({ handle: 'state.metricsInput', key: 'metrics_date', value: e.target.value });
                                    validate(e);
                                }">
                                <v-msg :error="errors[0]" />
                            </ValidationProvider>

                            <ValidationProvider ref="postentry_metrics_dateend" name="Date To" v-slot="{ validate, errors }" rules="required">
                                <input type="hidden" 
                                :value="state.metricsInput.metrics_dateend" 
                                @input="(e) => {
                                    setState({ handle: 'state.metricsInput', key: 'metrics_dateend', value: e.target.value });
                                    validate(e);
                                }">
                                <v-msg :error="errors[0]" />
                            </ValidationProvider>
                        </div>

                        <div class="form-group-wrap mb-3">
                            <label class="mb-2 block text-xs font-medium --text-dark">Metrics Color</label>
                            <color-picker 
                            :value="state.metricsInput.color"
                            @input="(e) => setState({ handle: 'state.metricsInput', key: 'color', value: e })"
                            />
                        </div>

                        <div class="form-group-wrap mt-10 flex items-center">
                            <div>
                                <async-button ref="postentry_btn" type="submit" :class="`p-2 ${btnclassnormal}`">
                                    <span v-if="state.metricsInput.uid">Save Metrics</span>
                                    <span v-else>Save Changes</span>
                                </async-button>
                            </div>

                            <div v-if="state.metricsInput.uid" class="ml-2">
                                <async-button ref="removemetric" @click="confirmRemoveEntry(state.metricsInput)" type="button" :class="`p-2 ${btnclassnormal} --bg-danger --bg-danger-hover`">
                                    Remove Metric
                                </async-button>
                            </div>
                        </div>

                    </form>
                </ValidationObserver>
            </template>

        </modal>

        <alert-confirm ref="alertconfirm"></alert-confirm>
    </div>
</template>
<script>
import DatePicker from "@components/reusables/DatePicker.vue";
import ColorPicker from "@components/reusables/ColorPicker.vue";
import DateRangePickerCustom from "@components/reusables/DateRangePicker.vue";
import Editor from "@components/reusables/Editor.vue";
import Modal from "@components/reusables/Modal.vue";
import AsyncButton from "@components/reusables/AsyncButton.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VMsg from "@components/reusables/VeeMessage.vue";
import AlertConfirm from "@components/reusables/AlertConfirm.vue";

import { mapState, mapMutations, mapActions } from "vuex";

export default {
    name: 'MainMetricsFormModal',
    components: {
        DatePicker,
        ColorPicker,
        tDatepickerRange: DateRangePickerCustom,
        Editor,
        Modal,
        AsyncButton,
        ValidationProvider,
        ValidationObserver,
        VMsg,
        AlertConfirm
    },
    computed: {
        ...mapState({
            state: state => state.main.metrics.state
        })
    },
    methods: {
        ...mapMutations('main/metrics', [
            'resetMetricsInput',
            'setState'
        ]),
        ...mapActions('main/metrics', [
            'postSaveMetrics',
            'removeEntry'
        ]),
        async postMetrics() {
            try {
                this.$refs.postentry_btn.loading = true;
                await this.postSaveMetrics();
                this.$router.push('/metrics');
                this.$refs.postentrymodal.open = false;
            } catch($e) {
                this.errorHandle($e, 'postentry');
                this.$refs.postentry_btn.loading = false;
            }
        },
        async confirmRemoveEntry(payload) {
            const e = this;
            e.$refs.alertconfirm.$alert({
                title: 'Delete Confirmation',
                html: e.appdefaults.removeConfirm.html,
                execute: async function() {
                    await e.removeEntry(payload);
                    e.notify({ title: 'Success!', html: `Metrics ${e.appdefaults.removeConfirm.success}` });
                    e.$router.push('/metrics');
                }
            });
        }
    }
}
</script>