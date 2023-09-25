<template>
    <div>
        <div class="text-right">
            <button 
            @click="$refs.newentrymodal.open=true"
            :class="`p-4 ${btnclassnormal} w-auto justify-center mb-2 inline-flex items-center p-2 space-x-1 text-sm fixed bottom-2 right-2 rounded-full md:static md:rounded md:px-4 md:py-2.5`">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                </span>
                <span class="hidden md:inline">Add User</span>
            </button>
        </div>

        <modal ref="newentrymodal" nofooter contentclass="xl:w-6/12 md:w-9/12 sm:w-11/12">
            <template slot="header">
                <h4 class="--text-heading text-lg font-semibold">
                    <span>New User</span>
                </h4>
            </template>

            <template slot="content">

                <ValidationObserver ref="newentry" v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(addEntry)">

                    <div class="">
                        <div>
                            <h4 class="--text-dark font-semibold text-md mb-2 mt-10">Information</h4>

                            <div class="form-group-wrap mb-2">
                                <label for="new-firstname" class="mb-2 block text-xs font-medium --text-dark">User Photo</label>
                                <dropzone-min
                                :mimes="imageMimes"
                                title="Employee Photo"
                                :value="state.inputs.image"
                                @input="e => { 
                                    setState({ inputs: { ...state.inputs, image: e } });
                                }"
                                />
                            </div>

                            <ValidationProvider ref="newentry_name" name="name" v-slot="{ validate, errors }" rules="required">
                                <div class="form-group-wrap mb-2">
                                    <label for="new-name" class="mb-2 block text-xs font-medium --text-dark">First Name</label>
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
                            <h4 class="--text-dark font-semibold text-md mb-2">Credential</h4>
                            <ValidationProvider ref="newentry_username" name="username" v-slot="{ validate, errors }" rules="required">
                                <div class="form-group-wrap mb-2">
                                    <label for="new-username" class="mb-2 block text-xs font-medium --text-dark">Username</label>
                                    <input 
                                    :value="state.inputs.username"
                                    @input="e => { 
                                        setState({ inputs: { ...state.inputs, username: e.target.value } }); 
                                        validate(e); 
                                    }"
                                    type="text"
                                    class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                                    v-vchecker="errors[0]"
                                    />
                                    <v-msg :error="errors[0]" />
                                </div>
                            </ValidationProvider>
                            <ValidationProvider ref="newentry_email" name="Email" v-slot="{ validate, errors }" rules="required|email">
                                <div class="form-group-wrap mb-2">
                                    <label for="new-email" class="mb-2 block text-xs font-medium --text-dark">Email</label>
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


                            <ValidationProvider vid="newentry_password" ref="newentry_password" name="Password" v-slot="{ validate, errors }" rules="required|min:8">
                                <div class="form-group-wrap mb-2">
                                    <label for="new-password" class="mb-2 block text-xs font-medium --text-dark">Password</label>
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


                            <ValidationProvider ref="newentry_password_confirmation" name="Confirm Password" v-slot="{ validate, errors }" rules="required|confirmed:newentry_password|min:8">
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
                        </div>
                    </div>
                    <div class="form-group-wrap">
                        <async-button ref="newentry_btn" type="submit" :class="`p-3 ${btnclassnormal} mt-3`">
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
import TSelectDynamic from "@components/reusables/SelectDynamic.vue";
import DropzoneMin from "@components/reusables/DropZoneMin.vue";
import Editor from "@components/reusables/Editor.vue";
import draggable from "vuedraggable"
import DatePickerCustom from "@components/reusables/DatePicker.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VMsg from "@components/reusables/VeeMessage.vue";
import { VueMaskDirective } from "v-mask";

import { mapState, mapMutations, mapActions } from "vuex"
export default {
    name: 'EmployeesIndexNew',
    directives: {
        mask: VueMaskDirective
    },
    components: {
        AsyncButton,
        Modal,
        TSelectDynamic,
        DropzoneMin,
        Editor,
        draggable,
        tDatepicker: DatePickerCustom,
        ValidationProvider,
        ValidationObserver,
        VMsg
    },
    computed: {
        ...mapState({
            state: state => state.main.user.state
        })
    },
    methods: {
        ...mapMutations('main/user', [
            'setState',
            'updateArrayState',
            'removeArrayState'
        ]),
        ...mapActions('main/user', [
            'StoreInsertEntry'
        ]),
        async addEntry() {
            try {
                this.$refs.newentry_btn.loading = true;
                await this.StoreInsertEntry();
                this.$refs.newentry_btn.loading = false;
                this.$refs.newentrymodal.open = false;
                this.$refs.newentry.reset();
            } catch($e) {
                this.errorHandle($e, 'newentry');
                this.$refs.newentry_btn.loading = false;
            }
        }
    }
}
</script>