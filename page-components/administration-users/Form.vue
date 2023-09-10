<template>
    <div>

        <button 
        @click="$refs.userform.open=true"
        :class="`p-3 ${btnclassnormal} mb-2 inline-flex items-center p-2 space-x-1 text-sm float-right fixed bottom-2 right-2 lg:static lg:px-4 lg:py-2.5`">
            <span>Register User</span>
        </button>

        <modal ref="userform" nofooter contentclass="xl:w-3/12 lg:w-4/12 md:w-5/12 sm:w-7/12">
            <template slot="header">
                <h4 class="--text-heading text-lg font-semibold">
                    <span>Register User</span>
                </h4>
            </template>

            <template slot="content">
                <ValidationObserver ref="newuser" v-slot="{ handleSubmit }">
                    <form @submit.prevent="handleSubmit(registerUser)">

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
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VMsg from "@components/reusables/VeeMessage.vue";

import { mapState, mapMutations, mapActions } from "vuex"
export default {
    name: 'AdminUsersNewForm',
    components: {
        AsyncButton,
        Modal,
        ValidationProvider,
        ValidationObserver,
        VMsg
    },
    computed: {
        ...mapState({
            state: state => state.administration.users.state
        }),
    },
    methods: {
        ...mapMutations('administration/users', [
            'setState',
        ]),
        ...mapActions('administration/users', [
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