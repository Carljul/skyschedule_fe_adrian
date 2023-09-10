<template>
    <div>

        <button 
        @click="$refs.userform.open=true"
        :class="`p-3 ${btnclassnormal} mb-2 inline-flex items-center p-2 space-x-1 text-sm float-right fixed bottom-2 right-2 lg:static lg:px-4 lg:py-2.5`">
            <span>New Organization</span>
        </button>

        <modal ref="userform" nofooter contentclass="xl:w-5/12 md:w-6/12 sm:w-8/12">
            <template slot="header">
                <h4 class="--text-heading text-lg font-semibold">
                    <span>New Organization</span>
                </h4>
            </template>

            <template slot="content">

                <ValidationObserver ref="newuser" v-slot="{ handleSubmit }">
                    <form @submit.prevent="handleSubmit(registerUser)">
                        
                        <ValidationProvider ref="newuser.logo" name="Logo" v-slot="{ validate, errors }">
                            <div class="form-group-wrap mb-3">
                                <label for="new-firstname" class="mb-2 block text-xs font-medium --text-dark">Organization Photo</label>
                                <dropzone-min
                                :mimes="imageMimes"
                                title="Organization Logo"
                                :value="state.inputs.logo"
                                @input="e => { 
                                    setState({ inputs: { ...state.inputs, logo: e } });
                                }"
                                />

                                <input type="hidden" 
                                :value="state.inputs.logo" 
                                @input="e => {
                                    setState({ inputs: { ...state.inputs, logo: e.target.value } }); 
                                    validate(e); 
                                }">
                                <v-msg :error="errors[0]" />
                            </div>
                        </ValidationProvider>

                        <ValidationProvider ref="newuser_organization" name="Organization" v-slot="{ validate, errors }" rules="required">
                            <div class="form-group-wrap mb-3">
                                <label class="mb-1 block text-xs font-medium --text-dark">Company/Organization</label>
                                <input 
                                :value="state.inputs.organization"
                                @input="e => { 
                                    setState({ inputs: { ...state.inputs, organization: e.target.value } }); 
                                    validate(e); 
                                }"
                                type="text"
                                class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                                v-vchecker="errors[0]"
                                />
                                <v-msg :error="errors[0]" />
                            </div>
                        </ValidationProvider>

                        <ValidationProvider ref="newuser_timezone" name="Timezone" v-slot="{ validate, errors }" rules="required">
                            <div class="form-group-wrap mb-3">
                                <label class="mb-1 block text-xs font-medium --text-dark">Timezone</label>
                                <client-only>
                                    <t-select
                                    :options="timezone_lists"
                                    :value="state.inputs.timezone"
                                    @input="value => { 
                                        setState({ inputs: { ...state.inputs, timezone: value } });
                                    }"
                                    type="text"
                                    class="v-input border border-gray-300 --text-dark text-sm rounded block w-full input-focus-border" 
                                    v-vchecker="errors[0]"
                                    />
                                </client-only>
                                <input type="hidden" 
                                :value="state.inputs.timezone" 
                                @input="e => {
                                    setState({ inputs: { ...state.inputs, timezone: value } }); 
                                    validate(e); 
                                }">
                                <v-msg :error="errors[0]" />
                            </div>
                        </ValidationProvider>

                        <div class="mb-5">
                            <h3 class="mt-5 mb-1 --text-dark font-bold">Employee ID System</h3>
                            <p class="--text-dark text-xs">Available shortcodes: <code>[year]</code> <code>[month]</code> <code>[day]</code></p>
                        </div>

                        <div class="grid grid-cols-3 gap-4">

                            <div class="form-group-wrap mb-3">
                            <label class="mb-1 block text-xs font-medium --text-dark">ID Prefix</label>
                            <input type="text" 
                            class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                            :value="state.inputs.employee_id_prefix" 
                            @input="e => { 
                                setState({ inputs: { ...state.inputs, employee_id_prefix: e.target.value } });
                            }">
                            </div>

                            <div class="form-group-wrap mb-3">
                            <label class="mb-1 block text-xs font-medium --text-dark">ID Zero Length</label>
                            <input type="number" 
                            class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                            :value="state.inputs.employee_id_zero_length" 
                            @input="e => { 
                                setState({ inputs: { ...state.inputs, employee_id_zero_length: e.target.value } });
                            }">
                            <p class="--text-dark text-xs">If the id has auto-zero fill</p>
                            <p class="--text-dark text-xs">ex: prefix-00001-suffix</p>
                            </div>

                            <div class="form-group-wrap mb-3">
                            <label class="mb-1 block text-xs font-medium --text-dark">ID Suffix</label>
                            <input type="text" 
                            class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                            :value="state.inputs.employee_id_suffix" 
                            @input="e => { 
                                setState({ inputs: { ...state.inputs, employee_id_suffix: e.target.value } });
                            }">
                            </div>

                        </div>


                        <h3 class="mt-5 mb-1 --text-dark font-bold">Credentials</h3>

                        <ValidationProvider ref="newuser_name" name="Name" v-slot="{ validate, errors }" rules="required">
                            <div class="form-group-wrap mb-3">
                                <label class="mb-1 block text-xs font-medium --text-dark">Name</label>
                                <input 
                                :value="state.inputs.name"
                                @input="e => { 
                                    setState({ inputs: { ...state.inputs, name: e.target.value } }); 
                                    validate(e); 
                                }"
                                type="text"
                                class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                                v-vchecker="errors[0]"
                                />
                                <v-msg :error="errors[0]" />
                            </div>
                        </ValidationProvider>


                        <ValidationProvider ref="newuser_email" name="Email" v-slot="{ validate, errors }" rules="required|email">
                            <div class="form-group-wrap mb-3">
                                <label class="mb-1 block text-xs font-medium --text-dark">Email</label>
                                <input 
                                :value="state.inputs.email"
                                @input="e => { 
                                    setState({ inputs: { ...state.inputs, email: e.target.value } }); 
                                    validate(e); 
                                }"
                                type="email"
                                class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                                v-vchecker="errors[0]"
                                />
                                <v-msg :error="errors[0]" />
                            </div>
                        </ValidationProvider>


                        <ValidationProvider vid="newuser_password" ref="newuser_password" name="Password" v-slot="{ validate, errors }" rules="required|min:8">
                            <div class="form-group-wrap mb-3">
                                <label class="mb-1 block text-xs font-medium --text-dark">Password</label>
                                <input 
                                :value="state.inputs.password"
                                @input="e => { 
                                    setState({ inputs: { ...state.inputs, password: e.target.value } }); 
                                    validate(e); 
                                }"
                                type="password"
                                class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                                v-vchecker="errors[0]"
                                />
                                <v-msg :error="errors[0]" />
                            </div>
                        </ValidationProvider>

                        <ValidationProvider ref="newuser_password_confirmation" name="Confirm Password" v-slot="{ validate, errors }" rules="required|confirmed:newuser_password|min:8">
                            <div class="form-group-wrap mb-3">
                                <label class="mb-1 block text-xs font-medium --text-dark">Confirm Password</label>
                                <input 
                                :value="state.inputs.password_confirmation"
                                @input="e => { 
                                    setState({ inputs: { ...state.inputs, password_confirmation: e.target.value } }); 
                                    validate(e); 
                                }"
                                type="password"
                                class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                                v-vchecker="errors[0]"
                                />
                                <v-msg :error="errors[0]" />
                            </div>
                        </ValidationProvider>

                        <div class="form-group-wrap">
                            <async-button ref="newuser_btn" type="submit" :class="`p-3 ${btnclassnormal} mt-3`">
                                Register
                            </async-button>
                        </div>

                    </form>
                </ValidationObserver>

            </template>
        </modal>
    </div>
</template>
<script>
import AsyncButton from "@components/reusables/AsyncButton.vue";
import Modal from "@components/reusables/Modal.vue";
import TSelect from "@components/reusables/Select.vue";
import DropzoneMin from "@components/reusables/DropZoneMin.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VMsg from "@components/reusables/VeeMessage.vue";

import { mapState, mapMutations, mapActions } from "vuex";
export default {
    name: 'AdminOrganizationsNewForm',
    components: {
        AsyncButton,
        Modal,
        TSelect,
        DropzoneMin,
        ValidationProvider,
        ValidationObserver,
        VMsg
    },
    computed: {
        ...mapState({
            state: state => state.administration.organizations.state
        }),
        timezone_lists() {
            return this.$moment.tz.names();
        }
    },
    methods: {
        ...mapMutations('administration/organizations', [
            'setState',
        ]),
        ...mapActions('administration/organizations', [
            'StoreInsertEntry'
        ]),
        async registerUser() {
            try {
                this.$refs.newuser_btn.loading = true;
                await this.StoreInsertEntry();
                this.$refs.newuser_btn.loading = false;
                this.$refs.userform.open = false;
                this.$refs.newuser.reset();
            } catch($e) {
                this.errorHandle($e, 'newuser');
                this.$refs.newuser_btn.loading = false;
            }
        }
    }
}
</script>