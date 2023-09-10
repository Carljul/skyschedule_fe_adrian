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
                <span class="hidden md:inline">Add Employee</span>
            </button>
        </div>

        <modal ref="newentrymodal" nofooter contentclass="xl:w-6/12 md:w-9/12 sm:w-11/12">
            <template slot="header">
                <h4 class="--text-heading text-lg font-semibold">
                    <span>New Employee</span>
                </h4>
            </template>

            <template slot="content">

                <ValidationObserver ref="newentry" v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(addEntry)">

                    <div class="grid grid-cols-2 gap-4">
                        <div>

                            <h4 class="--text-dark font-semibold text-md mb-2">Credential</h4>

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


                            <h4 class="--text-dark font-semibold text-md mb-2 mt-10">Information</h4>

                            <div class="form-group-wrap mb-2">
                                <label for="new-firstname" class="mb-2 block text-xs font-medium --text-dark">Employee Photo</label>
                                <dropzone-min
                                :mimes="imageMimes"
                                title="Employee Photo"
                                :value="state.inputs.image"
                                @input="e => { 
                                    setState({ inputs: { ...state.inputs, image: e } });
                                }"
                                />
                            </div>

                            <ValidationProvider ref="newentry_firstname" name="Firstname" v-slot="{ validate, errors }" rules="required">
                                <div class="form-group-wrap mb-2">
                                    <label for="new-firstname" class="mb-2 block text-xs font-medium --text-dark">Firstname</label>
                                    <input 
                                    :value="state.inputs.firstname"
                                    @input="e => { 
                                        setState({ inputs: { ...state.inputs, firstname: e.target.value } }); 
                                        validate(e); 
                                    }"
                                    type="text"
                                    class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                                    v-vchecker="errors[0]"
                                    />
                                    <v-msg :error="errors[0]" />
                                </div>
                            </ValidationProvider>


                            <ValidationProvider ref="newentry_middlename" name="Middlename" v-slot="{ validate, errors }" rules="required">
                                <div class="form-group-wrap mb-2">
                                    <label for="new-middlename" class="mb-2 block text-xs font-medium --text-dark">Middlename</label>
                                    <input 
                                    :value="state.inputs.middlename"
                                    @input="e => { 
                                        setState({ inputs: { ...state.inputs, middlename: e.target.value } }); 
                                        validate(e); 
                                    }"
                                    type="text"
                                    class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                                    v-vchecker="errors[0]"
                                    />
                                    <v-msg :error="errors[0]" />
                                </div>
                            </ValidationProvider>

                            <ValidationProvider ref="newentry_lastname" name="Lastname" v-slot="{ validate, errors }" rules="required">
                                <div class="form-group-wrap mb-2">
                                    <label for="new-lastname" class="mb-2 block text-xs font-medium --text-dark">Lastname</label>
                                    <input 
                                    :value="state.inputs.lastname"
                                    @input="e => { 
                                        setState({ inputs: { ...state.inputs, lastname: e.target.value } }); 
                                        validate(e); 
                                    }"
                                    type="text"
                                    class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                                    v-vchecker="errors[0]"
                                    />
                                    <v-msg :error="errors[0]" />
                                </div>
                            </ValidationProvider>


                            <div class="form-group-wrap mb-2">
                                <label for="new-birthday" class="mb-2 block text-xs font-medium --text-dark">Birthdate</label>
                                <client-only>
                                    <t-datepicker mode="date" 
                                    :value="state.inputs.birthday"
                                    @input="e => { 
                                        setState({ inputs: { ...state.inputs, birthday: e } });
                                    }"
                                    ></t-datepicker>
                                </client-only>
                            </div>


                            <h4 class="--text-dark font-semibold text-md mb-2 mt-10">Position</h4>
                            <ValidationProvider ref="newentry_position_uid" name="Position" v-slot="{ validate, errors }" rules="required">
                                <div class="form-group-wrap mb-2">
                                    
                                    <client-only>
                                        <t-select-dynamic 
                                        :endpoint="`${getOrgUID}/positions`" 
                                        datakeylabel="position" 
                                        datakeyvalue="uid"
                                        searchplaceholder="Type to Search Position"
                                        class="py-1.5 mb-2"
                                        :value="state.inputs.position_uid"
                                        @input="e => {
                                            setState({ inputs: { ...state.inputs, position_uid: e } });
                                        }"
                                        @clear="e => {
                                            setState({ inputs: { ...state.inputs, position_uid: null } }); 
                                        }"
                                        ></t-select-dynamic>
                                    </client-only>

                                    <input type="hidden"
                                    :value="state.inputs.position_uid"
                                    @input="e => { 
                                        setState({ inputs: { ...state.inputs, position_uid: e.target.value } }); 
                                        validate(e); 
                                    }"
                                    >
                                    <v-msg :error="errors[0]" />
                                </div>
                            </ValidationProvider>


                            <div class="form-group-wrap mb-3">
                                <label class="mb-1 block text-xs font-medium --text-dark">Salary</label>
                                <input 
                                :value="state.inputs.salary"
                                @input="e => { 
                                    setState({ inputs: { ...state.inputs, salary: e.target.value } }); 
                                }"
                                type="number"
                                class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border"
                                />

                                <p class="text-xs block mt-1 --text-dark">Employee salary in USD.</p>
                            </div>



                            <h4 class="--text-dark font-semibold text-md mb-2 mt-10">Other Informations</h4>

                            <ValidationProvider ref="newentry_shift_start" name="Shift Start" v-slot="{ validate, errors }" rules="required">
                                <div class="form-group-wrap mb-2">
                                    <label for="new-shift_start" class="mb-2 block text-xs font-medium --text-dark">Shift Start</label>
                                    <client-only>
                                        <t-datepicker mode="time" 
                                        :value="state.inputs.shift_start"
                                        @input="e => { 
                                            setState({ inputs: { ...state.inputs, shift_start: e } });
                                        }"
                                        v-vchecker="errors[0]"
                                        ></t-datepicker>
                                    </client-only>
                                    <input type="hidden"
                                    :value="state.inputs.shift_start"
                                    @input="e => { 
                                        setState({ inputs: { ...state.inputs, shift_start: e.target.value } }); 
                                        validate(e); 
                                    }"
                                    >
                                    <v-msg :error="errors[0]" />
                                </div>
                            </ValidationProvider>


                            <ValidationProvider ref="newentry_shift_end" name="Shift End" v-slot="{ validate, errors }" rules="required">
                                <div class="form-group-wrap mb-2">
                                    <label for="new-shift_end" class="mb-2 block text-xs font-medium --text-dark">Shift End</label>
                                    <client-only>
                                        <t-datepicker mode="time" 
                                        :value="state.inputs.shift_end"
                                        @input="e => { 
                                            setState({ inputs: { ...state.inputs, shift_end: e } });
                                        }"
                                        v-vchecker="errors[0]"
                                        ></t-datepicker>
                                    </client-only>
                                    <input type="hidden"
                                    :value="state.inputs.shift_end"
                                    @input="e => { 
                                        setState({ inputs: { ...state.inputs, shift_end: e.target.value } }); 
                                        validate(e); 
                                    }"
                                    >
                                    <v-msg :error="errors[0]" />
                                </div>
                            </ValidationProvider>


                            <ValidationProvider ref="newentry_date_hired" name="Date Hired" v-slot="{ validate, errors }" rules="required">
                                <div class="form-group-wrap mb-2">
                                    <label for="new-date_hired" class="mb-2 block text-xs font-medium --text-dark">Date Hired</label>
                                    <client-only>
                                        <t-datepicker mode="date" 
                                        :value="state.inputs.date_hired"
                                        @input="e => { 
                                            setState({ inputs: { ...state.inputs, date_hired: e } });
                                        }"
                                        v-vchecker="errors[0]"
                                        ></t-datepicker>
                                    </client-only>
                                    <input type="hidden"
                                    :value="state.inputs.date_hired"
                                    @input="e => { 
                                        setState({ inputs: { ...state.inputs, date_hired: e.target.value } }); 
                                        validate(e); 
                                    }"
                                    >
                                    <v-msg :error="errors[0]" />
                                </div>
                            </ValidationProvider>

                            <div class="form-group-wrap mb-2">
                                <label for="new-shift_start" class="mb-2 block text-xs font-medium --text-dark">Phone #</label>
                                <input type="text" 
                                class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                                v-mask="`(###) ###-####`" 
                                :value="state.inputs.phone"
                                placeholder="(999) 999-9999"
                                @input="e => { 
                                    setState({ inputs: { ...state.inputs, phone: e.target.value } });
                                }"
                                />
                            </div>


                            <div class="form-group-wrap mb-2">
                                <label for="new-shift_start" class="mb-2 block text-xs font-medium --text-dark">Address</label>
                                <input type="text" 
                                class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                                :value="state.inputs.address"
                                @input="e => { 
                                    setState({ inputs: { ...state.inputs, address: e.target.value } });
                                }"
                                />
                            </div>

                        </div>


                        <div>

                            <div class="form-group-wrap mb-2">
                                <label for="new-shift_start" class="mb-2 block text-xs font-medium --text-dark">Description</label>
                                <client-only>
                                    <editor :value="state.inputs.description"
                                    @input="e => { 
                                        setState({ inputs: { ...state.inputs, description: e } });
                                    }" />
                                </client-only>
                            </div>

                            <h4 class="--text-dark font-semibold text-md mt-5 mb-2">Documents</h4>

                            <ValidationProvider ref="newentry_documents" name="Documents" v-slot="{ validate, errors }">
                                <input type="hidden"
                                :value="state.inputs.documents"
                                @input="e => {
                                    setState({ inputs: { ...state.inputs, documents: e.target.value } });
                                    validate(e); 
                                }"
                                >
                                <v-msg :error="errors[0]" class="my-2" />
                            </ValidationProvider>

                            <draggable 
                            ghost-class="ghost"
                            class="v-draggable"
                            :value="state.inputs.documents"
                            @input="e => {
                                setState({ inputs: { ...state.inputs, documents: e } });
                            }"
                            >
                                <transition-group>
                                    <div v-for="(doc, doci) in state.inputs.documents" class="cursor-move mb-2 border rounded p-2" :key="`doc-index-${doci}`">
                                        <dropzone-min
                                        title="Document File"
                                        class="mb-2"
                                        :value="doc.url"
                                        :is-object="false"
                                        @input="e => { 
                                            updateArrayState({ key: 'inputs.documents', index: doci, value: { ...doc, url: e } });
                                        }"
                                        />

                                        <input type="text" 
                                        placeholder="Document Title"
                                        :value="doc.title" 
                                        @input="e => { 
                                            updateArrayState({ key: 'inputs.documents', index: doci, value: { ...doc, title: e.target.value } });
                                        }"
                                        class="v-input mb-2 border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border">
                                        
                                        <a href="#" @click.prevent="removeArrayState({ key: 'inputs.documents', index: doci })" class="text-xs --text-danger">remove</a>
                                    </div>
                                </transition-group>
                            </draggable>

                            <button 
                            type="button"
                            @click="() => {
                                setState({ inputs: { ...state.inputs, documents: [...state.inputs.documents, { title: '', url: '' }]  } });
                            }"
                            class="my-2 rounded text-xs btn btn-default p-2 bg-transparent border border-gray-600 --text-dark">Insert Document</button>
                            
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
            state: state => state.employees.employees.state
        })
    },
    methods: {
        ...mapMutations('employees/employees', [
            'setState',
            'updateArrayState',
            'removeArrayState'
        ]),
        ...mapActions('employees/employees', [
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