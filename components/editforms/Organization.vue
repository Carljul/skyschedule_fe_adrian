<template>
    <div>
        <ValidationObserver ref="updateuser" v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(updateUser)">
                
                <ValidationProvider ref="updateuser_logo" name="Logo" v-slot="{ validate, errors }">
                    <div class="form-group-wrap mb-3">
                        <label for="new-firstname" class="mb-2 block text-xs font-medium --text-dark">Organization Photo</label>
                        <dropzone-min
                        :mimes="imageMimes"
                        title="Organization Logo"
                        :value="state.selected.logo"
                        @input="e => { 
                            setState({ selected: { ...state.selected, logo: e } });
                        }"
                        />

                        <input type="hidden" 
                        :value="state.selected.logo" 
                        @input="e => {
                            setState({ selected: { ...state.selected, logo: e.target.value } }); 
                            validate(e); 
                        }">
                        <v-msg :error="errors[0]" />
                    </div>
                </ValidationProvider>

                <ValidationProvider ref="updateuser_organization" name="Organization" v-slot="{ validate, errors }" rules="required">
                    <div class="form-group-wrap mb-3">
                        <label class="mb-1 block text-xs font-medium --text-dark">Company/Organization</label>
                        <input 
                        :value="state.selected.organization"
                        @input="e => { 
                            setState({ selected: { ...state.selected, organization: e.target.value } }); 
                            validate(e); 
                        }"
                        type="text"
                        class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                        v-vchecker="errors[0]"
                        />
                        <v-msg :error="errors[0]" />
                    </div>
                </ValidationProvider>

                <ValidationProvider ref="updateuser_timezone" name="Timezone" v-slot="{ validate, errors }" rules="required">
                    <div class="form-group-wrap mb-3">
                        <label class="mb-1 block text-xs font-medium --text-dark">Timezone</label>
                        <client-only>
                            <t-select
                            :options="timezone_lists"
                            :value="state.selected.timezone"
                            @input="value => { 
                                setState({ selected: { ...state.selected, timezone: value } });
                            }"
                            type="text"
                            class="v-input border border-gray-300 --text-dark text-sm rounded block w-full input-focus-border" 
                            v-vchecker="errors[0]"
                            />
                        </client-only>
                        <input type="hidden" 
                        :value="state.selected.timezone" 
                        @input="e => {
                            setState({ selected: { ...state.selected, timezone: e.target.value } }); 
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
                    :value="state.selected.employee_id_prefix" 
                    @input="e => { 
                        setState({ selected: { ...state.selected, employee_id_prefix: e.target.value } });
                    }">
                    </div>

                    <div class="form-group-wrap mb-3">
                    <label class="mb-1 block text-xs font-medium --text-dark">ID Zero Length</label>
                    <input type="number" 
                    class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                    :value="state.selected.employee_id_zero_length" 
                    @input="e => { 
                        setState({ selected: { ...state.selected, employee_id_zero_length: e.target.value } });
                    }">
                    <p class="--text-dark text-xs">If the id has auto-zero fill</p>
                    <p class="--text-dark text-xs">ex: prefix-00001-suffix</p>
                    </div>

                    <div class="form-group-wrap mb-3">
                    <label class="mb-1 block text-xs font-medium --text-dark">ID Suffix</label>
                    <input type="text" 
                    class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                    :value="state.selected.employee_id_suffix" 
                    @input="e => { 
                        setState({ selected: { ...state.selected, employee_id_suffix: e.target.value } });
                    }">
                    </div>

                </div>


                <div class="form-group-wrap mb-3">
                    <label class="mb-1 block text-xs font-medium --text-dark">Probationary Months</label>
                    <input 
                    :value="state.selected.probationary_months"
                    @input="e => { 
                        setState({ selected: { ...state.selected, probationary_months: e.target.value } }); 
                    }"
                    type="number"
                    class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border"
                    />
                    <p class="text-xs block mt-1 --text-dark"># of months to become a regular employee.</p>
                </div>

                <div class="form-group-wrap mb-3">
                    <label class="mb-1 block text-xs font-medium --text-dark">Currency</label>
                    <input 
                    :value="state.selected.currency"
                    @input="e => { 
                        setState({ selected: { ...state.selected, currency: e.target.value } }); 
                    }"
                    type="text"
                    class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border"
                    />
                </div>


                <div>
                    <h3 class="mt-5 mb-1 --text-dark font-bold">Webhooks</h3>

                    <div class="form-group-wrap mb-3">
                        <label class="mb-1 block text-xs font-medium --text-dark">Google Hangouts</label>
                        <input 
                        :value="state.selected.webhook_google_hangouts_chat"
                        @input="e => { 
                            setState({ selected: { ...state.selected, webhook_google_hangouts_chat: e.target.value } }); 
                        }"
                        type="text"
                        class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border"
                        />
                        <p class="text-xs block mt-1 --text-dark">Go to your Google Hangout Space > Manage Webhooks > Enter the generated webhook url.</p>
                    </div>

                </div>
                

                <h3 class="mt-5 mb-1 --text-dark font-bold">Credentials</h3>

                <ValidationProvider ref="updateuser_name" name="Name" v-slot="{ validate, errors }" rules="required">
                    <div class="form-group-wrap mb-3">
                        <label class="mb-1 block text-xs font-medium --text-dark">Name</label>
                        <input 
                        :value="state.selected.user.name"
                        @input="e => { 
                            setState({ selected: { ...state.selected, user: { ...state.selected.user, name: e.target.value } } }); 
                            validate(e); 
                        }"
                        type="text"
                        class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                        v-vchecker="errors[0]"
                        />
                        <v-msg :error="errors[0]" />
                    </div>
                </ValidationProvider>


                <ValidationProvider ref="updateuser_email" name="Email" v-slot="{ validate, errors }" rules="required|email">
                    <div class="form-group-wrap mb-3">
                        <label class="mb-1 block text-xs font-medium --text-dark">Email</label>
                        <input 
                        :value="state.selected.user.email"
                        @input="e => { 
                            setState({ selected: { ...state.selected, user: { ...state.selected.user, email: e.target.value } } }); 
                            validate(e); 
                        }"
                        type="email"
                        class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                        v-vchecker="errors[0]"
                        />
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
                    :checked="state.selected.canupdatepassword"
                    @input="e => { 
                        setState({ selected: { ...state.selected, canupdatepassword: !state.selected.canupdatepassword } });
                    }" class="mr-1" />
                    Update the password
                    </label>
                </div>

                <div v-if="state.selected.canupdatepassword">
                    <ValidationProvider vid="updateuser_password" ref="updateuser_password" name="Password" v-slot="{ validate, errors }" rules="required|min:8">
                        <div class="form-group-wrap mb-3">
                            <label class="mb-1 block text-xs font-medium --text-dark">Password</label>
                            <input 
                            :value="state.selected.user.password"
                            @input="e => { 
                                setState({ selected: { ...state.selected, user: { ...state.selected.user, password: e.target.value } } }); 
                                validate(e); 
                            }"
                            type="password"
                            class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                            v-vchecker="errors[0]"
                            />
                            <v-msg :error="errors[0]" />
                        </div>
                    </ValidationProvider>

                    <ValidationProvider ref="updateuser_password_confirmation" name="Confirm Password" v-slot="{ validate, errors }" rules="required|confirmed:updateuser_password|min:8">
                        <div class="form-group-wrap mb-3">
                            <label class="mb-1 block text-xs font-medium --text-dark">Confirm Password</label>
                            <input 
                            :value="state.selected.user.password_confirmation"
                            @input="e => { 
                                setState({ selected: { ...state.selected, user: { ...state.selected.user, password_confirmation: e.target.value } } }); 
                                validate(e); 
                            }"
                            type="password"
                            class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                            v-vchecker="errors[0]"
                            />
                            <v-msg :error="errors[0]" />
                        </div>
                    </ValidationProvider>
                </div>

                <div class="form-group-wrap">
                    <async-button ref="updateuser_btn" type="submit" :class="`p-3 ${btnclassnormal} mt-3`">
                        Save Changes
                    </async-button>
                </div>

            </form>
        </ValidationObserver>
    </div>
</template>
<script>
import AsyncButton from "@components/reusables/AsyncButton.vue";
import TSelect from "@components/reusables/Select.vue";
import DropzoneMin from "@components/reusables/DropZoneMin.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VMsg from "@components/reusables/VeeMessage.vue";

import { mapState, mapMutations, mapActions } from "vuex";
export default {
    name: 'AdminOrganizationsEdit',
    components: {
        AsyncButton,
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
            'setState'
        ]),
        ...mapActions('administration/organizations', [
            'StoreUpdateEntry'
        ]),
        async updateUser() {
            try {
                this.$refs.updateuser_btn.loading = true;
                await this.StoreUpdateEntry();
                this.$refs.updateuser_btn.loading = false;
                this.$refs.updateuser.reset();
            } catch($e) {
                this.errorHandle($e, 'updateuser');
                this.$refs.updateuser_btn.loading = false;
            }
        }
    }
}
</script>