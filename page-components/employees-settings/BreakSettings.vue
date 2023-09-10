<template>
    <div>

        <div>
            <ValidationObserver ref="timesetting" v-slot="{ handleSubmit }">
            <form class="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-6" @submit.prevent="handleSubmit(updateData)">


            <div>
                <h5 class="text-md mb-3 --text-heading font-semibold">Break Settings</h5>

                <ValidationProvider ref="timesetting_break_min_duration" name="Minimum Break Minutes" v-slot="{ validate, errors }" rules="required">
                <div class="form-group-wrap mb-3">
                    <label class="mb-1 block text-xs font-medium --text-dark"># of Minimum Minutes consumed for breaks.</label>
                    <input type="number" 
                    class="v-input border border-gray-300 --text-dark text-sm rounded block px-3 p-2 input-focus-border" 
                    :value="state.inputs.break_min_duration" 
                    @input="e => { 
                        setState({ handle: 'state.inputs', key: 'break_min_duration', value: e.target.value });
                    }"
                    v-vchecker="errors[0]"
                    >
                    <v-msg :error="errors[0]" />
                </div>
                </ValidationProvider>


                <ValidationProvider ref="timesetting_break_min_attempt" name="Minimum Break Minutes" v-slot="{ validate, errors }" rules="required">
                <div class="form-group-wrap mb-3">
                    <label class="mb-1 block text-xs font-medium --text-dark"># of attempts to use break (use 0 value for unli breaks).</label>
                    <input type="number" 
                    class="v-input border border-gray-300 --text-dark text-sm rounded block px-3 p-2 input-focus-border" 
                    :value="state.inputs.break_min_attempt" 
                    @input="e => { 
                        setState({ handle: 'state.inputs', key: 'break_min_attempt', value: e.target.value });
                    }"
                    v-vchecker="errors[0]"
                    >
                    <v-msg :error="errors[0]" />
                </div>
                </ValidationProvider>


                <div class="form-group-wrap mb-3 mt-5">

                    <div v-for="(setting, index) in getBreakSettings" :key="`break-setting-${genKey(setting)}`" class="mb-5 flex">
                        <div>
                            <label class="mb-1 block text-xs font-medium --text-dark">Color Indicator</label>
                            <color-picker 
                            :value="state.inputs.break_settings[index].color"
                            @input="(e) => setState({ handle: `state.inputs.break_settings[${index}]`, key: 'color', value: e })"
                            />
                        </div>

                        <div class="pl-5">
                            <label class="mb-1 block text-xs font-medium --text-dark">Minutes Trigger</label>
                            <input type="number" 
                            class="v-input border border-gray-300 --text-dark text-sm rounded block px-3 p-2 input-focus-border" 
                            :value="state.inputs.break_settings[index].hour"
                            @input="(e) => setState({ handle: `state.inputs.break_settings[${index}]`, key: 'hour', value: parseInt(e.target.value) })"
                            >
                        </div>

                        <div class="pl-5">
                            <button type="button" :class="`py-1 my-2 --text-danger mt-5 text-xs`"
                            @click="removeSettingJsonArray({ key: 'break_settings', value: index })"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        </div>

                    </div>


                    <div class="mt-3">
                        <button type="button" :class="`py-1 my-2 ${btnclassnormal} --bg-success --bg-success-hover`"
                        @click="insertSettingJsonArray('break_settings')"
                        >Add Setting</button>
                    </div>

                </div>
            </div>



            <div>
                <h5 class="text-md mb-3 --text-heading font-semibold">Lunch Settings</h5>

                <ValidationProvider ref="timesetting_lunch_min_duration" name="Minimum Break Minutes" v-slot="{ validate, errors }" rules="required">
                <div class="form-group-wrap mb-3">
                    <label class="mb-1 block text-xs font-medium --text-dark"># of Minimum Minutes consumed for lunch.</label>
                    <input type="number" 
                    class="v-input border border-gray-300 --text-dark text-sm rounded block px-3 p-2 input-focus-border" 
                    :value="state.inputs.lunch_min_duration" 
                    @input="e => { 
                        setState({ handle: 'state.inputs', key: 'lunch_min_duration', value: e.target.value });
                    }"
                    v-vchecker="errors[0]"
                    >
                    <v-msg :error="errors[0]" />
                </div>
                </ValidationProvider>


                <ValidationProvider ref="timesetting_lunch_min_attempt" name="Minimum Lunch Attempt" v-slot="{ validate, errors }" rules="required">
                <div class="form-group-wrap mb-3">
                    <label class="mb-1 block text-xs font-medium --text-dark"># of attempts to use lunch (use 0 value for unli lunch).</label>
                    <input type="number" 
                    class="v-input border border-gray-300 --text-dark text-sm rounded block px-3 p-2 input-focus-border" 
                    :value="state.inputs.lunch_min_attempt" 
                    @input="e => { 
                        setState({ handle: 'state.inputs', key: 'lunch_min_attempt', value: e.target.value });
                    }"
                    v-vchecker="errors[0]"
                    >
                    <v-msg :error="errors[0]" />
                </div>
                </ValidationProvider>


                <div class="form-group-wrap mb-3 mt-5">

                    <div v-for="(setting, index) in getLunchSettings" :key="`break-setting-${genKey(setting)}`" class="mb-5 flex">
                        <div>
                            <label class="mb-1 block text-xs font-medium --text-dark">Color Indicator</label>
                            <color-picker 
                            :value="state.inputs.lunch_settings[index].color"
                            @input="(e) => setState({ handle: `state.inputs.lunch_settings[${index}]`, key: 'color', value: e })"
                            />
                        </div>

                        <div class="pl-5">
                            <label class="mb-1 block text-xs font-medium --text-dark">Minutes Trigger</label>
                            <input type="number" 
                            class="v-input border border-gray-300 --text-dark text-sm rounded block px-3 p-2 input-focus-border" 
                            :value="state.inputs.lunch_settings[index].hour"
                            @input="(e) => setState({ handle: `state.inputs.lunch_settings[${index}]`, key: 'hour', value: parseInt(e.target.value) })"
                            >
                        </div>

                        <div class="pl-5">
                            <button type="button" :class="`py-1 my-2 --text-danger mt-5 text-xs`"
                            @click="removeSettingJsonArray({ key: 'lunch_settings', value: index })"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                        </div>

                    </div>


                    <div class="mt-3">
                        <button type="button" :class="`py-1 my-2 ${btnclassnormal} --bg-success --bg-success-hover`"
                        @click="insertSettingJsonArray('lunch_settings')"
                        >Add Setting</button>
                    </div>

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

    </div>
</template>
<script>
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
            AsyncButton
        },
        computed: {
            ...mapState({
                state: state => state.employees.settings.state
            }),
            ...mapGetters('employees/settings', [
                'getBreakSettings',
                'getLunchSettings'
            ]),
            timezone_lists() {
                return this.$moment.tz.names();
            }
        },
        methods: {
            ...mapMutations('employees/settings', [
                'setState',
                'insertSettingJsonArray',
                'removeSettingJsonArray'
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