<template>
    <div>
        <h5 class="text-md mb-3 --text-heading font-semibold">Timezone and IN/OUT</h5>

        <ValidationObserver ref="timesetting" v-slot="{ handleSubmit }">
        <form class="mt-5" @submit.prevent="handleSubmit(updateData)">

            <ValidationProvider ref="timesetting_timezone" name="Timezone" v-slot="{ validate, errors }" rules="required">
                <div class="form-group-wrap mb-3">
                    <label class="mb-1 block text-xs font-medium --text-dark">Timezone</label>
                    <client-only>
                        <t-select
                        :options="timezone_lists"
                        :value="state.inputs.timezone"
                        @input="value => { 
                            setState({ handle: 'state.inputs', key: 'timezone', value: value });
                        }"
                        type="text"
                        class="v-input border border-gray-300 --text-dark text-sm rounded block input-focus-border" 
                        v-vchecker="errors[0]"
                        />
                    </client-only>
                    <input type="hidden" 
                    :value="state.inputs.timezone" 
                    @input="e => {
                        setState({ handle: 'state.inputs', key: 'timezone', value: e.target.value });
                        validate(e); 
                    }">
                    <v-msg :error="errors[0]" />
                </div>
            </ValidationProvider>


            <ValidationProvider ref="timesetting_attendance_min_in_hours" name="Minimum IN Minutes" v-slot="{ validate, errors }" rules="required">
            <div class="form-group-wrap mb-3">
                <label class="mb-1 block text-xs font-medium --text-dark"># of Minimum Minutes to allow Time-in from your shift schedule.</label>
                <input type="number" 
                class="v-input border border-gray-300 --text-dark text-sm rounded block px-3 p-2 input-focus-border" 
                :value="state.inputs.attendance_min_in_hours" 
                @input="e => { 
                    setState({ handle: 'state.inputs', key: 'attendance_min_in_hours', value: e.target.value });
                }"
                v-vchecker="errors[0]"
                >
                <v-msg :error="errors[0]" />
            </div>
            </ValidationProvider>

            
            <ValidationProvider ref="timesetting_attendance_min_hours" name="Minimum OUT Hours" v-slot="{ validate, errors }" rules="required">
            <div class="form-group-wrap mb-3">
                <label class="mb-1 block text-xs font-medium --text-dark"># of Minimum Hours to allow Time-out from your timein.</label>
                <input type="number" 
                class="v-input border border-gray-300 --text-dark text-sm rounded block px-3 p-2 input-focus-border" 
                :value="state.inputs.attendance_min_hours" 
                @input="e => { 
                    setState({ handle: 'state.inputs', key: 'attendance_min_hours', value: e.target.value });
                }"
                v-vchecker="errors[0]"
                >
                <v-msg :error="errors[0]" />
            </div>
            </ValidationProvider>


            <div class="form-group-wrap mb-3">
                <label class="mb-1 block text-xs font-medium --text-dark"># of Minimum Minutes to be consider as late.</label>
                <input type="number" 
                class="v-input border border-gray-300 --text-dark text-sm rounded block px-3 p-2 input-focus-border" 
                :value="state.inputs.timein_min_minutes" 
                @input="e => { 
                    setState({ handle: 'state.inputs', key: 'timein_min_minutes', value: e.target.value });
                }"
                >
            </div>


            <div class="form-group-wrap mb-3 mt-5">

                <div v-for="(setting, index) in getAttendanceSettings" :key="`attendance-setting-${genKey(setting)}`" class="mb-5 flex">
                    <div>
                        <label class="mb-1 block text-xs font-medium --text-dark">Color Indicator</label>
                        <color-picker 
                        :value="state.inputs.attendance_settings[index].color"
                        @input="(e) => setState({ handle: `state.inputs.attendance_settings[${index}]`, key: 'color', value: e })"
                        />
                    </div>

                    <div class="pl-5">
                        <label class="mb-1 block text-xs font-medium --text-dark">Hours Trigger</label>
                        <input type="number" 
                        class="v-input border border-gray-300 --text-dark text-sm rounded block px-3 p-2 input-focus-border" 
                        :value="state.inputs.attendance_settings[index].hour"
                        @input="(e) => setState({ handle: `state.inputs.attendance_settings[${index}]`, key: 'hour', value: parseInt(e.target.value) })"
                        >
                    </div>

                    <div class="pl-5">
                        <button type="button" :class="`py-1 my-2 --text-danger mt-5 text-xs`"
                        @click="removeAttendanceSetting(index)"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </div>

                </div>


                <div class="mt-3">
                    <button type="button" :class="`py-1 my-2 ${btnclassnormal} --bg-success --bg-success-hover`"
                    @click="insertAttendanceSetting"
                    >Add Setting</button>
                </div>

            </div>



            <div class="mt-20">
                <async-button type="submit" ref="btn" :class="` py-2 ${btnclassnormal}`">
                    Save Changes
                </async-button>
            </div>

        </form>
        </ValidationObserver>
    </div>
</template>
<script>
    import TSelect from "@components/reusables/Select.vue";
    import AsyncButton from "@components/reusables/AsyncButton.vue";
    import { ValidationProvider, ValidationObserver } from "vee-validate";
    import VMsg from "@components/reusables/VeeMessage.vue";
    import ColorPicker from "@components/reusables/ColorPicker.vue";
    import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
    export default {
        components: {
            ColorPicker,
            ValidationProvider,
            ValidationObserver,
            VMsg,
            AsyncButton,
            TSelect
        },
        computed: {
            ...mapState({
                state: state => state.employees.settings.state
            }),
            ...mapGetters('employees/settings', [
                'getAttendanceSettings'
            ]),
            timezone_lists() {
                return this.$moment.tz.names();
            }
        },
        methods: {
            ...mapMutations('employees/settings', [
                'setState',
                'insertAttendanceSetting',
                'removeAttendanceSetting'
            ]),
            ...mapActions('employees/settings', [
                'updateTimeSettings'
            ]),
            async updateData() {
                this.$refs.btn.loading = true;
                try {
                    await this.updateTimeSettings();
                    this.$store.dispatch('global/refreshUserSession', {}, { root: true });
                    this.$refs.btn.loading = false;
                } catch($e) {
                    this.errorHandle($e, 'timesetting');
                    this.$refs.btn.loading = false;
                }
            }
        }
    }
    </script>