<template>
    <div>
        <modal ref="modal_newdepartment" nofooter contentclass="xl:w-3/12 md:w-5/12 sm:w-7/12">
            <template slot="header">
                <h4 class="--text-heading text-lg font-semibold">
                    <span>New Leave Request</span>
                </h4>
            </template>

            <template slot="content">

                <ValidationObserver ref="newdepartment" v-slot="{ handleSubmit }">
                    <form @submit.prevent="handleSubmit(addDepartment)">
                            
                        <ValidationProvider ref="newentry_department_uid" name="Leave Type" v-slot="{ validate, errors }" rules="required">
                            <div class="form-group-wrap mb-3">
                                <label class="mb-2 block text-xs font-medium --text-dark">Leave Type</label>
                             
                                <client-only>
                                    <t-select-dynamic 
                                    :endpoint="`${getOrgUID}/permission-access/leaves?user_uid=${$auth.user.uid}`"                           
                                    datakeylabel=LeaveTitle
                                    datakeyvalue="LeaveId"
                                    searchplaceholder="Type to Search Leave Type"
                                    placeholder="Choose Leave Type"
                                    class="py-1.5"
                                    v-vchecker="errors[0]"
                                    @input="e => setState({ inputs: { ...state.inputs, leavetype_uid: e } })"
                                    ></t-select-dynamic>
                                    <input type="hidden" 
                                    :value="state.inputs.leavetype_uid" 
                                    @input="e => {
                                        setState({ inputs: { ...state.inputs, leavetype_uid: e.target.value } }); 
                                        validate(e); 
                                    }">
                                    {{ leave }}
                                </client-only>
                                <v-msg :error="errors[0]" />
                            </div>
                        </ValidationProvider>

                            <ValidationProvider ref="newentry_start_date" name="Date Start" v-slot="{ validate, errors }" rules="required">
                                <div class="form-group-wrap mb-2">
                                    <label for="new-start_date" class="mb-2 block text-xs font-medium --text-dark">Date Start</label>
                                    <client-only>
                                        <t-datepicker mode="date" 
                                        :value="state.inputs.start_date"
                                        @input="e => { 
                                            setState({ inputs: { ...state.inputs, start_date: e } });
                                        }"
                                        v-vchecker="errors[0]"
                                        ></t-datepicker>
                                    </client-only>
                                    <input type="hidden"
                                    :value="state.inputs.start_date"
                                    @input="e => { 
                                        setState({ inputs: { ...state.inputs, start_date: e.target.value } }); 
                                        validate(e); 
                                    }"
                                    >
                                    <v-msg :error="errors[0]" />
                                </div>
                            </ValidationProvider>
                        
                            <ValidationProvider ref="newentry_date_end" name="Date End" v-slot="{ validate, errors }" rules="required">
                                <div class="form-group-wrap mb-2">
                                    <label for="new-end_date" class="mb-2 block text-xs font-medium --text-dark">Date End</label>
                                    <client-only>
                                        <t-datepicker mode="date" 
                                        :value="state.inputs.end_date"
                                        @input="e => { 
                                            setState({ inputs: { ...state.inputs, end_date: e } });
                                        }"
                                        v-vchecker="errors[0]"
                                        ></t-datepicker>
                                    </client-only>
                                    <input type="hidden"
                                    :value="state.inputs.end_date"
                                    @input="e => { 
                                        setState({ inputs: { ...state.inputs, end_date: e.target.value } }); 
                                        validate(e); 
                                    }"
                                    >
                                    <v-msg :error="errors[0]" />
                                </div>
                            </ValidationProvider>

                            <ValidationProvider ref="newentry_description" name="Description" v-slot="{ validate, errors }" rules="required">
                                
                                <div class="form-group-wrap mb-2">
                                <label for="new-shift_start" class="mb-2 block text-xs font-medium --text-dark">Reason</label>
                                <client-only>
                                    <editor :value="state.inputs.reason"
                                    @input="e => { 
                                        setState({ inputs: { ...state.inputs, reason: e } });
                                        validate(e); 
                                    }" />
                                </client-only>
                                <v-msg :error="errors[0]" />
                                </div>

                            </ValidationProvider>
                            

                            

                    

                        <div class="form-group-wrap">
                            <async-button ref="newdepartment_btn" type="submit" :class="`p-3 ${btnclassnormal} mt-3`">
                                Save Request
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
import Editor from "@components/reusables/Editor.vue";
import VMsg from "@components/reusables/VeeMessage.vue";
import TSelectDynamic from "@components/reusables/SelectDynamic.vue";
import DatePickerCustom from "@components/reusables/DatePicker.vue";
import { mapState, mapMutations, mapActions } from "vuex"
export default {
    name: 'EmployeesDepartmentForm',
    components: {
        AsyncButton,
        Modal,
        ValidationProvider,
        ValidationObserver,
        Editor,
        TSelectDynamic,
        tDatepicker: DatePickerCustom,
        VMsg
    },
    computed: {
        ...mapState({
            state: state => state.employees.leave_requests.state
        }),
        
    },
    methods: {
        ...mapMutations('employees/leave_requests', [
            'setState'
        ]),
        ...mapActions('employees/leave_requests', [
            'StoreInsertEntry'
        ]),
        async addDepartment() {
            try {
                this.$refs.newdepartment_btn.loading = true;
                await this.StoreInsertEntry();
                this.$refs.newdepartment_btn.loading = false;
                this.$refs.modal_newdepartment.open = false;
                this.resetInputs();
                this.$refs.newdepartment.reset();
            } catch($e) {
                this.errorHandle($e, 'newdepartment');
                this.$refs.newdepartment_btn.loading = false;
            }
        }
    }
}
</script>