<template>
    <modal ref="modal_editentry" @close="() => {
            setState({ ...state, selected: null });
            $router.push('/employees/leave_types');
        }" id="modaledit" nofooter contentclass="xl:w-3/12 md:w-5/12 sm:w-7/12">
        <template v-if="state.selected" slot="header">
            <h4 class="--text-heading text-lg font-semibold">
                <span>Edit Leave Type ({{state.selected.__title}})</span>
            </h4>
        </template>

        <template v-if="state.selected" slot="content">

            <ValidationObserver ref="editleave_type" v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(updateLeaveType)">
                    <div class="form-group-wrap">
                        
                        <ValidationProvider ref="editleave_type_title" name="Leave Type" v-slot="{ validate, errors }" rules="required">
                            <label for="new-leave_type" class="mb-2 block text-xs font-medium --text-dark">Leave Type</label>
                            <input 
                            :value="state.selected.title"
                            @input="e => { 
                                setState({ selected: { ...state.selected, title: e.target.value } }); 
                                validate(e); 
                            }"
                            type="text"
                            class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                            v-vchecker="errors[0]"
                            />
                            <v-msg :error="errors[0]" />
                            <label for="new-leave_type" class="mb-2 block text-xs font-medium --text-dark">Description</label>
                            <input 
                            :value="state.selected.description"
                            @input="e => { 
                                setState({ selected: { ...state.selected, description: e.target.value } }); 
                                validate(e); 
                            }"
                            type="text"
                            class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                            v-vchecker="errors[0]"
                            />
                            <v-msg :error="errors[0]" />
                            <label for="new-leave_type" class="mb-2 block text-xs font-medium --text-dark">Credit Limit</label>
                            <input 
                            :value="state.selected.credit_limit"
                            @input="e => { 
                                setState({ selected: { ...state.selected, credit_limit: e.target.value } }); 
                                validate(e); 
                            }"
                            type="number"
                            class="v-input border border-gray-300 --text-dark text-sm rounded block w-full px-3 p-2 input-focus-border" 
                            v-vchecker="errors[0]"
                            />
                            <v-msg :error="errors[0]" />
                        </ValidationProvider>

                    </div>

                    <div class="form-group-wrap">
                        <async-button ref="editleave_type_btn" type="submit" :class="`p-3 ${btnclassnormal} mt-3`">
                            Save Changes
                        </async-button>
                    </div>
                </form>
            </ValidationObserver>

        </template>
    </modal>
</template>

<script>
import AsyncButton from "@components/reusables/AsyncButton.vue";
import Modal from "@components/reusables/Modal.vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VMsg from "@components/reusables/VeeMessage.vue";

import { mapState, mapMutations, mapActions } from "vuex"
export default {
    name: 'EmployeesLeaveTypesEdit',
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
            'StoreUpdateEntry'
        ]),
        async updateLeaveType() {
            try {
                this.$refs.editleave_type_btn.loading = true;
                await this.StoreUpdateEntry();
                this.$refs.editleave_type_btn.loading = false;
                this.$refs.editleave_type.reset();
            } catch($e) {
                this.errorHandle($e, 'editleave_type');
                this.$refs.editleave_type_btn.loading = false;
            }
        }
    }
}
</script>