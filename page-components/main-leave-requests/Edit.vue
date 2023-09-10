<template>
    <modal ref="modal_editentry" @close="() => {
            setState({ ...state, selected: null });
            $router.push('/leave-requests');
        }" id="modaledit" nofooter contentclass="xl:w-3/12 md:w-5/12 sm:w-7/12">
        <template v-if="state.selected" slot="header">
            <h4 class="--text-heading text-lg font-semibold">
                <span>Edit Leave Request</span>
            </h4>
        </template>

        <template v-if="state.selected" slot="content">

            <ValidationObserver ref="editleaverequest" v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(updateLeaveRequest)">
                    <div class="form-group-wrap">
                        
                        <ValidationProvider ref="editentry_department_uid" name="Leave Type" v-slot="{ validate, errors }" rules="required">
                            <div class="form-group-wrap mb-3">
                                <label class="mb-2 block text-xs font-medium --text-dark">Leave Type</label>
                                
                                <client-only>
                                    <t-select-dynamic 
                                    ref="departmentinput"
                                    :endpoint="`${getOrgUID}/leave_types`" 
                                    datakeylabel="title" 
                                    datakeyvalue="uid"
                                    searchplaceholder="Type to Search Leave Type"
                                    placeholder="Choose Leave Type"
                                    class="py-1.5"
                                    v-vchecker="errors[0]"
                                    :value="state.selected.leavetype_uid"
                                    @input="e => setState({ selected: { ...state.selected, leavetype_uid: e } })"
                                    ></t-select-dynamic>
                                    <input type="hidden" 
                                    :value="state.selected.leavetype_uid" 
                                    @input="e => {
                                        setState({ selected: { ...state.selected, leavetype_uid: e.target.value } }); 
                                        validate(e); 
                                    }"/>
                                </client-only>
                                
                                <v-msg :error="errors[0]" />
                            </div>
                        </ValidationProvider>
                        <ValidationProvider ref="editentry_date_hired" name="Start Date" v-slot="{ validate, errors }" rules="required">
                        <div class="form-group-wrap mb-2">
                            <label for="new-start_date" class="mb-2 block text-xs font-medium --text-dark">Start Date</label>
                            <client-only>
                                <t-datepicker mode="date" 
                                :value="state.selected.start_date"
                                @input="e => { 
                                    setState({ selected: { ...state.selected, start_date: e } });
                                }"
                                v-vchecker="errors[0]"
                                ></t-datepicker>
                            </client-only>
                            <input type="hidden"
                            :value="state.selected.start_date"
                            @input="e => { 
                                setState({ selected: { ...state.selected, start_date: e.target.value } }); 
                                validate(e); 
                            }"
                            >
                            <v-msg :error="errors[0]" />
                        </div>
                    </ValidationProvider>
                    <ValidationProvider ref="editentry_date_hired" name="End Date" v-slot="{ validate, errors }" rules="required">
                        <div class="form-group-wrap mb-2">
                            <label for="new-end_date" class="mb-2 block text-xs font-medium --text-dark">End Date</label>
                            <client-only>
                                <t-datepicker mode="date" 
                                :value="state.selected.end_date"
                                @input="e => { 
                                    setState({ selected: { ...state.selected, end_date: e } });
                                }"
                                v-vchecker="errors[0]"
                                ></t-datepicker>
                            </client-only>
                            <input type="hidden"
                            :value="state.selected.end_date"
                            @input="e => { 
                                setState({ selected: { ...state.selected, end_date: e.target.value } }); 
                                validate(e); 
                            }"
                            >
                            <v-msg :error="errors[0]" />
                        </div>
                    </ValidationProvider>

                    <ValidationProvider ref="newentry_description" name="Reason" v-slot="{ validate, errors }" rules="required">
                                
                                <div class="form-group-wrap mb-2">
                                    
                                <label for="new-shift_start" class="mb-2 block text-xs font-medium --text-dark">Reason</label>
                                <client-only>
                                    <editor :value="state.selected.reason"
                                    @input="e => { 
                                        setState({ selected: { ...state.selected, reason: e } });
                                        validate(e); 
                                    }" />
                                </client-only>
                                <v-msg :error="errors[0]" />
                                </div>

                            </ValidationProvider>

                            <!-- <client-only v-if="permissionCheck(permissions.manage)">
                            <t-select-status 
                            :value="state.selected.statusText"
                            class="mt-3" 
                            @input="e => { 
                                setState({ selected: { ...state.selected, status: e.target.value } }); 
                                 
                            }"></t-select-status>
                        </client-only> -->
                    </div>

                    <div class="form-group-wrap">
                        <async-button ref="editleaverequest_btn" type="submit" :class="`p-3 ${btnclassnormal} mt-3`">
                            Save Changes
                        </async-button>
                    </div>
                </form>
            </ValidationObserver>

        </template>
    </modal>
</template>

<script>
import permissions from "@permissions/leave_types.js";
import AsyncButton from "@components/reusables/AsyncButton.vue";
import Modal from "@components/reusables/Modal.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VMsg from "@components/reusables/VeeMessage.vue";
import Editor from "@components/reusables/Editor.vue";
import TSelectDynamic from "@components/reusables/SelectDynamic.vue";
import TSelectStatus from "@components/reusables/SelectLeaveStatus.vue";
import DatePickerCustom from "@components/reusables/DatePicker.vue";
import { mapState, mapMutations, mapActions } from "vuex"
export default {
    name: 'EmployeesLeavesEdit',
    components: {
        AsyncButton,
        Modal,
        ValidationProvider,
        TSelectDynamic,
        TSelectStatus,
        Editor,
        tDatepicker: DatePickerCustom,
        ValidationObserver,
        VMsg
    },
    computed: {
        ...mapState({
            state: state => state.main.leave_requests.state
        }),
        ...permissions
    },
    methods: {
        ...mapMutations('main/leave_requests', [
            'setState'
        ]),
        ...mapActions('main/leave_requests', [
            'StoreUpdateEntry'
        ]),
        async updateLeaveRequest() {
            try {
                this.$refs.editleaverequest_btn.loading = true;
                await this.StoreUpdateEntry();                
                this.$refs.editleaverequest_btn.loading = false;
                this.$refs.editleaverequest.reset();
                
            } catch($e) {             
                this.errorHandle($e, 'editleaverequest');
                this.$refs.editleaverequest_btn.loading = false;
            }
        }
    }
}
</script>