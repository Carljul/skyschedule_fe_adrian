<template>
    <div>
        <modal ref="postentrymodal" @close="() => {
            resetInputs();
            $router.push('/events');
        }" nofooter contentclass="xl:w-5/12 md:w-6/12 sm:w-8/12">

            <template slot="header">
                <h4 class="--text-heading text-lg font-semibold">
                    <span v-if="state.inputs.uid">Edit Event</span>
                    <span v-else>New Event</span>
                </h4>
            </template>

            <template slot="content">
                <ValidationObserver ref="postentry" v-slot="{ handleSubmit }">
                    <form @submit.prevent="handleSubmit(postEvent)">
                        
                        <ValidationProvider ref="postentry_event" name="Event" v-slot="{ validate, errors }" rules="required">
                        <div class="form-group-wrap mb-3">
                            <editor 
                            :value="state.inputs.event"
                            @input="(e) => setState({ handle: 'state.inputs', key: 'event', value: e })"
                            />

                            <input type="hidden" 
                            :value="state.inputs.event" 
                            @input="(e) => {
                                setState({ handle: 'state.inputs', key: 'event', value: e.target.value });
                                validate(e);
                            }">
                            <v-msg :error="errors[0]" />
                        </div>
                        </ValidationProvider>

                        <div class="form-group-wrap mb-3">
                            <label class="mb-2 block text-xs font-medium --text-dark">Choose Date</label>
                            <client-only>
                                <t-datepicker-range
                                :value="{start:state.inputs.event_start,end:state.inputs.event_end}"
                                @input="e => {
                                    setState({ handle: 'state.inputs', key: 'event_start', value: e.start });
                                    setState({ handle: 'state.inputs', key: 'event_end', value: e.end });
                                }"
                                :isComponentClearable="false"
                                mode="dateTime"
                                ></t-datepicker-range>
                            </client-only>

                            <ValidationProvider ref="postentry_event_start" name="Event Start" v-slot="{ validate, errors }" rules="required">
                                <input type="hidden" 
                                :value="state.inputs.event_start" 
                                @input="(e) => {
                                    setState({ handle: 'state.inputs', key: 'event_start', value: e.target.value });
                                    validate(e);
                                }">
                                <v-msg :error="errors[0]" />
                            </ValidationProvider>

                            <ValidationProvider ref="postentry_event_end" name="Event End" v-slot="{ validate, errors }" rules="required">
                                <input type="hidden" 
                                :value="state.inputs.event_end" 
                                @input="(e) => {
                                    setState({ handle: 'state.inputs', key: 'event_end', value: e.target.value });
                                    validate(e);
                                }">
                                <v-msg :error="errors[0]" />
                            </ValidationProvider>
                        </div>

                        <div class="form-group-wrap mb-3">
                            <label class="mb-2 block text-xs font-medium --text-dark">Event Color</label>
                            <color-picker 
                            :value="state.inputs.color"
                            @input="(e) => setState({ handle: 'state.inputs', key: 'color', value: e })"
                            />
                        </div>

                        <div class="form-group-wrap mb-3">
                            <label class="mb-2 block text-xs font-medium --text-dark">Repeatable event for another year.</label>
                            <SwitchToggle
                            :tooltipEnabled="false"
                            :value="state.inputs.is_repeatable"
                            @input="e => {
                                setState({ handle: 'state.inputs', key: 'is_repeatable', value: e }); 
                            }"
                            >
                                <template>
                                    <span class="text-sm --text-dark mr-1" v-if="state.inputs.is_repeatable">Repeatable</span>
                                    <span class="text-sm --text-dark mr-1" v-else>Not Repeatable</span>
                                </template>
                            </SwitchToggle>
                        </div>


                        <div class="form-group-wrap mt-10 flex items-center">
                            <div>
                                <async-button ref="postentry_btn" type="submit" :class="`p-2 ${btnclassnormal}`">
                                    <span v-if="state.inputs.uid">Save Event</span>
                                    <span v-else>Save Changes</span>
                                </async-button>
                            </div>

                            <div v-if="state.inputs.uid" class="ml-2">
                                <async-button ref="removemetric" @click="confirmRemoveEntry(state.inputs)" type="button" :class="`p-2 ${btnclassnormal} --bg-danger --bg-danger-hover`">
                                    Remove Event
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
import SwitchToggle from "@components/reusables/SwitchToggle.vue";

import { mapState, mapMutations, mapActions } from "vuex";

export default {
    name: 'MainEventsFormModal',
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
        AlertConfirm,
        SwitchToggle
    },
    computed: {
        ...mapState({
            state: state => state.main.events.state
        })
    },
    methods: {
        ...mapMutations('main/events', [
            'resetInputs',
            'setState'
        ]),
        ...mapActions('main/events', [
            'postSaveEvent',
            'removeEntry'
        ]),
        async postEvent() {
            try {
                this.$refs.postentry_btn.loading = true;
                await this.postSaveEvent();
                this.$router.push('/events');
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
                    e.notify({ title: 'Success!', html: `Event ${e.appdefaults.removeConfirm.success}` });
                    e.$router.push('/events');
                }
            });
        }
    }
}
</script>