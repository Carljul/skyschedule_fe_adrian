<template>
    <div>
        <ValidationObserver ref="editentry" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(updateEntry)">

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <h4 class="--text-dark font-semibold text-md mb-2">Credential</h4>
                    <ValidationProvider ref="editentry_email" name="Email" v-slot="{ validate, errors }" rules="required|email">
                        <div class="form-group-wrap mb-2">
                            <label for="new-email" class="mb-2 block text-xs font-medium --text-dark">Email</label>
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

                        <ValidationProvider vid="editentry_password" ref="editentry_password" name="Password" v-slot="{ validate, errors }" rules="required|min:8">
                            <div class="form-group-wrap mb-2">
                                <label for="new-password" class="mb-2 block text-xs font-medium --text-dark">Password</label>
                                <input 
                                :value="state.selected.user.password"
                                @input="e => { 
                                    setState({ 
                                        selected: {
                                            ...state.selected,
                                            user: {
                                                ...state.selected.user,
                                                password: e.target.value
                                            }
                                        }
                                    }); 
                                    validate(e); 
                                }"
                                type="password"
                                class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                                v-vchecker="errors[0]"
                                />
                                <v-msg :error="errors[0]" />
                            </div>
                        </ValidationProvider>


                        <ValidationProvider vid="editentry_password" ref="editentry_password" name="Password" v-slot="{ validate, errors }" rules="required|min:8">
                            <div class="form-group-wrap mb-2">
                                <label for="new-password" class="mb-2 block text-xs font-medium --text-dark">Password</label>
                                <input 
                                :value="state.selected.user.password_confirmation"
                                @input="e => { 
                                    setState({ 
                                        selected: {
                                            ...state.selected,
                                            user: {
                                                ...state.selected.user,
                                                password_confirmation: e.target.value
                                            }
                                        }
                                    }); 
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



                    <h4 class="--text-dark font-semibold text-md mb-2 mt-10">Information</h4>

                    <div class="form-group-wrap mb-2">
                        <label for="new-firstname" class="mb-2 block text-xs font-medium --text-dark">Employee Photo</label>
                        <dropzone-min
                        :mimes="imageMimes"
                        title="Employee Photo"
                        :value="state.selected.image"
                        @input="e => { 
                            setState({ selected: { ...state.selected, image: e } });
                        }"
                        />
                    </div>

                    <ValidationProvider ref="editentry_firstname" name="Firstname" v-slot="{ validate, errors }" rules="required">
                        <div class="form-group-wrap mb-2">
                            <label for="new-firstname" class="mb-2 block text-xs font-medium --text-dark">Firstname</label>
                            <input 
                            :value="state.selected.firstname"
                            @input="e => { 
                                setState({ selected: { ...state.selected, firstname: e.target.value } }); 
                                validate(e); 
                            }"
                            type="text"
                            class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                            v-vchecker="errors[0]"
                            />
                            <v-msg :error="errors[0]" />
                        </div>
                    </ValidationProvider>


                    <ValidationProvider ref="editentry_middlename" name="Middlename" v-slot="{ validate, errors }" rules="required">
                        <div class="form-group-wrap mb-2">
                            <label for="new-middlename" class="mb-2 block text-xs font-medium --text-dark">Middlename</label>
                            <input 
                            :value="state.selected.middlename"
                            @input="e => { 
                                setState({ selected: { ...state.selected, middlename: e.target.value } }); 
                                validate(e); 
                            }"
                            type="text"
                            class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                            v-vchecker="errors[0]"
                            />
                            <v-msg :error="errors[0]" />
                        </div>
                    </ValidationProvider>

                    <ValidationProvider ref="editentry_lastname" name="Lastname" v-slot="{ validate, errors }" rules="required">
                        <div class="form-group-wrap mb-2">
                            <label for="new-lastname" class="mb-2 block text-xs font-medium --text-dark">Lastname</label>
                            <input 
                            :value="state.selected.lastname"
                            @input="e => { 
                                setState({ selected: { ...state.selected, lastname: e.target.value } }); 
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
                            :value="state.selected.birthday"
                            @input="e => { 
                                setState({ selected: { ...state.selected, birthday: e } });
                            }"
                            ></t-datepicker>
                        </client-only>
                    </div>

                    <template v-if="!excludefields.includes('position_uid')">
                    <h4 class="--text-dark font-semibold text-md mb-2 mt-10">Position</h4>
                    <ValidationProvider ref="editentry_position_uid" name="Position" v-slot="{ validate, errors }" rules="required">
                        <div class="form-group-wrap mb-2">
                            
                            <client-only>
                                <t-select-dynamic 
                                :endpoint="`${getOrgUID}/positions`" 
                                datakeylabel="position" 
                                datakeyvalue="uid"
                                searchplaceholder="Type to Search Position"
                                class="py-1.5 mb-2"
                                :value="state.selected.position_uid"
                                @input="e => {
                                    setState({ selected: { ...state.selected, position_uid: e } });
                                }"
                                @clear="e => {
                                    setState({ selected: { ...state.selected, position_uid: null } }); 
                                }"
                                ></t-select-dynamic>
                            </client-only>

                            <input type="hidden"
                            :value="state.inputs.position_uid"
                            @input="e => { 
                                setState({ selected: { ...state.selected, position_uid: e.target.value } }); 
                                validate(e); 
                            }"
                            >
                            <v-msg :error="errors[0]" />
                        </div>
                    </ValidationProvider>
                    </template>


                    <div v-if="!excludefields.includes('salary')" class="form-group-wrap mb-3">
                        <label class="mb-1 block text-xs font-medium --text-dark">Salary</label>
                        <input 
                        :value="state.selected.salary"
                        @input="e => { 
                            setState({ selected: { ...state.selected, salary: e.target.value } }); 
                        }"
                        type="number"
                        class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border"
                        />

                        <p class="text-xs block mt-1 --text-dark">Employee salary in USD.</p>
                    </div>


                    <h4 class="--text-dark font-semibold text-md mb-2 mt-10">Other Informations</h4>

                    <template v-if="!excludefields.includes('shift_start')">
                    <ValidationProvider ref="editentry_shift_start" name="Shift Start" v-slot="{ validate, errors }" rules="required">
                        <div class="form-group-wrap mb-2">
                            <label for="new-shift_start" class="mb-2 block text-xs font-medium --text-dark">Shift Start</label>
                            <client-only>
                                <t-datepicker mode="time" 
                                :value="state.selected.shift_start"
                                @input="e => { 
                                    setState({ selected: { ...state.selected, shift_start: e } });
                                }"
                                v-vchecker="errors[0]"
                                ></t-datepicker>
                            </client-only>
                            <input type="hidden"
                            :value="state.selected.shift_start"
                            @input="e => { 
                                setState({ selected: { ...state.selected, shift_start: e.target.value } }); 
                                validate(e); 
                            }"
                            >
                            <v-msg :error="errors[0]" />
                        </div>
                    </ValidationProvider>
                    </template>


                    <template v-if="!excludefields.includes('shift_end')">
                    <ValidationProvider ref="editentry_shift_end" name="Shift End" v-slot="{ validate, errors }" rules="required">
                        <div class="form-group-wrap mb-2">
                            <label for="new-shift_end" class="mb-2 block text-xs font-medium --text-dark">Shift End</label>
                            <client-only>
                                <t-datepicker mode="time" 
                                :value="state.selected.shift_end"
                                @input="e => { 
                                    setState({ selected: { ...state.selected, shift_end: e } });
                                }"
                                v-vchecker="errors[0]"
                                ></t-datepicker>
                            </client-only>
                            <input type="hidden"
                            :value="state.selected.shift_end"
                            @input="e => { 
                                setState({ selected: { ...state.selected, shift_end: e.target.value } }); 
                                validate(e); 
                            }"
                            >
                            <v-msg :error="errors[0]" />
                        </div>
                    </ValidationProvider>
                    </template>


                    <template v-if="!excludefields.includes('date_hired')">
                    <ValidationProvider ref="editentry_date_hired" name="Date Hired" v-slot="{ validate, errors }" rules="required">
                        <div class="form-group-wrap mb-2">
                            <label for="new-date_hired" class="mb-2 block text-xs font-medium --text-dark">Date Hired</label>
                            <client-only>
                                <t-datepicker mode="date" 
                                :value="state.selected.date_hired"
                                @input="e => { 
                                    setState({ selected: { ...state.selected, date_hired: e } });
                                }"
                                v-vchecker="errors[0]"
                                ></t-datepicker>
                            </client-only>
                            <input type="hidden"
                            :value="state.selected.date_hired"
                            @input="e => { 
                                setState({ selected: { ...state.selected, date_hired: e.target.value } }); 
                                validate(e); 
                            }"
                            >
                            <v-msg :error="errors[0]" />
                        </div>
                    </ValidationProvider>
                    </template>

                    <div class="form-group-wrap mb-2">
                        <label for="new-shift_start" class="mb-2 block text-xs font-medium --text-dark">Phone #</label>
                        <input type="text" 
                        class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                        v-mask="`(###) ###-####`" 
                        :value="state.selected.phone"
                        placeholder="(999) 999-9999"
                        @input="e => { 
                            setState({ selected: { ...state.selected, phone: e.target.value } });
                        }"
                        />
                    </div>


                    <div class="form-group-wrap mb-2">
                        <label for="new-shift_start" class="mb-2 block text-xs font-medium --text-dark">Address</label>
                        <input type="text" 
                        class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                        :value="state.selected.address"
                        @input="e => { 
                            setState({ selected: { ...state.selected, address: e.target.value } });
                        }"
                        />
                    </div>

                </div>


                <div>

                    <div class="form-group-wrap mb-2">
                        <label for="new-shift_start" class="mb-2 block text-xs font-medium --text-dark">Description</label>
                        <client-only>
                            <editor :value="state.selected.description"
                            @input="e => { 
                                setState({ selected: { ...state.selected, description: e } });
                            }" />
                        </client-only>
                    </div>


                    <template v-if="!excludefields.includes('documents')">
                    <h4 class="--text-dark font-semibold text-md mt-5 mb-2">Documents</h4>

                    <ValidationProvider ref="editentry_documents" name="Documents" v-slot="{ validate, errors }">
                        <input type="hidden"
                        :value="state.selected.documents"
                        @input="e => {
                            setState({ selected: { ...state.selected, documents: e.target.value } });
                            validate(e); 
                        }"
                        >
                        <v-msg :error="errors[0]" class="my-2" />
                    </ValidationProvider>

                    <draggable 
                    ghost-class="ghost"
                    class="v-draggable"
                    :value="state.selected.documents"
                    @input="e => {
                        setState({ selected: { ...state.selected, documents: e } });
                    }"
                    >
                        <transition-group>
                            <div v-for="(doc, doci) in state.selected.documents" class="cursor-move mb-2 border rounded p-2" :key="`doc-index-${doci}`">
                                <dropzone-min
                                title="Document File"
                                class="mb-2"
                                :value="doc.url"
                                :is-object="false"
                                @input="e => { 
                                    updateArrayState({ key: 'selected.documents', index: doci, value: { ...doc, url: e } });
                                }"
                                />

                                <input type="text" 
                                placeholder="Document Title"
                                :value="doc.title" 
                                @input="e => { 
                                    updateArrayState({ key: 'selected.documents', index: doci, value: { ...doc, title: e.target.value } });
                                }"
                                class="v-input mb-2 border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border">
                                
                                <a href="#" @click.prevent="removeArrayState({ key: 'selected.documents', index: doci })" class="text-xs --text-danger">remove</a>
                            </div>
                        </transition-group>
                    </draggable>

                    <button 
                    type="button"
                    @click="() => {
                        setState({ selected: { ...state.selected, documents: [...state.selected.documents, { title: '', url: '' }]  } });
                    }"
                    class="my-2 rounded text-xs btn btn-default p-2 bg-transparent border border-gray-600 --text-dark">Insert Document</button>
                    
                    </template>
                </div>
            </div>



            <div class="form-group-wrap">
                <async-button ref="editentry_btn" type="submit" :class="`p-3 ${btnclassnormal} mt-3`">
                    Save Changes
                </async-button>
            </div>

        </form>
        </ValidationObserver>
    </div>
</template>
<script>
import AsyncButton from "@components/reusables/AsyncButton.vue";
import TSelectDynamic from "@components/reusables/SelectDynamic.vue";
import DropzoneMin from "@components/reusables/DropZoneMin.vue";
import Editor from "@components/reusables/Editor.vue";
import draggable from "vuedraggable";
import DatePickerCustom from "@components/reusables/DatePicker.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VMsg from "@components/reusables/VeeMessage.vue";
import { VueMaskDirective } from "v-mask";

import { mapState, mapMutations, mapActions } from "vuex";

export default {
    name: 'EmployeeFormComponent',
    props: {
        excludefields: {
            type: Array,
            default: () => []
        }
    },
    directives: {
        mask: VueMaskDirective
    },
    components: {
        AsyncButton,
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
        }),
    },
    methods: {
        ...mapMutations('employees/employees', [
            'setState',            
            'updateArrayState',
            'removeArrayState'
        ]),
        ...mapActions('employees/employees', [
            'StoreUpdateEntry'
        ]),
        async updateEntry() {
            try {
                this.$refs.editentry_btn.loading = true;
                await this.StoreUpdateEntry();
                this.$refs.editentry_btn.loading = false;
                this.$refs.editentry.reset();
            } catch($e) {
                this.errorHandle($e, 'editentry');
                this.$refs.editentry_btn.loading = false;
            }
        }
    }
}
</script>