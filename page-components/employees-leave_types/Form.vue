<template>
    <div>
        <button 
        @click="$refs.modal_newleave_type.open=true"
        :class="`p-3 ${btnclassnormal} mb-2 inline-flex items-center p-2 space-x-1 text-sm float-right fixed bottom-2 right-2 lg:static lg:px-4 lg:py-2.5`">
            <span>New LeaveType</span>
        </button>

        <modal ref="modal_newleave_type" nofooter contentclass="xl:w-3/12 md:w-5/12 sm:w-7/12">
            <template slot="header">
                <h4 class="--text-heading text-lg font-semibold">
                    <span>New LeaveType</span>
                </h4>
            </template>

            <template slot="content">

                <ValidationObserver ref="newleave_type" v-slot="{ handleSubmit }">
                    <form @submit.prevent="handleSubmit(addLeaveType)">
                            
                        <ValidationProvider ref="newleave_type_title" name="LeaveType" v-slot="{ validate, errors }" rules="required">
                            <div class="form-group-wrap">
                                <label for="new-leave_type" class="mb-2 block text-xs font-medium --text-dark">LeaveType</label>
                                <input 
                                :value="state.inputs.title"
                                @input="e => { 
                                    setState({ inputs: { ...state.inputs, title: e.target.value } }); 
                                    validate(e); 
                                }"
                                type="text"
                                class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                                v-vchecker="errors[0]"
                                />
                                <v-msg :error="errors[0]" />
                            </div>
                            <div class="form-group-wrap">
                                <label for="new-leave_type" class="mb-2 block text-xs font-medium --text-dark">Description</label>
                                <input 
                                :value="state.inputs.description"
                                @input="e => { 
                                    setState({ inputs: { ...state.inputs, description: e.target.value } }); 
                                    validate(e); 
                                }"
                                type="text"
                                class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                                v-vchecker="errors[0]"
                                />
                                <v-msg :error="errors[0]" />
                            </div>
                            <div class="form-group-wrap">
                                <label for="new-leave_type" class="mb-2 block text-xs font-medium --text-dark">Credit Limit</label>
                                <input 
                                :value="state.inputs.credit_limit"
                                @input="e => { 
                                    setState({ inputs: { ...state.inputs, credit_limit: e.target.value } }); 
                                    validate(e); 
                                }"
                                type="number"
                                class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                                v-vchecker="errors[0]"
                                />
                                <v-msg :error="errors[0]" />
                            </div>
                        </ValidationProvider>

                        <div class="form-group-wrap">
                            <async-button ref="newleave_type_btn" type="submit" :class="`p-3 ${btnclassnormal} mt-3`">
                                Save Leave Type
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
    name: 'EmployeesLeaveTypeForm',
    components: {
        AsyncButton,
        Modal,
        ValidationProvider,
        ValidationObserver,
        VMsg
    },
    computed: {
        ...mapState({
            state: state => state.employees.leave_types.state
        }),
    },
    methods: {
        ...mapMutations('employees/leave_types', [
            'setState'
        ]),
        ...mapActions('employees/leave_types', [
            'StoreInsertEntry'
        ]),
        async addLeaveType() {
            try {
                this.$refs.newleave_type_btn.loading = true;
                await this.StoreInsertEntry();
                this.$refs.newleave_type_btn.loading = false;
                this.$refs.modal_newleave_type.open = false;
                this.$refs.newleave_type.reset();
            } catch($e) {
                this.errorHandle($e, 'newleave_type');
                this.$refs.newleave_type_btn.loading = false;
            }
        }
    }
}
</script>