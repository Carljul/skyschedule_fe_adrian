<template>
    <div>
        <div v-if="appIsEmployee && !attendance.loading && attendance.attendance">
            <async-button 
            v-if="!attendance.attendance.break" 
            @click="execInOut"
            type="button" ref="breakinout"
            class="btn py-2 px-5 rounded --text-light --bg-success text-sm uppercase font-bold w-40 text-center cursor-pointer w-fit"
            >{{appdefaults.breakin}}</async-button>

            <async-button type="button" 
            @click="execInOut"
            ref="breakinout" v-else
            class="btn py-2 px-5 rounded --text-light --bg-danger text-sm uppercase font-bold w-40 text-center cursor-pointer"
            :title="appdefaults.breakout" 
            v-tooltip="appdefaults.breakout"
            :style="{
                'background': getBreaksTrigger.color
            }"
            >{{realtimeMoment.diff($moment(attendance.attendance.break.time_in), 'minutes')}} MINS</async-button>
        </div>


        <modal ref="breaksmodal"
        nofooter contentclass="xl:w-3/12 md:w-5/12 sm:w-7/12"
        @close="attendanceSetState({ handle: 'state', key: 'breakNotes', value: null })"
        >
            <template slot="header">
                <div>
                    <h4 class="--text-heading text-lg font-semibold">
                        <span>Overbreak Note:</span>
                    </h4>
                    <label class="mb-2 block text-xs font-medium --text-dark">You are taking over break, please indicate your reason.</label>
                </div>
            </template>

            <template slot="content">
                <ValidationObserver ref="newentry" v-slot="{ handleSubmit }">
                    <form @submit.prevent="handleSubmit(execBreakInOutModal)">
                        <ValidationProvider name="Notes" v-slot="{ validate, errors }" rules="required">
                            <div class="form-group-wrap mb-3">
                                <textarea 
                                    :value="attendance.breakNotes"
                                    @input="e => { 
                                        attendanceSetState({ handle: 'state', key: 'breakNotes', value: e.target.value });
                                        validate(e); 
                                    }"
                                    type="text"
                                    class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                                    v-vchecker="errors[0]"
                                    ></textarea>
                                <v-msg :error="errors[0]" />
                            </div>
                        </ValidationProvider>

                        <async-button
                        type="submit" ref="attendancemodalbtn"
                        class="btn py-3 px-5 rounded --text-light --bg-primary text-sm uppercase font-bold w-40 text-center cursor-pointer"
                        >End Break</async-button>
                    </form>
                </ValidationObserver>
            </template>
        </modal>


    </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import AsyncButton from "@components/reusables/AsyncButton.vue";
import momentrealtimemixins from '~/mixins/momentrealtime';

import { ValidationProvider, ValidationObserver } from "vee-validate";
import VMsg from "@components/reusables/VeeMessage.vue";
import Modal from '@components/reusables/Modal.vue';

export default {
    name: 'TimersBreakInOut',
    mixins: [momentrealtimemixins],
    components: {
        AsyncButton,
        Modal,
        ValidationProvider,
        ValidationObserver,
        VMsg,
    },
    computed: {
        ...mapState({
            attendance: state => state.employees.attendance.state,
        }),

        getBreaksTrigger() {
            const defaultSetting = { hour: 1, color: 'var(--pref-color-primary)' };

            if(this.appIsEmployee && this.attendance.attendance && this.attendance.attendance.break) {
                const attendancesettings = Array.isArray(this.getOrganization.break_settings) ? this.getOrganization.break_settings : [];
                if(!attendancesettings.length) { return defaultSetting; }
                
                const getCurrentHourTimeIn = this.realtimeMoment.diff(this.$moment(this.attendance.attendance.break.time_in), 'minutes');
                const getAttendanceSetting = attendancesettings.filter(row => row.hour >= getCurrentHourTimeIn);
                if(!getAttendanceSetting.length) {
                    // get first lowest
                    return attendancesettings.reduce((prev, current) => {
                        return (prev.hour < current.hour) ? prev : current;
                    });
                }

                return getAttendanceSetting.reduce((prev, current) => {
                    return (prev.hour < current.hour) ? prev : current;
                });
            }

            return defaultSetting;
        },
    },
    methods: {
        ...mapMutations('employees/attendance', {
            attendanceSetState: 'setState'
        }),
        ...mapActions('employees/attendance', [
            'breakLunchInOut'
        ]),
        async execInOut() {
            try {
                this.$refs.breakinout.loading = true;
                await this.breakLunchInOut('breaks');
                this.$refs.breakinout.loading = false;
            } catch($e) {
                this.$refs.breakinout.loading = false;
                if($e.response.status==422 && $e.response.data.response=="notes required") {
                    this.$refs.breaksmodal.open = true;
                } else {
                    this.notify({ 
                        title: 'Break was Disabled', 
                        html: `You are not allowed to take a break, you only have <strong>${this.getOrganization.break_min_attempt}<strong> break limit.`, 
                        type: 'warning' 
                    });
                }
            }
        },

        async execBreakInOutModal() {
            this.$refs.attendancemodalbtn.loading = true;
            await this.breakLunchInOut('breaks');
            this.attendanceSetState({ handle: 'state', key: 'breakNotes', value: null });
            this.$refs.breaksmodal.open = false;
        }
    }
}
</script>